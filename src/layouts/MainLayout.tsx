import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
// You might also have a mobile-specific header
// import MobileHeader from '@/components/MobileHeader';

const AppLayout = () => {
  // --- 1. State now lives here, in the parent ---
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      {/* --- 2. Render the controlled Sidebar --- */}
      <Navbar />

      {/* You would add a mobile-only header here */}
      {/* <MobileHeader onMenuClick={() => setSidebarOpen(true)} /> */}

      {/* --- 3. Render the main content area --- */}
      <main
        className={`
          flex-1
          transition-all duration-300 ease-in-out
          
          /* * This is the magic:
           * On mobile (0px up), padding is 0.
           * On medium screens (md: 768px up), apply padding 
           * that matches the sidebar's width.
           * pl-20 = 80px (closed)
           * pl-60 = 240px (open)
          */
          pl-0 
          ${sidebarOpen ? 'md:pl-60' : 'md:pl-20'}
        `}
      >
        {/* Your top navbar for content could go here */}
        {/* <TopNavbar /> */}

        {/* --- 4. Render the active page --- */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
