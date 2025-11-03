// src/api/authApi.ts

import axios from 'axios';

// --- Setup Axios instance ---
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-backend-api.com/api',
  withCredentials: true, // include cookies if backend uses them
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Types for Auth & User Data ---

export interface LoginPayload {
  emailOrUsername: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface UpdateProfilePayload {
  displayName?: string;
  avatarUrl?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

// --- API Calls ---

// 1. Login user
export const login = async (payload: LoginPayload): Promise<ApiResponse<any>> => {
  console.log('working');
  const response = await api.post('/auth/login', payload);
  return response.data;
};

// 2. Register new user
export const register = async (payload: RegisterPayload): Promise<ApiResponse<any>> => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

// 3. Logout user
export const logoutUser = async (): Promise<ApiResponse<any>> => {
  const response = await api.post('/auth/logout');
  return response.data;
};

// 4. Fetch logged-in user data
export const fetchUserData = async (): Promise<ApiResponse<any>> => {
  const response = await api.get('/user/me');
  return response.data;
};

// 5. Update user profile
export const updateProfile = async (payload: UpdateProfilePayload): Promise<ApiResponse<any>> => {
  const response = await api.put('/user/profile', payload);
  return response.data;
};

// 6. Refresh access token (if backend supports it)
export const refreshToken = async (): Promise<ApiResponse<{ token: string }>> => {
  const response = await api.post('/auth/refresh');
  return response.data;
};

// 7. Change password
export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<ApiResponse<any>> => {
  const response = await api.post('/user/change-password', { oldPassword, newPassword });
  return response.data;
};

// 8. Forgot password (request reset link)
export const forgotPassword = async (email: string): Promise<ApiResponse<any>> => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// 9. Reset password (using token)
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ApiResponse<any>> => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

// --- Optional Helper to Set Auth Header ---
export const setAuthToken = (token: string | null) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

export default api;
