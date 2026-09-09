"use client";

import "./features/care/feedback.css";

import { usePlantCare } from "./application/use-plant-care";
import { sampleAssessmentProvider } from "./infrastructure/sample-assessment-provider";
import { useMemo } from "react";
import { createLocalPlantRepository } from "./infrastructure/demo-plant-repository";
import { createHttpPlantRepository } from "./infrastructure/http-plant-repository";
import type { AppUser, StorageMode } from "./domain/user";
import { AccountMenu } from "./features/auth/account-menu";
import { CaptureScreen } from "./features/scanner/capture-screen";
import { ContextScreen } from "./features/scanner/context-screen";
import { ResultScreen } from "./features/care/result-screen";
import { SavedPlantsScreen } from "./features/plants/saved-plants-screen";

export function PlantCareApp({
  user,
  storageMode,
}: {
  user: AppUser;
  storageMode: StorageMode;
}) {
  const repository = useMemo(
    () =>
      storageMode === "postgres"
        ? createHttpPlantRepository(user.id)
        : createLocalPlantRepository(user.id),
    [user.id, storageMode],
  );
  const care = usePlantCare(sampleAssessmentProvider, repository);
  return (
    <section className="device" aria-label="Sprout plant care">
      <header>
        <button onClick={care.reset} aria-label="Start over">
          ↙
        </button>
        <AccountMenu user={user} storageMode={storageMode} />
        <button onClick={care.showPlants} aria-label="My saved plants">
          ☘
        </button>
      </header>
      {care.error && (
        <p role="alert" className="error-message">
          {care.error}
        </p>
      )}
      {care.stage === "start" && (
        <CaptureScreen onChoose={care.choose} onSample={care.sample} />
      )}
      {care.stage === "questions" && (
        <ContextScreen
          photo={care.photo}
          context={care.context}
          onChange={care.setContext}
          onSubmit={care.analyse}
        />
      )}
      {care.stage === "scanning" && (
        <div className="scanning">
          <div role="status">
            <h2>Preparing your sample plan…</h2>
          </div>
        </div>
      )}
      {care.stage === "result" && care.assessment && (
        <ResultScreen
          assessment={care.assessment}
          photo={care.photo}
          completed={care.completed}
          saved={care.saved}
          busy={care.busy}
          storageMode={storageMode}
          onToggle={care.toggle}
          onSave={care.save}
          onReset={care.reset}
        />
      )}
      {care.stage === "plants" && (
        <SavedPlantsScreen
          plants={care.plants}
          onOpen={care.openPlant}
          onCreate={care.reset}
        />
      )}
    </section>
  );
}
