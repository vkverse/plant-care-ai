import { PlantCareApp } from "../src/plant-care-app";
import { ProductStory } from "../src/components/product-story";
import { redirect } from "next/navigation";
import { currentUser } from "../src/infrastructure/auth/session";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/login");
  if (!user.demo && !process.env.DATABASE_URL) {
    return (
      <main className="app-shell">
        <p>
          Account storage setup is pending. Configure PostgreSQL to continue.
        </p>
      </main>
    );
  }
  return (
    <main className="app-shell">
      <ProductStory />
      <PlantCareApp
        key={user.id}
        user={user}
        storageMode={process.env.DATABASE_URL ? "postgres" : "demo-local"}
      />
    </main>
  );
}
