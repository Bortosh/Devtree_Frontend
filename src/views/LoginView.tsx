import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { LoginForm } from "../types";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { handleLogin } from "../api/DevTreeAPI";

const LoginView = () => {


    const initialValues: LoginForm = {
        email: '',
        password: ''
    }

    const navigate = useNavigate()

    const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    // const handleLogin = async (formData: LoginForm) => {

    //     const url = import.meta.env.VITE_LOGIN_USUARIO

    //     try {
    //         const { data } = await api.post(url, formData)

    //         localStorage.setItem('AUTH_TOKEN', data)

    //         toast.success('Proceso exitoso')
    //         reset()
    //         navigate('/admin', { replace: true })

    //     } catch (error) {

    //         if (isAxiosError(error) && error.response) {
    //             toast.error(error.response.data.error)
    //         }

    //     }
    // }

    const loginMutation = useMutation({
        mutationFn: handleLogin,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data:any) => {
            localStorage.setItem('AUTH_TOKEN', data)
            toast.success('Proceso exitoso')
            reset()
            navigate('/admin', { replace: true })
        }
    })

const ejecutaMutation = (formData: any) => {
    loginMutation.mutate(formData)
}

    return (
        <>
            <h1 className="text-4xl text-white font-bold">Iniciar Sesión</h1>

            <form
                onSubmit={handleSubmit(ejecutaMutation)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
                noValidate
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                />
            </form>

            <nav className="mt-10">
                <Link
                    className="text-center text-white text-lg block"
                    to={'/auth/register'}
                >
                    ¿No tienes cuenta? Crea una aqui
                </Link>
            </nav>
        </>
    )
}

export default LoginView;