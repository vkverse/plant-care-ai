import {
  lightOptions,
  soilOptions,
  type PlantContext,
} from "../../domain/plant";
import { OptionGroup } from "../../components/option-group";
import { PlantPhoto } from "../../components/plant-photo";

type Props = {
  photo?: string;
  context: PlantContext;
  onChange: (context: PlantContext) => void;
  onSubmit: () => void;
};

export function ContextScreen({ photo, context, onChange, onSubmit }: Props) {
  return (
    <div className="questions">
      <div className="photo-card">
        <PlantPhoto src={photo} alt="Selected plant preview" />
        <span>Sample experience</span>
      </div>
      <div className="question-copy">
        <span className="step">STEP 2 OF 2</span>
        <h2>A little context makes care more useful.</h2>
        <p>Your answers adjust this example plan. Photos are not analysed.</p>
      </div>
      <OptionGroup
        label="What light does it get?"
        options={lightOptions}
        value={context.light}
        onChange={(light) => onChange({ ...context, light })}
      />
      <OptionGroup
        label="How does the soil feel?"
        options={soilOptions}
        value={context.soil}
        onChange={(soil) => onChange({ ...context, soil })}
      />
      <button className="primary" onClick={onSubmit}>
        Prepare sample plan
      </button>
    </div>
  );
}
