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

export async function getUserByUsername(username: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      blogs: true,
    },
  });

  return user;
}

type NewUser = {
  username: string;
  name: string;
  passwordHash: string;
};

export async function createUser(user: NewUser) {
  const [created] = await db
    .insert(usersTable)
    .values({
      username: user.username,
      name: user.name,
      passwordHash: user.passwordHash,
    })
    .returning();

  return created ? mapUser(created) : null;
}
