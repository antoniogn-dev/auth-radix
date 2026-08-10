import { conexion } from "@/libs/mysql";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
 
  const salt = await bcrypt.genSalt(10)
  data.password = await bcrypt.hash(data.password, salt);

  await conexion.query("INSERT INTO user SET ?", {
    name: data.name,
    email: data.email,
    password: data.password,
  });

  //  "INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email",
  //     [nombre, email, hashedPassword]

  return NextResponse.json({ message: "Registrado..." }, { status: 201 });
}
