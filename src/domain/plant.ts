export const lightOptions = [
  "Low light",
  "Bright indirect",
  "Direct sun",
] as const;
export const soilOptions = ["Still wet", "Dry on top", "Very dry"] as const;

export type PlantContext = {
  light: (typeof lightOptions)[number];
  soil: (typeof soilOptions)[number];
};

export type CareAction = { id: string; title: string; description: string };
export type Assessment = {
  mode: "sample";
  name: string;
  explanation: string;
  actions: CareAction[];
};

export type SavedPlant = {
  id: string;
  name: string;
  context: PlantContext;
  completed: string[];
  savedAt: string;
};

export interface AssessmentProvider {
  assess(context: PlantContext): Promise<Assessment>;
}

export interface PlantRepository {
  list(): Promise<SavedPlant[]>;
  save(plant: SavedPlant): Promise<void>;
}
