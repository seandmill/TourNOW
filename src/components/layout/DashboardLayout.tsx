import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardNav } from '@/components/layout/DashboardNav';
import { UserProfile } from '@/components/user/UserProfile';
import { Menu } from 'lucide-react';

const defaultLogoUrl = './src/assets/images/logo_b.png';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50 md:flex">
      {/* 
        MOBILE TOP BAR
        Shows on screens < md (since our sidebar is "fixed" for md+ screens).
      */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 md:hidden">
        <div className="flex flex-col items-center">
          <img 
            src={defaultLogoUrl}
            alt={'TourNOW logo'}
            className="h-8 w-auto object-contain"
          />
          <h1 className="text-sm font-semibold mt-1">{'TourNOW'}</h1>
        </div>
        
        {/* HAMBURGER BUTTON (toggles sidebar) */}
        <button
          className="p-2 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* 
        OVERLAY (only on mobile)
        When sidebar is open, display a dark overlay behind it.
      */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white 
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        <div className="p-6 flex flex-col items-center text-center">
          <img 
            src={defaultLogoUrl}
            alt="TourNOW logo"
            className="h-16 w-auto object-contain"
          />
          <h1 className="text-xl font-semibold text-gray-900 mt-3">{'TourNOW'}</h1>
        </div>

        <DashboardNav />
        
        <div className="mt-auto p-4 border-t border-gray-200">
          <UserProfile />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          {/* 
            If you're using code-splitting, you could wrap your <Outlet> in a <Suspense> 
            with a fallback spinner like so:
          */}
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Outlet />
          {/* </Suspense> */}
        </div>
      </div>
    </div>
  );
}