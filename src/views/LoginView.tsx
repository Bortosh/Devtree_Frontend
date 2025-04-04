import { Link } from "react-router-dom";

const LoginView = () => {
    return (
        <>
            <h1 className="text-4xl text-white font-bold">Iniciar Sesión</h1>

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