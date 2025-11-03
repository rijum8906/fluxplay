// src/lib/validation/auth.ts
import { z } from 'zod';
import { detectEmailOrUsername } from '@/lib/api';

// Login schema
export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(3, 'Must be at least 3 characters long')
    .max(100, 'Too long')
    .refine(
      (value) =>
        detectEmailOrUsername(value) === 'email' || detectEmailOrUsername(value) === 'username',
      'Invalid email or username'
    ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Too long, relax your typing speed'),
});

// Register schema
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name too long'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name too long'),

  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username too long'),

  email: z.string().email('Invalid email format'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password too long'),
});

// Types for inference
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
