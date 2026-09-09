import { lightOptions, soilOptions, type SavedPlant } from "./plant";

export function isSavedPlant(value: unknown): value is SavedPlant {
  if (!value || typeof value !== "object") return false;
  const plant = value as SavedPlant;
  return (
    typeof plant.id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      plant.id,
    ) &&
    typeof plant.name === "string" &&
    plant.name.length > 0 &&
    plant.name.length <= 120 &&
    typeof plant.savedAt === "string" &&
    Number.isFinite(Date.parse(plant.savedAt)) &&
    !!plant.context &&
    lightOptions.includes(plant.context.light) &&
    soilOptions.includes(plant.context.soil) &&
    Array.isArray(plant.completed) &&
    plant.completed.length <= 3 &&
    new Set(plant.completed).size === plant.completed.length &&
    plant.completed.every((id) => ["soil", "light", "observe"].includes(id))
  );
}
