import { db } from '@/shared/lib/db';
import { eq } from 'drizzle-orm';
import { users } from './schema';
import { UserRole } from './types';
import bcrypt from 'bcryptjs';

export class UserService {
  constructor() {}

  async getById(uuid: string) {
    return db.query.users.findFirst({
      where: eq(users.uuid, uuid),
    });
  }
  async getByUsername(username: string) {
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
