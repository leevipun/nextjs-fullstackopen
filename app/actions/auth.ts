"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { signIn, signOut } from "@/auth";
import { createUser, getUserByUsername } from "@/app/services/users";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    redirect("/login?error=missing");
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/blogs",
    });
  } catch (error) {
    redirect("/login?error=invalid");
  }
}

export async function registerAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !name || !password) {
    redirect("/register?error=missing");
  }

  const existing = await getUserByUsername(username);

  if (existing) {
    redirect("/register?error=exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const created = await createUser({ username, name, passwordHash });

  if (!created) {
    redirect("/register?error=failed");
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/blogs",
    });
  } catch (error) {
    redirect("/login?error=invalid");
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
