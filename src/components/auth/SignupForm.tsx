"use client"

import { Flex, Text, TextField } from "@radix-ui/themes"
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons"
import { Controller, useForm } from "react-hook-form"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

interface SignUpData {
    name: string
    email: string
    password: string
}

const SignupForm = () => {

    const router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpData>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = handleSubmit(async (data: SignUpData) => {

        const response = await axios.post("/api/auth/register", data)
        console.log(response.status);


        if (response.status === 201) {
            const result = await signIn("credentials", {
                email: response.data.email,
                password: data.password,
                redirect: false
            })

            if (!result?.ok) {
                console.log(result?.error);
                return
            }

            router.push("/dashboard")

        }

    })

    return (
        <form onSubmit={onSubmit}>
            <Flex direction="column" gap="2">

                <label htmlFor="email">Name</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: {
                            message: "Nombre es requerido",
                            value: true
                        }
                    }}
                    render={({ field }) => {
                        return (
                            <TextField.Root type="text" placeholder="Username" {...field} autoFocus>
                                <TextField.Slot>
                                    <PersonIcon width="16" height="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        )
                    }}
                />

                {errors.name && <Text className="text-red-500 text-xs font-semibold">{errors.name.message}</Text>}

                <label htmlFor="email">Email</label>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: {
                            message: "Email es requerido",
                            value: true
                        }
                    }}
                    render={({ field }) => {
                        return (
                            <TextField.Root type="email" {...field} placeholder="email@domain.com">
                                <TextField.Slot>
                                    <EnvelopeClosedIcon width="16" height="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        )
                    }}
                />

                {errors.email && <Text className="text-red-500 text-xs font-semibold">{errors.email.message}</Text>}


                <label htmlFor="password">Password</label>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: {
                            message: "Password es requerido",
                            value: true
                        },
                        minLength: {
                            message: "Pawwword debe tener minimo 6 caracteres",
                            value: 6
                        }
                    }}
                    render={({ field }) => {
                        return (
                            <TextField.Root type="password" {...field} placeholder="...." >
                                <TextField.Slot>
                                    <LockClosedIcon width="16" height="16" />
                                </TextField.Slot>
                            </TextField.Root>

                        )
                    }}
                />

                {errors.password && <Text className="text-red-500 text-xs font-semibold">{errors.password.message}</Text>}


                <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-bold mt-4">
                    Sign Up
                </button>

            </Flex>
        </form>
    )
}
export default SignupForm