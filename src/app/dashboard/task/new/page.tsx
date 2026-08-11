"use client"

import { Button, Card, Container, Flex, Heading, TextArea, TextField } from "@radix-ui/themes"
import axios from "axios"
import { useForm, Controller } from "react-hook-form"

const TaskNewPage = () => {

    const {control, handleSubmit } = useForm({
        defaultValues: {
            title: "",
            description: ""
        }
    })

    const onSubmit = handleSubmit(async (data) => {
        const response = await axios.post("/api/projects", data)
        console.log(response);
        
    })
    
    return (
        <div>
            <Container size="1" height="100%" className="p-3 md:p-0">
                <Flex className="h-screen w-full items-center">
                    <Card className="w-full p-7">
                        <Heading mb="4">Create Project</Heading>
                        <form onSubmit={onSubmit} className="flex flex-col gap-y-2">

                            <label htmlFor="">Project Title</label>

                            <Controller 
                                name="title"
                                control={control}
                                render={({field}) => {
                                    return (
                                        <TextField.Root {...field} size="3" placeholder="Title…" />
                                    )
                                }}
                            />
                            <label htmlFor="">Description</label>

                            <Controller
                                name="description"
                                control={control}
                                render={({field}) => {
                                    return (
                                        <TextArea {...field} size="3" placeholder="Description..." />
                                    )
                                }}
                            />

                            <Button>
                                Create Project
                            </Button>

                        </form>
                    </Card>
                </Flex>

            </Container>

        </div>
    )
}
export default TaskNewPage