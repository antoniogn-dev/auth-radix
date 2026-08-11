import { conexion } from "@/libs/mysql";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  email: string;
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  if (!data.name || !data.email || !data.password) {
    return NextResponse.json(
      { message: "Todos los campos son obligatorios" },
      { status: 400 },
    );
  }

  // Verifica si el email ya existe
  const existingUsers = (await conexion.query(
    "SELECT id FROM user WHERE email = ?",
    [data.email],
  )) as User[];
      
  if (existingUsers.length > 0) {
    return NextResponse.json(
      { message: "Este email ya está registrado" },
      { status: 409 },
    );
  }

  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);

  await conexion.query("INSERT INTO user SET ?", {
    name: data.name,
    email: data.email,
    password: data.password,
  });

  //  "INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email",
  //     [nombre, email, hashedPassword]

  return NextResponse.json(
    { message: "Registrado correctamente", email: data.email },
    { status: 201 },
  );
}
