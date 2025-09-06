import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core"

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  sexo: varchar("sexo", { length: 255 }).notNull(),
  edad: int("edad").notNull(),
})
