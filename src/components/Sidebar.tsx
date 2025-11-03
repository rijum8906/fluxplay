import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { useUser } from '@/features/user/useUser';

function Sidebar() {
  const { isLoggedIn, profile, logout } = useUser();
  const location = useLocation();

  return <>{/* Side Navigation For Dectop*/}</>;
}

export default Sidebar;
