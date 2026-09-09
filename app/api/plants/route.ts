import { currentUser } from "../../../src/infrastructure/auth/session";
import { createPostgresPlantRepository } from "../../../src/infrastructure/database/postgres-plant-repository";
import { isSavedPlant } from "../../../src/domain/plant-validation";

const headers = { "Cache-Control": "private, no-store" };
async function authorize(request: Request) {
  const user = await currentUser();
  if (!user)
    return Response.json(
      { error: "Sign in required" },
      { status: 401, headers },
    );
  // Detect stale tabs. The client header NEVER establishes identity.
  if (request.headers.get("X-Sprout-User") !== user.id)
    return Response.json(
      { error: "Account changed; reload" },
      { status: 409, headers },
    );
  if (!process.env.DATABASE_URL)
    return Response.json(
      { error: "Database setup pending" },
      { status: 503, headers },
    );
  return user;
}
export async function GET(request: Request) {
  try {
    const user = await authorize(request);
    if (user instanceof Response) return user;
    return Response.json(await createPostgresPlantRepository(user).list(), {
      headers,
    });
  } catch {
    return Response.json(
      { error: "Could not load plants" },
      { status: 503, headers },
    );
  }
}
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return Response.json({ error: "Invalid origin" }, { status: 403, headers });
  try {
    const user = await authorize(request);
    if (user instanceof Response) return user;
    const body = await request.text();
    if (body.length > 8192)
      return Response.json(
        { error: "Request too large" },
        { status: 413, headers },
      );
    let plant: unknown;
    try {
      plant = JSON.parse(body);
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400, headers });
    }
    if (!isSavedPlant(plant))
      return Response.json(
        { error: "Invalid plant" },
        { status: 400, headers },
      );
    await createPostgresPlantRepository(user).save(plant);
    return Response.json({ saved: true }, { headers });
  } catch {
    return Response.json(
      { error: "Could not save plant" },
      { status: 503, headers },
    );
  }
}
