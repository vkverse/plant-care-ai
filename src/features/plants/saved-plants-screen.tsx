import type { SavedPlant } from "../../domain/plant";

export function SavedPlantsScreen({
  plants,
  onOpen,
  onCreate,
}: {
  plants: SavedPlant[];
  onOpen: (plant: SavedPlant) => void;
  onCreate: () => void;
}) {
  return (
    <div className="questions">
      <h2>My plants</h2>
      <p className="explain">
        Your saved sample plans. Open a plan to continue your checklist.
      </p>
      {plants.length === 0 && (
        <p>No saved plants yet. Create a sample plan to get started.</p>
      )}
      {plants.map((plant) => (
        <button className="care" key={plant.id} onClick={() => onOpen(plant)}>
          <span aria-hidden="true">🌿</span>
          <div>
            <b>{plant.name}</b>
            <p>
              {plant.completed.length}/3 actions done · {plant.context.light}
            </p>
          </div>
        </button>
      ))}
      <button className="text-button" onClick={onCreate}>
        Create another plan
      </button>
    </div>
  );
}
