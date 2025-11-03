import {
  Home,
  Compass,
  Clock,
  ThumbsUp,
  PlaySquare,
  Menu,
  User,
  Settings,
  LogOut,
  LogIn,
  type Icon,
} from 'lucide-react';

export interface NavLink {
  label: string;
  icon: Icon;
  authorizedOnly?: boolean;
  unAuthorizedOnly?: boolean;
  path?: string;
}

export const navLinks: NavLink[] = [
  {
    label: 'Home',
    icon: Home,
    path: '/',
  },
  {
    label: 'Explore',
    icon: Compass,
    path: '/explore',
  },
  {
    label: 'History',
    icon: Clock,
    authorizedOnly: true,
    path: '/history',
  },
  {
    label: 'Liked Videos',
    icon: ThumbsUp,
    authorizedOnly: true,
    path: '/liked',
  },
  {
    label: 'My Channel',
    icon: User,
    authorizedOnly: true,
    path: '/channel',
  },
  {
    label: 'Settings',
    icon: Settings,
    authorizedOnly: true,
    path: '/settings',
  },
  {
    label: 'Login',
    icon: LogIn,
    unAuthorizedOnly: true,
    path: '/login',
  },
  {
    label: 'Logout',
    icon: LogOut,
    authorizedOnly: true,
    path: '/logout',
  },
];
