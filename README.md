# Portfolio

Next.js portfolio with username/password authentication, roles, PostgreSQL and Drizzle.

## Local development

```bash
bun install
cp .env.example .env
docker compose up -d
bun run db:migrate
bun run db:seed
bun run dev
```

Before seeding, replace the values of `BETTER_AUTH_SECRET`,
`AUTH_ADMIN_PASSWORD`, and `AUTH_VISITOR_PASSWORD` in `.env`. Generate a
secret with `bunx auth secret`.

The app is available at [http://localhost:4000](http://localhost:4000), and
the login form is at [http://localhost:4000/login](http://localhost:4000/login).

## Authentication

- Sign-in uses a username and password.
- Public registration is disabled. `db:seed` creates exactly two accounts:
  `admin` with role `admin`, and `visitor` with role `visitor`.
- Passwords are read from environment variables and stored as Better Auth
  hashes. They are never committed to the repository.
- Better Auth manages server-side sessions. Its route handler is mounted at
  `/api/auth/[...all]`.

## Database commands

```bash
bun run db:generate # generate a Drizzle migration after schema changes
bun run db:migrate  # apply migrations
bun run db:seed     # create admin and visitor accounts
bun run db:studio   # open Drizzle Studio
```

For Vercel, use a managed PostgreSQL service such as Neon and set the same
environment variables in the project settings.
