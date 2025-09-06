import { db } from "@/db";
import { users } from "@/db/schema";

// GET → listar usuarios
export async function GET() {
  const result = await db.select().from(users);
  return new Response(JSON.stringify({ success: true, result }), {
    headers: { "Content-Type": "application/json" },
  });
}

// POST → crear usuario
export async function POST(req) {
  const body = await req.json();
  const result = await db.insert(users).values({
    name: body.name,
    email: body.email,
    edad: body.edad,
    sexo: body.sexo,
  });

  return new Response(JSON.stringify({ success: true, result }), {
    headers: { "Content-Type": "application/json" },
  });
}