// src/layouts/AuthLayout.tsx

import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
      <div className="w-full max-w-md p-6 bg-zinc-950/60 rounded-md backdrop-blur-sm border border-zinc-800">
        <Outlet />
      </div>
    </div>
  );
}
