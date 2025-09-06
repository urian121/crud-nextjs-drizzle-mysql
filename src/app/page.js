import { db } from "@/db" // importamos la conexión
import { users } from "@/db/schema" // importamos la tabla

export default async function Home() {
const list = await db.select().from(users)
console.log(list);

  return (
      <div>
          <h1>Usuarios</h1>
          <ul>
            {list.map(u => (
              <li key={u.id}>{u.name} — {u.email}</li>
            ))}
          </ul>
      </div>
  );
}
