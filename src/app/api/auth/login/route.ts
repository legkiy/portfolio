import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/shared/lib/auth';
import { UserService } from '@/entities/User/model/service';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await UserService.getByUsernameForAuth(username);

  if (!user) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 },
    );
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 },
    );
  }

  const token = await signToken({
    uuid: user.uuid,
    role: user.role,
  });

  const response = NextResponse.json({ status: 200 });

  response.cookies.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  return response;
}
