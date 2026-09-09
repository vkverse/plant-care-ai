import { redirect } from "next/navigation";
import { currentUser } from "../../src/infrastructure/auth/session";
import {
  authMode,
  demoEnabled,
  workosConfigured,
} from "../../src/infrastructure/auth/config";
import { LoginScreen } from "../../src/features/auth/login-screen";
import { ProductStory } from "../../src/components/product-story";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await currentUser()) redirect("/");
  return (
    <main className="app-shell">
      <ProductStory />
      <LoginScreen
        demo={demoEnabled()}
        workos={authMode() === "workos" && workosConfigured()}
      />
    </main>
  );
}
