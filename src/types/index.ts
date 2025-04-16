export type User = {
    name: string
    email: string
    handle: string
    _id: string
    description: string
}

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string,
    password_confirmation: string
}

export type LoginForm = Pick<RegisterForm, 'email' | 'password'>

export type ProfileForm = Pick<User, 'handle' | 'description'>