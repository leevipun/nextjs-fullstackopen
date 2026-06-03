"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { auth } from "@/auth";

type RegisterErrors = {
  username?: string[];
  password?: string[];
  passwordConfirm?: string[];
};

type RegisterState = {
  errors?: RegisterErrors;
  message?: string;
  fields?: {
    username: string;
    name: string;
  };
};

export const registerUser = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const rawData = { username, name };
  const errors: RegisterErrors = {};

  if (username.length < 4) {
    errors.username = ["Username must be at least 4 characters long"];
  }

  if (password.length < 4) {
    errors.password = ["Password must be at least 4 characters long"];
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = ["Passwords do not match"];
  }

  if (Object.keys(errors).length > 0) {
    return { errors, fields: rawData };
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existing) {
    return {
      message: "A user with this username already exists",
      fields: rawData,
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const generateTokenAction = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const token = crypto.randomUUID();

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, Number(session.user.id)));

  revalidatePath("/me");
};
