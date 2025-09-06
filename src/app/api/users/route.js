import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET → listar usuarios
export async function GET() {
  const result = await db.select().from(users);
  return Response.json(result);
}

// POST → crear usuario
export async function POST(req) {
  const body = await req.json();
  const result = await db.insert(users).values({
    name: body.name,
    email: body.email,
  });
  return Response.json({ success: true, result });
}

// PUT → actualizar usuario
export async function PUT(req) {
  const body = await req.json();
  const result = await db
    .update(users)
    .set({ name: body.name, email: body.email })
    .where(eq(users.id, body.id));
  return Response.json({ success: true, result });
}

// DELETE → eliminar usuario
export async function DELETE(req) {
  const body = await req.json();
  const result = await db.delete(users).where(eq(users.id, body.id));
  return Response.json({ success: true, result });
}
