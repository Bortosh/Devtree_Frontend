import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidURL } from "../utils";
import { toast } from "sonner";


const LinkTreeView = () => {

    const [devTreeLinks, setDevTreeLinks] = useState(social)
    console.log("🚀 ~ LinkTreeView ~ devTreeLinks:", devTreeLinks)

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedName = e.target.name
        const textValue = e.target.value
        const modifedSocialURL = devTreeLinks.map(item => item.name === selectedName ? (
            { ...item, url: textValue }
        ) : item)
        setDevTreeLinks(modifedSocialURL)
    }

    const handleEnableLink = (socialNetwork: string) => {
        const changeEnable = devTreeLinks.map(item => {
            if(item.name === socialNetwork) {
                if(isValidURL(item.url)) {
                    return { ...item, enabled: !item.enabled }
                } else {
                    toast.error('URL no válida')
                }
            }
            return item
        })
        setDevTreeLinks(changeEnable)
    }

    return (
        <>
            <div>
                {
                    devTreeLinks.map(item => (
                        <DevTreeInput key={item.name} item={item} handleUrlChange={handleUrlChange} handleEnableLink={handleEnableLink} />
                    ))
                }
            </div>
        </>
    )
}

export default LinkTreeView;