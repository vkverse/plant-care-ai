import type { Assessment } from "../../domain/plant";
import { PlantPhoto } from "../../components/plant-photo";
import { CarePlan } from "./care-plan";
import type { StorageMode } from "../../domain/user";

type Props = {
  assessment: Assessment;
  photo?: string;
  completed: string[];
  saved: boolean;
  busy: boolean;
  storageMode: StorageMode;
  onToggle: (id: string) => void;
  onSave: () => void;
  onReset: () => void;
};

export function ResultScreen({
  assessment,
  photo,
  completed,
  saved,
  busy,
  storageMode,
  onToggle,
  onSave,
  onReset,
}: Props) {
  return (
    <div className="results">
      <div className="result-photo">
        <PlantPhoto src={photo} alt="Your selected photo; not identified" />
        <span className="confidence">Example only · no AI analysis</span>
        <div>
          <h2>{assessment.name}</h2>
        </div>
      </div>
      <div className="result-content">
        <span className="kicker">SAMPLE GUIDANCE</span>
        <div className="diagnosis">
          <h1>
            Observe first.
            <br />
            Care with context.
          </h1>
        </div>
        <p className="explain">{assessment.explanation}</p>
        <CarePlan
          actions={assessment.actions}
          completed={completed}
          disabled={busy}
          onToggle={onToggle}
        />
        <button className="primary" onClick={onSave} disabled={saved || busy}>
          {busy
            ? "Saving…"
            : saved
              ? "Saved to your collection ✓"
              : "Save sample plant"}
        </button>
        <button className="text-button" onClick={onReset}>
          Start another plan
        </button>
        <small className="disclaimer">
          {storageMode === "postgres"
            ? "Plans are saved to your account in PostgreSQL."
            : "Demo plans stay in this browser, separated by profile."}{" "}
          Photos are not stored. No notifications are scheduled.
        </small>
      </div>
    </div>
  );
}
