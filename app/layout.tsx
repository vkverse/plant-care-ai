import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { authMode, workosConfigured } from "../src/infrastructure/auth/config";

export const metadata: Metadata = {
  title: "Sprout — Plant health coach",
  description: "Understand what your plant needs and why.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#193426",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{authMode() === "workos" && workosConfigured() ? <AuthKitProvider>{children}</AuthKitProvider> : children}</body>
    </html>
  );
}
