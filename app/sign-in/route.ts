import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import {
  authMode,
  workosConfigured,
} from "../../src/infrastructure/auth/config";

export async function GET() {
  if (authMode() !== "workos" || !workosConfigured()) redirect("/login");
  redirect(await getSignInUrl());
}
