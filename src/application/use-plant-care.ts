"use client";

import { useEffect, useRef, useState } from "react";
import type {
  Assessment,
  AssessmentProvider,
  PlantContext,
  PlantRepository,
  SavedPlant,
} from "../domain/plant";

export function usePlantCare(
  provider: AssessmentProvider,
  repository: PlantRepository,
) {
  const [stage, setStage] = useState<
    "start" | "questions" | "scanning" | "result" | "plants"
  >("start");
  const [context, setContext] = useState<PlantContext>({
    light: "Bright indirect",
    soil: "Dry on top",
  });
  const [photo, setPhoto] = useState<string>();
  const [assessment, setAssessment] = useState<Assessment>();
  const [completed, setCompleted] = useState<string[]>([]);
  const [plants, setPlants] = useState<SavedPlant[]>([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const saving = useRef(false);
  const request = useRef(0);
  const savedId = useRef<string | undefined>(undefined);

  useEffect(
    () => () => {
      if (photo) URL.revokeObjectURL(photo);
    },
    [photo],
  );
  useEffect(
    () => () => {
      request.current++;
    },
    [],
  );

  function reset() {
    request.current++;
    savedId.current = undefined;
    setStage("start");
    setPhoto(undefined);
    setAssessment(undefined);
    setCompleted([]);
    setSaved(false);
    setError("");
    setContext({ light: "Bright indirect", soil: "Dry on top" });
  }

  function choose(file: File) {
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setError("Choose a JPEG, PNG or WebP image under 5 MB.");
      return;
    }
    setError("");
    setPhoto(URL.createObjectURL(file));
    setStage("questions");
  }

  async function analyse() {
    const current = ++request.current;
    setStage("scanning");
    setError("");
    try {
      const result = await provider.assess(context);
      if (current !== request.current) return;
      setAssessment(result);
      setStage("result");
    } catch {
      if (current !== request.current) return;
      setError("Could not prepare the plan. Please try again.");
      setStage("questions");
    }
  }

  async function persist(nextCompleted = completed) {
    if (!assessment || saving.current) return false;
    const current = request.current;
    saving.current = true;
    setBusy(true);
    try {
      const id = savedId.current ?? crypto.randomUUID();
      await repository.save({
        id,
        name: assessment.name,
        context,
        completed: nextCompleted,
        savedAt: new Date().toISOString(),
      });
      if (current !== request.current) return false;
      savedId.current = id;
      setSaved(true);
      setError("");
      return true;
    } catch {
      setError(
        "Could not save changes. Check your connection or sign in again and retry.",
      );
      return false;
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  async function toggle(id: string) {
    if (saving.current) return;
    const next = completed.includes(id)
      ? completed.filter((item) => item !== id)
      : [...completed, id];
    if (saved && !(await persist(next))) return;
    setCompleted(next);
  }

  async function showPlants() {
    const current = ++request.current;
    try {
      const result = await repository.list();
      if (current !== request.current) return;
      setPlants(result);
      setError("");
      setStage("plants");
    } catch {
      if (current !== request.current) return;
      setError(
        "Saved plants could not be loaded. Your existing data has been left intact.",
      );
    }
  }

  async function openPlant(plant: SavedPlant) {
    const current = ++request.current;
    try {
      const result = await provider.assess(plant.context);
      if (current !== request.current) return;
      savedId.current = plant.id;
      setContext(plant.context);
      setCompleted(plant.completed);
      setAssessment(result);
      setPhoto(undefined);
      setSaved(true);
      setStage("result");
      setError("");
    } catch {
      if (current === request.current)
        setError("Could not open this plant. Please retry.");
    }
  }

  return {
    stage,
    context,
    photo,
    assessment,
    completed,
    plants,
    error,
    saved,
    busy,
    reset,
    choose,
    analyse,
    toggle,
    showPlants,
    openPlant,
    save: () => persist(),
    setContext,
    sample: () => setStage("questions"),
  };
}
