import { isAxiosError } from "axios"
import api from "../config/axios"
import { LoginForm, RegisterForm, User, UserHandle } from "../types"

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

export const updateProfile = async (formData: User) => {
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
        const { data: { image } }: { data: { image: string } } = await api.post(import.meta.env.VITE_UPLOAD_IMAGE, formData)
        return image
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export const getUserByHandle = async (handle: string) => {

    try {
        const { data } = await api<UserHandle>(`/${handle}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export const searchByHandle = async (handle: string) => {

    try {
        const url = import.meta.env.VITE_SEARCH_HANDLE
        const { data } = await api.post<string>(url, { handle })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export const handleLogin = async (formData: LoginForm) => {

    const url = import.meta.env.VITE_LOGIN_USUARIO

    try {
        const { data } = await api.post(url, formData)

        return data

    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }
}

export const handleRegister = async (formData: RegisterForm) => {

    const url = `${import.meta.env.VITE_REGISTRAR_USUARIO}`

    try {
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }
}