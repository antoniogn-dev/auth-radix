"use client"

import { Card, Heading, Text } from "@radix-ui/themes"
import { useRouter } from "next/navigation"

interface Props {
    id: number
    title: string
    description: string
}

const ProjectCard = ({id, title, description}: Props) => {

    const router = useRouter()
    return (
        <Card onClick={() => router.push(`/dashboard/projects/${id}`)} className="cursor-pointer hover:opacity-75">
            <Heading>{title}</Heading>
            <Text className="text-slate-500">{description}</Text>
        </Card>
    )
}
export default ProjectCard