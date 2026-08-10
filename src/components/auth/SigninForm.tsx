"use client"

import { Flex, Text, TextField } from "@radix-ui/themes"
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons"
import { Controller, useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


interface SigninData {
    email: string
    password: string
}

const SigninForm = () => {

    const router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm<SigninData>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = handleSubmit(async (data: SigninData) => {
        const response = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password
        })

        if (!response?.ok) {
            console.log(response);
        }

        router.push("/dashboard")
        
    })

    return (
        <form onSubmit={onSubmit}>
            <Flex direction="column" gap="2">

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
                            <TextField.Root type="email" placeholder="email@domain.com" {...field} autoFocus>
                                <TextField.Slot>
                                    <EnvelopeClosedIcon width="16" height="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        )
                    }}
                />

                {
                    errors.email && <Text color="red" className="text-xs font-bold">
                        {errors.email.message}
                    </Text>
                }

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
                            message: "Password minimo de 6 caracteres",
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

                {
                    errors.password && <Text color="ruby" className="text-xs font-bold tracking-tighter">
                        {errors.password.message}
                    </Text>
                }

                <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-bold mt-4">
                    Sign In
                </button>

            </Flex>
        </form>
    )
}
export default SigninForm