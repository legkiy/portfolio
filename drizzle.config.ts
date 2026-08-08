import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/shared/db/schema.ts',
  strict: true,
});
