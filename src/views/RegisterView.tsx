import { toast } from 'sonner'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import ErrorMessage from "../components/ErrorMessage";
import { RegisterForm } from "../types";
import { useMutation } from '@tanstack/react-query';
import { handleRegister } from '../api/DevTreeAPI';

const RegisterView = () => {

    const navigate = useNavigate()

    const { state } = useLocation()

    const handle = state?.handle

    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: handle || '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<RegisterForm>({ defaultValues: initialValues })

    const password = watch('password')

    // const handleRegister = async (formData: RegisterForm) => {

    //     const url = `${import.meta.env.VITE_REGISTRAR_USUARIO}`

    //     try {
    //         const { data } = await api.post(url, formData)
    //         toast.success(data)
    //         reset()
    //         navigate('/auth/login', { replace: true })
    //     } catch (error) {

    //         if (isAxiosError(error) && error.response) {
    //             toast.error(error.response.data.error)
    //         }

    //     }
    // }

    const registerMutation = useMutation({
        mutationFn: handleRegister,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data: any) => {
            toast.success(data)
            reset()
            navigate('/auth/login', { replace: true })
        }
    })

    const ejecutaMutation = (formData: any) => {
        registerMutation.mutate(formData)
    }

    return (
        <>
            <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>

            <form
                onSubmit={handleSubmit(ejecutaMutation)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name perro"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('name', {
                            required: 'El Nombre es obligatorio'
                        })
                        }
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('email', {
                            required: 'El Email es obligatorio',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })
                        }
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('handle', {
                            required: 'El Handle es obligatorio'
                        })
                        }
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('password', {
                            required: 'El Password es obligatorio',
                            minLength: {
                                value: 8,
                                message: 'El password debe ser mínimo de 8 caracteres'
                            }
                        })
                        }
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('password_confirmation', {
                            required: 'Repetir Password es obligatorio',
                            validate: value => value === password || 'Los passwords no son iguales'
                        })
                        }
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>

            <nav className="mt-10">
                <Link
                    className="text-center text-white text-lg block"
                    to={'/auth/login'}
                >
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    )
}

export default RegisterView;