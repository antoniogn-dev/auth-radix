"use client"

import { TrashIcon } from "@radix-ui/react-icons"
import { Button, Card, Container, Flex, Heading, TextArea, TextField } from "@radix-ui/themes"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"


const TaskNewPage = () => {

    const router = useRouter()
    const params = useParams() as { projectId: string }

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: "",
            description: ""
        }
    })

    const onSubmit = handleSubmit(async (data) => {

        if (!params.projectId) {
            await axios.post("/api/projects", data)
            router.push("/dashboard")
        } else {
            await axios.put(`/api/projects/${params.projectId}`, data)
            router.push("/dashboard")
        }
    })

    const handleDelete = async (projectId: string) => {
        await axios.delete(`/api/projects/${projectId}`)
        toast.success("Proyecto eliminado satisfactoriamente...")
        router.push("/dashboard")
    }

    useEffect(() => {
        if (params.projectId) {
            axios.get(`/api/projects/${Number(params.projectId)}`)
                .then(response => {
                    console.log("RESULTADO:  ", response)
                    setValue("title", response.data.title)
                    setValue("description", response.data.description)
                })
        }
    }, [])

    return (
        <div>
            <Container size="1" height="100%" className="p-3 md:p-0">
                <Flex className="h-screen w-full items-center">
                    <Card className="w-full p-7">
                        <Heading mb="4">
                            {params.projectId ? "Edit Project" : "New Project"}
                        </Heading>
                        <form onSubmit={onSubmit} className="flex flex-col gap-y-2">

                            <label htmlFor="">Project Title</label>

                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <TextField.Root {...field} size="3" placeholder="Title…" />
                                    )
                                }}
                            />
                            <label htmlFor="">Description</label>

                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <TextArea {...field} size="3" placeholder="Description..." />
                                    )
                                }}
                            />

                            <Button>
                                {params.projectId ? "Edit Project" : "Create Project"}
                            </Button>
                        </form>

                        <div className="flex justify-end my-4">
                            {
                                params.projectId && (
                                    <Button color="red" onClick={() => handleDelete(params.projectId)}>
                                        <TrashIcon />
                                        Delete Project
                                    </Button>
                                )
                            }
                        </div>

                    </Card>
                </Flex>

            </Container>

        </div>
    )
}
export default TaskNewPage