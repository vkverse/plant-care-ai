"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "@workos-inc/authkit-nextjs";
import { demoUsers } from "../domain/user";
import { authMode, demoEnabled } from "../infrastructure/auth/config";
import { DEMO_COOKIE } from "../infrastructure/auth/session";

export async function demoLogin(data: FormData) {
  if (!demoEnabled())
    throw new Error("Demo login is available only in local development.");
  const user = demoUsers.find((item) => item.id === data.get("profile"));
  if (!user) throw new Error("Unknown demo profile");
  (await cookies()).set(DEMO_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/");
}

export async function logout() {
  if (authMode() === "workos") await signOut({ returnTo: "/login" });
  (await cookies()).delete(DEMO_COOKIE);
  redirect("/login");
}
