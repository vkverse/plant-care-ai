# Architecture

Dependencies point inward: UI → application → domain. Infrastructure implements domain ports and is injected only at the composition root (`src/plant-care-app.tsx`).

- `app/`: Next.js routes, document metadata and global style entry.
- `src/domain/`: framework-independent types and contracts. No React or browser imports.
- `src/application/`: workflow hook; receives an assessment provider and repository. Owns transient preview URLs and stale-request protection.
- `src/infrastructure/`: sample assessment and browser storage adapters. Stored records are validated before use; read failures do not overwrite data.
- `src/features/`: scanner, care-plan and saved-plant screens. Receive typed props; no storage or provider access.
- `src/components/`: reusable presentation primitives and static product copy.

The only current provider is explicitly a sample provider. It does not inspect photos. Context adjusts example actions; no diagnostic scores are fabricated. Add real inference behind a server endpoint and a provider adapter, keeping credentials on the server.

Login provides either local demo profiles or WorkOS sessions. The asynchronous repository port supports profile-scoped demo browser storage and authenticated PostgreSQL API storage. The server derives query ownership from the session. Photos and notification schedules are not persisted. Reopening a saved plant rebuilds its sample plan from saved context. Storage errors are visible and writes fail without reporting success. See [Auth and database setup](AUTH-AND-DATABASE.md).

Keep new business rules pure and inside domain/application. Avoid introducing repositories inside components. Add adapters at the composition root and pass interfaces into application logic.
