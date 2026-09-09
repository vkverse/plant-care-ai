import "server-only";
import { cookies } from "next/headers";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { demoUsers, type AppUser } from "../../domain/user";
import { authMode, demoEnabled, workosConfigured } from "./config";

export const DEMO_COOKIE = "sprout-demo-profile";

export async function currentUser(): Promise<AppUser | null> {
  if (authMode() === "workos") {
    if (!workosConfigured()) return null;
    const { user } = await withAuth();
    return user
      ? {
          id: user.id,
          email: user.email,
          name:
            [user.firstName, user.lastName].filter(Boolean).join(" ") ||
            user.email,
          demo: false,
        }
      : null;
  }
  if (!demoEnabled()) return null;
  const id = (await cookies()).get(DEMO_COOKIE)?.value;
  return demoUsers.find((user) => user.id === id) ?? null;
}
