import type { CareAction } from "../../domain/plant";

export function CarePlan({
  actions,
  completed,
  onToggle,
  disabled = false,
}: {
  actions: CareAction[];
  completed: string[];
  onToggle: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <section className="plan">
      <div>
        <span className="kicker">YOUR SAMPLE CARE PLAN</span>
        <b>
          {completed.length}/{actions.length} done
        </b>
      </div>
      {actions.map((action, index) => (
        <button
          key={action.id}
          disabled={disabled}
          aria-pressed={completed.includes(action.id)}
          className={completed.includes(action.id) ? "care done" : "care"}
          onClick={() => onToggle(action.id)}
        >
          <span>
            {completed.includes(action.id)
              ? "✓"
              : String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <b>{action.title}</b>
            <p>{action.description}</p>
          </div>
        </button>
      ))}
    </section>
  );
}
