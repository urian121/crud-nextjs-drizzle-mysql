import mysql from "mysql2/promise" // importamos la conexión
import { drizzle } from "drizzle-orm/mysql2"

// conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

// exportamos la conexión
export const db = drizzle(pool)
