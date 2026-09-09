import { handleAuth } from "@workos-inc/authkit-nextjs";
import type { NextRequest } from "next/server";
import {
  authMode,
  workosConfigured,
} from "../../src/infrastructure/auth/config";

export async function GET(request: NextRequest) {
  if (authMode() !== "workos" || !workosConfigured())
    return new Response("WorkOS is not configured", { status: 503 });
  return handleAuth({ returnPathname: "/" })(request);
}
