import HeaderDashboard from "@/components/dashboard/HeaderDashboard"
import { conexion } from "@/libs/mysql"
import { Container, Grid } from "@radix-ui/themes"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectCard from "@/components/projects/ProjectCard";

interface Project {
    id: number;
    title: string;
    description: string;
}

const loadProjects = async (): Promise<Project[]> => {
    const session = await getServerSession(authOptions)

    const projects = await conexion.query(
        "SELECT * FROM project WHERE userId = ?", [session?.user.id]
    );

    return projects as Project[];
};


const DashboardPage = async () => {

    const projects = await loadProjects()

    return (
        <Container className="mt-10">
            <HeaderDashboard />

            <Grid columns="3" gap="4" mt="4">
                {projects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </Grid>
        </Container>
    )
}
export default DashboardPage