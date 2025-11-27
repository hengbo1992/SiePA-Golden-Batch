import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, APP_NAME, APP_VERSION } from '../constants';
import { Boxes } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-700 bg-slate-950">
          <Boxes className="w-6 h-6 text-teal-400 mr-3" />
          <div>
            <h1 className="font-bold text-lg tracking-tight">{APP_NAME}</h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest">GOLDEN BATCH</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-md transition-all duration-200 group ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>System Online</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
          <p className="text-[10px] text-slate-600 mt-1 text-center">{APP_VERSION}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-xl font-semibold text-slate-800">
            {NAV_ITEMS.find(n => n.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs font-medium text-slate-600">
              User: Engineer_Admin
            </div>
            <div className="px-3 py-1 bg-teal-50 rounded-full border border-teal-100 text-xs font-medium text-teal-700">
              Plant: Shanghai-01
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;