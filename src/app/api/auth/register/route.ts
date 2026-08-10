import { conexion } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  const newUser = await conexion.query("INSERT INTO user SET ?", {
    name: data.name,
    email: data.email,
    password: data.password
  });

  //  "INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email",
  //     [nombre, email, hashedPassword]

  return NextResponse.json({message: "Registrado..."}, {status: 201});
}
