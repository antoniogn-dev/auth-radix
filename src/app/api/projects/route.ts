import { conexion } from "@/libs/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {

    const data = await request.json()

    const session = await getServerSession(authOptions)
    
    await conexion.query("INSERT INTO project SET ?", {
        userId: Number(session?.user.id),
        title: data.title,
        description: data.description
    })
    
    return NextResponse.json({title: data.title, description: data.description}, {status: 201})
}