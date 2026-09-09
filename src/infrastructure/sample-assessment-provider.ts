import type { AssessmentProvider } from "../domain/plant";

export const sampleAssessmentProvider: AssessmentProvider = {
  async assess(context) {
    return {
      mode: "sample",
      name: "Peace lily example",
      explanation:
        "This is a sample care plan based on your answers. Your photo has not been identified or assessed for disease.",
      actions: [
        {
          id: "soil",
          title:
            context.soil === "Still wet"
              ? "Check before watering again"
              : "Check moisture below the surface",
          description:
            context.soil === "Still wet"
              ? "Check drainage and avoid adding more water while the soil remains wet."
              : "Check below the dry surface before deciding whether to water. Surface appearance alone is not enough.",
        },
        {
          id: "light",
          title:
            context.light === "Direct sun"
              ? "Check for harsh sunlight"
              : "Observe the light through the day",
          description:
            "For this peace-lily example, assess whether the location provides bright, indirect light.",
        },
        {
          id: "observe",
          title: "Record what changes",
          description:
            "Compare new growth and visible symptoms over the next few days before changing several care habits at once.",
        },
      ],
    };
  },
};
