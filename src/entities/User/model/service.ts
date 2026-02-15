import { db } from '@/shared/lib/db';
import { eq } from 'drizzle-orm';
import { users } from './schema';
import { UserRole } from './types';
import bcrypt from 'bcryptjs';

export class UserService {
  constructor() {}

  static async getById(uuid: string) {
    return db.query.users.findFirst({
      where: eq(users.uuid, uuid),
      columns: {
        password: false,
      },
    });
  }
  static async getByUsername(username: string) {
    return db.query.users.findFirst({
      where: eq(users.username, username),
      columns: {
        password: false,
      },
    });
  }

  static async getByUsernameForAuth(username: string) {
    return db.query.users.findFirst({
      where: eq(users.username, username),
    });
  }

  static async create(data: {
    username: string;
    password: string;
    role: UserRole;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, +process.env.SALT!);

    return db
      .insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();
  }
}
