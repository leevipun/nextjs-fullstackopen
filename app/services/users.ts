import { db } from "@/db";
import { users as usersTable } from "@/db/schema";
import { User } from "../assets/data";

function mapUser(row: typeof usersTable.$inferSelect): User {
  return {
    id: row.id,
    username: row.username,
    name: row.name,
  };
}

export async function getUsers() {
  const rows = await db.select().from(usersTable);
  return rows.map(mapUser);
}
