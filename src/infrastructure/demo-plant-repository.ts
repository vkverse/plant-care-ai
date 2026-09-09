import type { PlantRepository } from "../domain/plant";
import { isSavedPlant } from "../domain/plant-validation";

// Demo separation only. Never treat browser storage as real authentication.
// Anonymous v1 data remains untouched; it is not assigned to a demo account.
export function createLocalPlantRepository(userId: string): PlantRepository {
  const key = `sprout.plants.v2.${encodeURIComponent(userId)}`;
  return {
    async list() {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const value: unknown = JSON.parse(raw);
      if (!Array.isArray(value) || !value.every(isSavedPlant))
        throw new Error("Invalid saved plants");
      return value;
    },
    async save(plant) {
      if (!isSavedPlant(plant)) throw new Error("Invalid plant");
      const plants = await this.list();
      localStorage.setItem(
        key,
        JSON.stringify([
          plant,
          ...plants.filter((item) => item.id !== plant.id),
        ]),
      );
    },
  };
}
