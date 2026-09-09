import "server-only";

export function authMode() {
  const mode = process.env.AUTH_MODE ?? "demo";
  if (mode !== "demo" && mode !== "workos")
    throw new Error("Invalid AUTH_MODE");
  return mode;
}

export function demoEnabled() {
  return authMode() === "demo" && process.env.NODE_ENV !== "production";
}

export function workosConfigured() {
  return Boolean(
    process.env.WORKOS_API_KEY &&
    process.env.WORKOS_CLIENT_ID &&
    process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI &&
    (process.env.WORKOS_COOKIE_PASSWORD?.length ?? 0) >= 32,
  );
}
