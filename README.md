# Sprout — Plant Care AI

An open-source, mobile-first plant-care interface prototype built with Next.js, React, and TypeScript.

## Current status

**This is an interactive UI prototype. It does not identify plants or diagnose disease.** Every photo returns the same sample peace-lily result. All scores, percentages, symptoms, and recommendations are illustrative, not computed from the image. Context answers change displayed text, not the underlying assessment.

Photo selection, context questions, and the in-memory care checklist work. Saving plants, reminders, the information menu, real AI analysis, and AR tracking are not implemented. Selected photos stay in the browser; no inference provider is connected.

## Run locally

Use Node.js 20.9 or newer and npm.

```sh
git clone https://github.com/vkverse/plant-care-ai.git
cd plant-care-ai
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Choose a photo or select **Try with sample**, answer the context questions, and explore the sample care checklist.

```sh
npm run lint
npm run build
npm start
```

## Research and roadmap

Read [the product analysis](docs/PRODUCT-ANALYSIS.md) for competitor research, dataset limitations, candidate APIs, and a proposed validation plan. These are research recommendations, not implemented integrations or verified product accuracy claims.

Planned work includes real species identification, evaluated health assessment, curated care guidance, saved plants, and follow-up photos. The repository contains no third-party model weights or datasets.

## Contributing

Issues and pull requests are welcome. Describe the problem and proposed behavior, keep changes focused, and run lint and build before opening a pull request. Never commit API keys or personal photos.

## License

[MIT](LICENSE). Third-party dependencies and any future datasets or models retain their own licenses.
