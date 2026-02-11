import { pgTable, text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { UserRole } from './types';

export const userRoleEnum = pgEnum('user_role', [
  UserRole.ADMIN,
  UserRole.VISITOR,
]);

export const users = pgTable('users', {
  uuid: uuid('uuid').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: userRoleEnum('role').notNull().default(UserRole.VISITOR),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
