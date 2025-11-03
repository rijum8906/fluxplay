// src/components/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/features/user/useUser';

interface Props {
  children: React.ReactElement;
}

export default function ProtectedRoute({ children }: Props) {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isLoggedIn) {
    // Save where they were going so you can redirect after login if you want
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
