import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidURL } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import { SocialNetwork, User } from "../types";


const LinkTreeView = () => {

    const [devTreeLinks, setDevTreeLinks] = useState(social)

    const queryClient = useQueryClient()

    const user: User = queryClient.getQueryData(['user'])!

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Actualizado correctamente')
        }
    })

    useEffect(() => {

        const updateData = devTreeLinks.map(item => {
            const userLink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
            if (userLink) {
                return { ...item, url: userLink.url, enabled: userLink.enabled }
            }
            return item
        })
        setDevTreeLinks(updateData)
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedName = e.target.name
        const textValue = e.target.value

        const updateLinks = devTreeLinks.map(item => item.name === selectedName ? (
            { ...item, url: textValue }
        ) : item)

        setDevTreeLinks(updateLinks)

    }

    const links: SocialNetwork[] = JSON.parse(user.links)

    const handleEnableLink = (socialNetwork: string) => {
        const updateLinks = devTreeLinks.map(item => {
            if (item.name === socialNetwork) {
                if (isValidURL(item.url)) {
                    return { ...item, enabled: !item.enabled }
                } else {
                    toast.error('URL no válida')
                }
            }
            return item
        })

        let updatedItems: SocialNetwork[] = []

        const selectedSocialNetwork = updateLinks.find(item => item.name === socialNetwork)

        if (selectedSocialNetwork?.enabled) {

            const id = links.filter(item => item.id).length + 1

            if (links.some(item => item.name === socialNetwork)) {

                updatedItems = links.map(item => {
                    if (item.name === socialNetwork) {
                        return {
                            ...item,
                            id,
                            enabled: true
                        }
                    } else {
                        return item
                    }
                })

            } else {
                const newItem = {
                    ...selectedSocialNetwork,
                    id
                }
                updatedItems = [...links, newItem]
            }

        } else {

            const indexToUpdate = links.findIndex((item) => item.name === socialNetwork)

            updatedItems = links.map(item => {
                if (item.name === socialNetwork) {
                    return {
                        ...item,
                        id: 0,
                        enabled: false
                    }
                } else if (item.id > links[indexToUpdate].id) {
                    return {
                        ...item,
                        id: item.id - 1
                    }
                } else {
                    return item
                }
            })

        }

        setDevTreeLinks(updateLinks)

        // ALMACENAR EN BASE DE DATOS
        queryClient.setQueryData(['user'], (prevUser: User) => {
            return {
                ...prevUser,
                links: JSON.stringify(updatedItems)
            }
        })
    }

    return (
        <>
            <div className="space-y-5">
                {
                    devTreeLinks.map(item => (
                        <DevTreeInput key={item.name} item={item} handleUrlChange={handleUrlChange} handleEnableLink={handleEnableLink} />
                    ))
                }
                <button
                    className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
                    onClick={() => mutate(queryClient.getQueryData(['user'])!)}
                >
                    Guardar Cambios
                </button>
            </div>
        </>
    )
}

export default LinkTreeView;