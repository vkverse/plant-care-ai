import { authkitProxy } from "@workos-inc/authkit-nextjs";
import {
  NextResponse,
  type NextRequest,
  type NextFetchEvent,
} from "next/server";
import { authMode, workosConfigured } from "./src/infrastructure/auth/config";

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (authMode() === "workos" && workosConfigured())
    return authkitProxy()(request, event);
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/sign-in", "/callback", "/api/plants/:path*"],
};
