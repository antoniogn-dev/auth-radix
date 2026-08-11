import { conexion } from "@/libs/mysql";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

interface DeleteResult {
    affectedRows: number;
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const result = await conexion.query("DELETE FROM project WHERE id = ? AND userId = ?", [
      Number(id), session.user.id
    ]) as DeleteResult;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Proyecto no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Proyecto eliminado correctamente" },
      { status: 200 },
    );
  } catch (error) {
    console.error("ERROR DELETE PROJECT:", error);

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
