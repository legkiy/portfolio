import { UserService } from '@/entities/User/model/service';
import { UserRole } from '@/entities/User/model/types';

async function seed() {
  const adminUser = {
    password: process.env.ADMIN_PASSWORD!,
    username: 'admin',
    role: UserRole.ADMIN,
  };

  await UserService.create(adminUser);
}

seed();
