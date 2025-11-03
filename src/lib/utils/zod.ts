// src/lib/utils/zod.ts
import { toast } from 'sonner';
import { ZodError } from 'zod';

/**
 * Converts a ZodError (or any unknown error) into a readable string,
 * and shows it in a toast notification.
 */
export const stringifyZodErrors = (error: unknown): string => {
  let message = 'Unexpected error. Try again.';

  if (error instanceof ZodError) {
    message = error.issues?.[0]?.message || 'Something went wrong with validation.';
  } else if (typeof error === 'string') {
    message = error;
  }

  toast.error(message);
  return message;
};
