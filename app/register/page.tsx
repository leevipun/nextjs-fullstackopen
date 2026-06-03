"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: undefined,
    message: undefined,
    fields: undefined,
  });

  return (
    <div className="mx-auto w-full max-w-md px-6 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Register</h2>
        <form action={formAction} key={JSON.stringify(state)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Username
              <input
                type="text"
                name="username"
                defaultValue={state?.fields?.username ?? ""}
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </label>
            {state?.errors?.username && (
              <p data-testid="username-error" className="mt-1 text-sm text-red-500">{state.errors.username[0]}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
              <input
                type="text"
                name="name"
                defaultValue={state?.fields?.name ?? ""}
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
              <input
                type="password"
                name="password"
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </label>
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-red-500">{state.errors.password[0]}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Confirm Password
              <input
                type="password"
                name="passwordConfirm"
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </label>
            {state?.errors?.passwordConfirm && (
              <p data-testid="passwordConfirm-error" className="mt-1 text-sm text-red-500">{state.errors.passwordConfirm[0]}</p>
            )}
          </div>
          {state?.message && (
            <p className="mt-1 text-sm text-red-500">{state.message}</p>
          )}
          <button
            type="submit"
            data-testid="register-button"
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
