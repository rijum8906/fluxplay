import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  selectUser,
  selectIsLoggedIn,
  selectUserProfile,
  logout,
  addFavorite,
  removeFavorite,
  clearError,
  loginUser,
  registerUser,
  fetchUserData,
} from '@/features/user/userSlice';
import type { AppDispatch } from '@/app/store';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const profile = useSelector(selectUserProfile);

  // actions
  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const handleAddFavorite = useCallback((id: string) => dispatch(addFavorite(id)), [dispatch]);
  const handleRemoveFavorite = useCallback(
    (id: string) => dispatch(removeFavorite(id)),
    [dispatch]
  );
  const handleClearError = useCallback(() => dispatch(clearError()), [dispatch]);
  const handleLogin = useCallback(
    (credentials: { emailOrUsername: string; password: string }) =>
      dispatch(loginUser(credentials)),
    [dispatch]
  );
  const handleRegister = useCallback(
    (payload: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
    }) => {
      dispatch(registerUser(payload));
    },
    [dispatch]
  );
  const handleFetchUser = useCallback(() => dispatch(fetchUserData()), [dispatch]);

  return {
    user,
    isLoggedIn,
    profile,
    status: user.status,
    error: user.error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    addFavorite: handleAddFavorite,
    removeFavorite: handleRemoveFavorite,
    clearError: handleClearError,
    fetchUser: handleFetchUser,
  };
};
