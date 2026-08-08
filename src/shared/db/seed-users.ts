import { randomUUID } from 'node:crypto';

import { hashPassword } from 'better-auth/crypto';
import { eq } from 'drizzle-orm';

import { db } from '.';
import { account, user } from './schema';

const adminPassword = process.env.AUTH_ADMIN_PASSWORD;
const visitorPassword = process.env.AUTH_VISITOR_PASSWORD;

if (!adminPassword || !visitorPassword) {
  throw new Error(
    'AUTH_ADMIN_PASSWORD and AUTH_VISITOR_PASSWORD must be set before seeding.',
  );
}

const seedUsers = [
  {
    email: 'admin@portfolio.local',
    name: 'Administrator',
    password: adminPassword,
    role: 'admin' as const,
    username: 'admin',
  },
  {
    email: 'visitor@portfolio.local',
    name: 'Visitor',
    password: visitorPassword,
    role: 'visitor' as const,
    username: 'visitor',
  },
];

for (const seedUser of seedUsers) {
  const [existingUser] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.username, seedUser.username))
    .limit(1);

  if (existingUser) {
    continue;
  }

  const userId = randomUUID();

  await db.insert(user).values({
    email: seedUser.email,
    emailVerified: true,
    id: userId,
    name: seedUser.name,
    role: seedUser.role,
    username: seedUser.username,
  });

  await db.insert(account).values({
    accountId: userId,
    id: randomUUID(),
    password: await hashPassword(seedUser.password),
    providerId: 'credential',
    userId,
  });
}

console.log('Authentication users are ready.');
