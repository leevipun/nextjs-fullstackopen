"use server";

import { getUserByUsername } from "@/app/services/users";

export async function getUserByUsernameAction(userName: string) {
  return getUserByUsername(userName);
}
