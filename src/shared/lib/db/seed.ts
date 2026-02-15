import { UserService } from '@/entities/User/model/service';
import { UserRole } from '@/entities/User/model/types';

async function seed() {
  const adminUser = {
    password: process.env.ADMIN_PASSWORD!,
    username: 'admin',
    role: UserRole.ADMIN,
  };

  try {
    await UserService.create(adminUser);
    console.log('User was success created ✅');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
