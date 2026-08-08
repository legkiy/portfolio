import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth/minimal';
import { username } from 'better-auth/plugins';

import { db } from '@/shared/db';
import * as schema from '@/shared/db/schema';

const secret = process.env.BETTER_AUTH_SECRET;

if (!secret) {
  throw new Error('BETTER_AUTH_SECRET is not set.');
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    disableSignUp: true,
    enabled: true,
  },
  secret,
  user: {
    additionalFields: {
      role: {
        defaultValue: 'visitor',
        input: false,
        required: false,
        type: ['admin', 'visitor'],
      },
    },
  },
  plugins: [
    username({
      maxUsernameLength: 30,
      minUsernameLength: 3,
    }),
  ],
});

export const getAuthSession = (requestHeaders: Headers) =>
  auth.api.getSession({ headers: requestHeaders });
