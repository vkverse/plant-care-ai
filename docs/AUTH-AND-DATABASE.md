# Login and PostgreSQL

## Local demo

Run `npm run dev` and open `/login`. Choose Alex or Sam. Each profile has its own collection. Sign out from the account menu to switch profiles. Demo identities are deliberately selectable test profiles, not private accounts; demo login is disabled by `next start` in production.

Without DATABASE_URL, demo data lives in browser storage under a profile-specific key. The old anonymous v1 collection is preserved without assigning it to either user. Photos are never persisted.

## PostgreSQL

1. Start Docker Desktop, then run `docker compose up -d` in this project.
2. Add `DATABASE_URL=postgresql://sprout:sprout-local-only@localhost:5438/sprout` to `.env.local`.
3. Run `npm run db:migrate`, then restart the development server.

Compose uses a named volume and binds only localhost port 5438. Its password is for local development only. Remote databases should use their provider-issued connection string and verified TLS settings.

Both demo and real authentication can use PostgreSQL. The API derives ownership from the server session. Every query includes `user_id`; `(user_id, id)` is the compound primary key. Client user IDs are only checked for stale-tab detection, never accepted as identity. Invalid bodies, unauthenticated calls and foreign origins are rejected.

## Enable real WorkOS

Set AUTH_MODE=workos and configure WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_COOKIE_PASSWORD (random, at least 32 characters), NEXT_PUBLIC_WORKOS_REDIRECT_URI and DATABASE_URL in `.env.local` or your deployment's secret settings. See `.env.example`.

Register these in WorkOS dashboard Redirects:

- Callback: http://localhost:3000/callback
- Sign-in: http://localhost:3000/sign-in
- Logout: http://localhost:3000/login

Use the deployed HTTPS origin in production. AuthKit handles sign-in, callback, session refresh through Next.js proxy, and sign-out. The app gets the user on the server and sends only the display profile to client components. Real accounts require PostgreSQL and never fall back to browser demo storage. Missing WorkOS configuration does not enable demo login.

WorkOS accounts/credentials are not created by this repository. Complete dashboard configuration to test live sign-in. Reference: https://github.com/workos/authkit-nextjs
