# CRUD con Next.js 15 + Drizzle ORM + MySQL/MariaDB (JavaScript)

Este proyecto muestra cómo crear un CRUD paso a paso usando **Next.js 15**, **Drizzle ORM** y **MySQL/MariaDB**, sin TypeScript.


## 1. Crear proyecto Next.js

```bash
npx create-next-app@latest crud-nextjs-drizzle-mysql --js
cd crud-nextjs-drizzle-mysql
```

👉 Con `--js` creamos el proyecto en **JavaScript**.


## 2. Instalar dependencias necesarias

```bash
npm install drizzle-orm mysql2 dotenv
npm install -D drizzle-kit
```

- **drizzle-orm** → el ORM que usaremos.
- **mysql2** → cliente para MySQL/MariaDB.
- **dotenv** → para manejar variables de entorno `.env`.
- **drizzle-kit** → CLI de Drizzle para generar migraciones (**solo en desarrollo**).


## 3. Crear archivo `.env`

Archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_clave
DB_NAME=nextjsdb

DATABASE_URL=mysql://root:tu_clave@localhost:3306/nextjsdb
```

👉 Funciona igual con **MariaDB**.

## 4. Configuración de Drizzle

Archivo: `drizzle.config.cjs`

```js
module.exports = {
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
```

## 5. Crear conexión y schema

### 📂 `src/db/index.js`

```js
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const db = drizzle(pool);
```

### 📂 `src/db/schema.js`

```js
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
});
```

## 6. Generar y aplicar migraciones

```bash
npx drizzle-kit generate --config=drizzle.config.cjs
npx drizzle-kit migrate --config=drizzle.config.cjs
```

Esto hace:
- Lee tu `schema.js`.
- Genera migraciones en la carpeta `drizzle/`.
- Aplica cambios a tu base de datos.

👉 Para evitar repetir `--config=drizzle.config.cjs`, agrega en `package.json`:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate --config=drizzle.config.cjs",
    "db:migrate": "drizzle-kit migrate --config=drizzle.config.cjs"
  }
}
```

Ahora puedes correr:

```bash
npm run db:generate
npm run db:migrate
```


## 7. Crear rutas CRUD en Next.js

📂 `src/app/api/users/route.js`

```js
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
```

---

## 8. Probar el CRUD

Puedes usar **Postman**, **Insomnia** o **fetch desde el frontend**:

- **GET** → `http://localhost:3000/api/users`
- **POST** → crear usuario
```json
{
  "name": "Urian",
  "email": "urian@example.com"
}
```
- **PUT** → actualizar usuario
```json
{
  "id": 1,
  "name": "Urian Dev",
  "email": "urian.dev@example.com"
}
```
- **DELETE** → eliminar usuario
```json
{
  "id": 1
}
```

✅ Listo, ya tienes un CRUD funcional con **Next.js + Drizzle ORM + MySQL/MariaDB** en **JavaScript**.
