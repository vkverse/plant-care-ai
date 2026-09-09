import "server-only";
import type { PlantRepository, SavedPlant } from "../../domain/plant";
import type { AppUser } from "../../domain/user";
import { database } from "./pool";

export function createPostgresPlantRepository(user: AppUser): PlantRepository {
  return {
    async list() {
      const result = await database().query<{ data: SavedPlant }>(
        "SELECT data FROM plants WHERE user_id = $1 ORDER BY updated_at DESC",
        [user.id],
      );
      return result.rows.map((row) => row.data);
    },
    async save(plant) {
      const client = await database().connect();
      try {
        await client.query("BEGIN");
        await client.query(
          `INSERT INTO app_users (id, name, email) VALUES ($1, $2, $3)
          ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email`,
          [user.id, user.name, user.email],
        );
        // Ownership comes from the session; the composite key prevents cross-user overwrites.
        await client.query(
          `INSERT INTO plants (user_id, id, data) VALUES ($1, $2, $3::jsonb)
          ON CONFLICT (user_id, id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
          [user.id, plant.id, JSON.stringify(plant)],
        );
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
  };
}
