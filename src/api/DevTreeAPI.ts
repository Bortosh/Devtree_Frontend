import { isAxiosError } from "axios"
import api from "../config/axios"
import { ProfileForm, User } from "../types"

export const getUser = async () => {
    const url = import.meta.env.VITE_AUTH_USUARIO
    try {
        const { data } = await api<User>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateProfile = async (formData: ProfileForm) => {
    const url = import.meta.env.VITE_UPDATE_USUARIO

    try {
        const { data } = await api.patch<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export const uploadImage = async (file: File) => {

    let formData = new FormData()
    formData.append('file', file)

    try {
        const { data: {image} } : { data: {image: string} } = await api.post(import.meta.env.VITE_UPLOAD_IMAGE, formData)
        return image
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}