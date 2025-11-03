import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '@/features/user/useUser';
import { motion } from 'framer-motion';
import {
  Menu,
  Home,
  Compass,
  Play,
  Clock,
  ThumbsUp,
  User,
  Settings,
  LogOut,
  Bell,
  Search as SearchIcon,
} from 'lucide-react';
import Logo from '@/assets/logo.svg';
import { navLinks } from '@/constants/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { appName } from '@/constants/app';

// --- NAVBAR ---
export function Navbar() {
  return (
    <header className="h-16 flex items-center gap-4 px-4 border-b border-zinc-800 bg-zinc-950 text-white fixed left-0 right-0 top-0 z-20">
      <div className="flex items-center gap-2 w-[240px] md:w-[260px]">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt={appName} className="w-8 h-8 rounded" />
          <span className="hidden md:inline text-lg font-semibold">{appName}</span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-auto px-2">
        <div className="relative">
          <Input placeholder="Search" className="pl-10 pr-28 h-10" />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
            <SearchIcon />
          </div>
          <Button className="absolute right-1 top-1/2 -translate-y-1/2" size="sm">
            Search
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// --- SIDEBAR ---
export function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const location = useLocation();
  const { isLoggedIn } = useUser();

  const links = navLinks.filter((link) => {
    if (isLoggedIn && link.authorizedOnly) return true;
    else if (!isLoggedIn && link.unAuthorizedOnly) return true;
    else if (!link.authorizedOnly && !link.unAuthorizedOnly) return true;
  });

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 220 }}
      className="bg-zinc-950 text-zinc-100 h-screen pt-20 border-r border-zinc-800 fixed left-0 top-0 bottom-0 z-10 hidden md:block"
    >
      <nav className="flex flex-col gap-1 p-3">
        {links.map((l) => (
          <Link
            to={l.path}
            key={l.label}
            className={`flex items-center p-2 rounded-lg hover:bg-zinc-900 transition-colors ${
              location.pathname === l.path ? 'bg-zinc-900' : ''
            } ${collapsed ? 'justify-center' : 'gap-4'}`}
          >
            <l.icon className="w-5 h-5 flex-shrink-0" />
            <motion.span
              initial={false}
              animate={{
                opacity: collapsed ? 0 : 1,
                width: collapsed ? 0 : 'auto',
              }}
              className="truncate hidden md:block overflow-hidden"
            >
              {l.label}
            </motion.span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-3 border-t border-zinc-800">
        <Link
          to="/settings"
          className={`flex items-center p-2 rounded-lg hover:bg-zinc-900 transition-colors ${
            collapsed ? 'justify-center' : 'gap-4'
          }`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <motion.span
            initial={false}
            animate={{
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : 'auto',
            }}
            className="hidden md:block overflow-hidden"
          >
            Settings
          </motion.span>
        </Link>
      </div>
    </motion.aside>
  );
}

// --- BOTTOM NAVIGATION (for mobile) ---
export function BottomNav() {
  const links = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Explore', icon: Compass, path: '/explore' },
    { label: 'Subs', icon: Play, path: '/subscriptions' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 text-zinc-100 flex justify-around py-2 md:hidden">
      {links.map((l) => (
        <Link
          key={l.label}
          to={l.path}
          className={`flex flex-col items-center text-xs ${
            location.pathname === l.path ? 'text-red-500' : 'opacity-80'
          }`}
        >
          <l.icon className="w-5 h-5" />
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

// --- LAYOUT ---
export default function YouTubeLayout({ children }: { children?: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-16">
        <Sidebar collapsed={collapsed} />
        <main className="flex-1 ml-0 md:ml-[220px] p-6 pb-20 md:pb-6">
          {children ?? <Outlet />}
        </main>
      </div>

      <BottomNav />

      <button
        onClick={() => setCollapsed((s) => !s)}
        className="hidden md:flex fixed bottom-6 right-6 bg-zinc-800 p-3 rounded-full shadow-lg"
        aria-label="Toggle sidebar"
      >
        <Menu />
      </button>
    </div>
  );
}
