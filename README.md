# Sprout — Plant Care AI

An open-source, mobile-first plant-care interface prototype built with Next.js, React, and TypeScript.

## Current status

**This is an interactive prototype. It does not identify plants or diagnose disease.** Plans are explicitly labelled as peace-lily examples. Soil and light answers adjust sample care actions. Photos are previews only; no diagnostic scores or probabilities are generated.

Demo login, photo selection, context questions, saved plants, and persistent care checklists work. Each demo profile has a separate collection. PostgreSQL storage and WorkOS AuthKit integration are implemented with environment configuration; real WorkOS sign-in requires your credentials. Photos are not stored. Notifications, real AI analysis, and AR tracking remain future work. No inference provider is connected.

## Run locally

Use Node.js 20.9 or newer and npm.

```sh
git clone https://github.com/vkverse/plant-care-ai.git
cd plant-care-ai
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000), choose a demo profile, then select **Try with sample**. Demo login is development-only. See [Login and PostgreSQL setup](docs/AUTH-AND-DATABASE.md) to enable the database and real WorkOS accounts.

```sh
npm run lint
npm run build
npm start
```

## Research and roadmap

Read [the product analysis](docs/PRODUCT-ANALYSIS.md) for competitor research, dataset limitations, candidate APIs, and a proposed validation plan. These are research recommendations, not implemented integrations or verified product accuracy claims.

Planned work includes real species identification, evaluated health assessment, curated care guidance, and follow-up photos. The repository contains no third-party model weights or datasets.

Read [Architecture](docs/ARCHITECTURE.md) for the dependency boundaries, reusable components, provider interfaces, and browser storage adapter.

## Contributing

Issues and pull requests are welcome. Describe the problem and proposed behavior, keep changes focused, and run lint and build before opening a pull request. Never commit API keys or personal photos.

## License

[MIT](LICENSE). Third-party dependencies and any future datasets or models retain their own licenses.
