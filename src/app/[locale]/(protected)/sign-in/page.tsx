'use client';
import { useRouter } from '@/i18n/navigation';
import ROUTER_CONFIG from '@/shared/models/router';
import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const router = useRouter();
  async function handleCreate(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    try {
      await fetch('http://localhost:3300/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: pass,
        }),
      });
      router.push({
        pathname: ROUTER_CONFIG.admin.root,
      });
    } catch (error) {}
  }

  return (
    <form onSubmit={handleCreate}>
      <input
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="password"
        type="password"
        required
        onChange={(e) => setPass(e.target.value)}
      />
      <button type="submit">login</button>
    </form>
  );
};
export default LoginPage;
