// src/lib/api.ts

export function detectEmailOrUsername(emailOrUsername: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailOrUsername.trim())) {
    return { type: 'email', value: emailOrUsername.trim() };
  } else {
    return { type: 'username', value: emailOrUsername.trim() };
  }
}
