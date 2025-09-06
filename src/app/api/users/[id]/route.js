import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// PUT → actualizar usuario
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const result = await db
    .update(users)
    .set({
      name: body.name,
      email: body.email,
      edad: body.edad,
      sexo: body.sexo,
    })
    .where(eq(users.id, Number(id)));

  return new Response(JSON.stringify({ success: true, result }), {
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE → eliminar usuario
export async function DELETE(req, { params }) {
  const { id } = params;

  const result = await db.delete(users).where(eq(users.id, Number(id)));

  return new Response(JSON.stringify({ success: true, result }), {
    headers: { "Content-Type": "application/json" },
  });
}
