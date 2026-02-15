import { InferSelectModel } from 'drizzle-orm';
import { users } from './schema';

export const enum UserRole {
  ADMIN = 'ADMIN',
  VISITOR = 'VISITOR',
}

export type User = InferSelectModel<typeof users>;
