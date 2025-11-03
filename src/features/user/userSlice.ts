// src/features/userSlice.ts

import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { login, fetchUserData as fetchUserDataApi, register } from '@/api/authApi';
import type { RootState } from '@/app/store';
import { detectEmailOrUsername } from '@/lib/api';
import { toast } from 'sonner';
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import { stringifyZodErrors } from '@/lib/utils/zod';

// --- 1. Define More Detailed Types ---

// Represents the user's account information
interface UserAccount {
  id: string;
  email: string;
}

// Represents user preferences
interface UserPreferences {
  videoQuality?: '360p' | '480p' | '720p' | '1080p';
}

// Represents user profile
interface UserProfile {
  displayName: string;
  avatarUrl: string;
  favorites?: string[];
  watchList?: string[];
}

// Represents the full state of this slice
interface UserState {
  account: UserAccount | null;
  profile: UserProfile | null;
  token: string | null;
  isLoggedIn: boolean;
  preferences: UserPreferences | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state
const initialState: UserState = {
  account: null,
  profile: null,
  token: null,
  isLoggedIn: false,
  preferences: null,
  status: 'idle',
  error: null,
};

// --- 2. Create Async Thunks for API Calls ---

/**
 * Async thunk for logging in a user.
 */
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { emailOrUsername: string; password: string }, { rejectWithValue }) => {
    try {
      console.log(credentials);
      const result = registerSchema.safeParse(credentials);

      if (!result.success) throw new Error(stringifyZodErrors(result.error));
      const { type, value } = detectEmailOrUsername(credentials.emailOrUsername);

      const payload =
        type === 'email'
          ? { email: value, password: credentials.password }
          : { username: value, password: credentials.password };

      const response = await login(payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Login failed');
    }
  }
);

/**
 * Async thunk for registering new user
 */
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (
    credentials: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const result = registerSchema.safeParse(credentials);
      if (!result.success) throw new Error(stringifyZodErrors(result.error));

      // FIX: Use the correct registration API function instead of login
      const response = await register(credentials); // This should be your registration API
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Registration failed');
    }
  }
);

/**
 * Async thunk for fetching user data if they have a valid token.
 */
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).user.token;
    if (!token) return rejectWithValue('No token found');

    try {
      const response = await fetchUserDataApi();
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Session expired. Please log in again.');
    }
  }
);

// --- 3. Create the Slice ---

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    /**
     * Logs out user by clearing all user state.
     */
    logout: (state) => {
      state.account = null;
      state.profile = null;
      state.isLoggedIn = false;
      state.token = null;
      state.preferences = null;
      state.status = 'idle';
      state.error = null;
    },

    /**
     * Adds a new favorite item to the user's list.
     */
    addFavorite: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.favorites = [...(state.profile.favorites || []), action.payload];
      }
    },

    /**
     * Removes a favorite item.
     */
    removeFavorite: (state, action: PayloadAction<string>) => {
      if (state.profile && state.profile.favorites) {
        state.profile.favorites = state.profile.favorites.filter((item) => item !== action.payload);
      }
    },

    /**
     * Clears current error.
     */
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // --- Login User ---
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.user;
        state.token = action.payload.token;
        state.account = {
          id: action.payload.user.id,
          email: action.payload.user.email,
        };
        state.isLoggedIn = true;
        toast.success('Login successful');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        toast.error(action.payload);
      })

      // --- Register User ---
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.user;
        state.token = action.payload.token;
        state.account = {
          id: action.payload.user.id,
          email: action.payload.user.email,
        };
        state.isLoggedIn = true;
        toast.success('Registration successful');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        toast.error(action.payload);
      })

      // --- Fetch User Data ---
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.profile;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isLoggedIn = false;
        state.token = null;
      });
  },
});

// --- 4. Export Actions and Reducer ---

export const { logout, addFavorite, removeFavorite, clearError } = userSlice.actions;

export default userSlice.reducer;

// --- 5. Selectors ---
export const selectUser = (state: RootState) => state.user;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserProfile = (state: RootState) => state.user.profile;
