const AUTH_URL = 'https://functions.poehali.dev/adc17771-82a0-4b92-b4f0-ce1ff6c8276f';

export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function register(username: string, email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'register',
      username,
      email,
      password
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Registration failed');
  }

  return response.json();
}

export async function login(login: string, password: string): Promise<AuthResponse> {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'login',
      login,
      password
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  return response.json();
}

export function saveAuth(token: string, user: User) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function getAuth(): { token: string; user: User } | null {
  const token = localStorage.getItem('auth_token');
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) return null;
  
  return {
    token,
    user: JSON.parse(userStr)
  };
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
}
