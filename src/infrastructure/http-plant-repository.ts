import type { PlantRepository } from "../domain/plant";
import { isSavedPlant } from "../domain/plant-validation";

export function createHttpPlantRepository(userId: string): PlantRepository {
  const headers = {
    "Content-Type": "application/json",
    "X-Sprout-User": userId,
  };
  return {
    async list() {
      const response = await fetch("/api/plants", {
        cache: "no-store",
        headers,
      });
      if (!response.ok) throw new Error("Could not load plants");
      const data: unknown = await response.json();
      if (!Array.isArray(data) || !data.every(isSavedPlant))
        throw new Error("Invalid response");
      return data;
    },
    async save(plant) {
      const response = await fetch("/api/plants", {
        method: "POST",
        headers,
        body: JSON.stringify(plant),
      });
      if (!response.ok) throw new Error("Could not save plant");
    },
  };
}
