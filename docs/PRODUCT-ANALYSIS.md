# Plant Care AI — product and open-source analysis

Updated: 2026-09-08

## Executive decision

Build this only if the wedge is **trustworthy plant recovery**, not generic identification. Identification, reminders, light meters, care schedules, and disease suggestions already exist in mature products. The useful gap is an app that combines a photo with environmental context, communicates uncertainty, gives only a few reversible actions, and checks whether those actions worked.

The Instagram ad is a compelling interaction concept, but its suggested remedies (“mineral water”, “add lemon”, “add ice”) demonstrate the central product risk: visually confident advice can be horticulturally weak or harmful. Real AR is not required to validate demand. A camera/upload flow with excellent diagnosis UX is enough for the first release.

## Market landscape

| Product | Strength shown publicly | Implication |
|---|---|---|
| PictureThis | Photo ID, health checks, toxicity/allergen information, care reminders | Competing on species coverage or feature count is expensive |
| Planta | Identification, adaptive care schedules, light guidance, community | Scheduling is table stakes, not a differentiator |
| PlantIn | Identification, diagnosis, watering calculator, light meter | “All-in-one plant app” is already crowded |
| Pl@ntNet | Strong community/research-backed species identification and API | A credible integration option for species ID |
| Kindwise plant.id / plant.health | Commercial species and health APIs with structured results | Fastest route to a diagnosis MVP, but creates unit economics and vendor dependence |

## Proposed customer and problem

Start with beginner indoor-plant owners who see a visible symptom and do not know what to do next. Their job is not “classify this species”; it is “help me avoid making this worse today.”

Primary flow:

1. Take one whole-plant photo and optionally a close leaf photo.
2. Ask two to four discriminating questions: soil moisture, light, last watering, drainage.
3. Return species candidates and a symptom assessment separately.
4. Explain the likely cause, alternatives, confidence, and missing evidence.
5. Give three safe actions and explicitly list what not to do.
6. Schedule a check-in photo in 3–7 days and learn from the outcome.

The longitudinal before/after dataset can become more defensible than a one-shot classifier.

## Open-source and API options

### Recommended for the MVP

- **Pl@ntNet API** for species identification. It accepts one to five images and returns candidate species with confidence scores. It also provides taxonomy and multilingual common names. Review attribution and commercial terms before launch.
- **Kindwise plant.health** for an initial health-assessment benchmark or paid production path. Its API is credit-based; identification and health assessment can consume separate credits. Keep it behind a provider interface to avoid lock-in.
- Store observations and user answers in Postgres/Supabase. Generate care explanations from curated horticultural rules, not unconstrained model text.

### Useful open datasets

- **PlantVillage**: 54,306 labeled healthy/diseased leaf images. Valuable for experiments, but mostly controlled leaf imagery and crop diseases; it does not represent messy indoor-plant photos well.
- **PlantDoc**: 2,598 images across 13 plant species and up to 17 disease classes, licensed CC BY 4.0. It is smaller but more realistic than laboratory-background datasets.
- **iNaturalist datasets/API**: strong biodiversity/taxonomy data and licensed observation images. The documented public API is primarily for observations and taxonomy; do not assume its internal computer-vision suggestions are a supported commercial inference endpoint.
- **TensorFlow Lite**: a viable Apache-licensed runtime for later on-device routing or narrow classifiers. A runtime is not a model; dataset quality and field validation remain the hard parts.

### What not to do

- Do not ship a random GitHub “99% accurate” PlantVillage model as a medical-style plant doctor. High held-out accuracy on controlled images does not imply performance on household scenes.
- Do not mix species confidence with disease confidence.
- Do not recommend pesticides, fertilizers, acids, or folk remedies from an unconstrained language model.
- Do not present AR labels as proof of spatial understanding. The first version can use a conventional camera overlay.

## MVP scope (6–8 weeks)

### Include

- Mobile-first PWA camera/upload
- Image quality checks and retake guidance
- Top three species candidates with confidence
- Whole-plant plus close-leaf capture
- Four context questions
- 10–20 common symptom families for common houseplants
- Evidence-based, reversible care actions
- “Why this answer?” and alternative causes
- Saved plants, reminders, and follow-up photo
- Feedback: improved / same / worse

### Exclude

- True world-anchored AR
- Universal plant and disease coverage
- Autonomous pesticide advice
- Social feed/community
- Marketplace or product sales
- Custom model training before collecting representative validation data

## Architecture

```text
PWA camera
  -> image-quality gate
  -> species provider (Pl@ntNet first)
  -> health provider (Kindwise benchmark or narrow model)
  -> context/rules engine
  -> calibrated result with alternatives
  -> care plan + follow-up outcome store
```

Define `SpeciesProvider` and `HealthProvider` interfaces from day one. Log provider versions, inputs, outputs, user confirmations, and outcomes. Never expose API keys to the browser.

## Business model

Freemium is plausible: limited scans and basic reminders free; unlimited scans, plant history, household sharing, and expert escalation paid. Avoid a hard subscription wall before the first useful result. A later B2B route could serve nurseries with QR-linked post-purchase care and reduced return rates.

The key unit-economic variable is paid API cost per completed diagnosis. Measure photo retries, multi-image use, and repeated scans before setting pricing.

## Validation gates

1. **Problem test:** interview 15–20 beginner plant owners using photos of plants they struggled with.
2. **Prototype test:** 10 moderated sessions; target 80% completion and correct understanding of uncertainty.
3. **Concierge pilot:** manually review 100 cases with a horticultural advisor.
4. **Model benchmark:** evaluate providers on the same representative set; report top-1/top-3 species accuracy, symptom recall, calibration, abstention rate, latency, and cost.
5. **Outcome gate:** at least 30% of users return for a follow-up photo and most reported outcomes are “improved” or “same,” with no serious harmful-advice incidents.

Proceed to a production build only after gates 1–3. Train a custom model only when the collected data is licensed, representative, and large enough to outperform provider economics or quality.

## Sources

- Pl@ntNet API: https://docs.plantnet.org/en/reference/api-plantnet/
- Pl@ntNet API agreement: https://my.plantnet.org/documents/agreement_PlantNet_API_english_v4.7_EUR.pdf
- Pl@ntNet GitHub: https://github.com/plantnet
- PlantVillage dataset: https://github.com/spMohanty/PlantVillage-Dataset
- PlantVillage paper: https://arxiv.org/abs/1511.08060
- PlantDoc dataset and CC BY 4.0 license: https://github.com/pratikkayal/PlantDoc-Dataset
- PlantDoc paper: https://arxiv.org/abs/1911.10317
- iNaturalist API: https://www.inaturalist.org/api
- iNaturalist developer datasets: https://www.inaturalist.org/pages/developers
- TensorFlow Lite Android guide: https://github.com/tensorflow/tensorflow/blob/master/tensorflow/lite/g3doc/android/index.md
- Kindwise FAQ: https://www.kindwise.com/faq
- Planta: https://getplanta.com/
- PlantIn: https://myplantin.com/app/disease-identification-app
- PictureThis: https://www.picturethisai.com/
