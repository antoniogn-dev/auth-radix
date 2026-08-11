import HeaderDashboard from "@/components/dashboard/HeaderDashboard"
import { conexion } from "@/libs/mysql"
import { Container } from "@radix-ui/themes"
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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {projects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </Container>
    )
}
export default DashboardPage