import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Users, BookOpen, Calendar, FileText, Settings, Award } from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, user } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'classes', label: 'Classes / Courses', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'materials', label: 'Study Materials', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <aside className="hidden md:block w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 flex-shrink-0">
        <div className="mb-6 px-3 py-2 bg-islamic-50 rounded-lg border border-islamic-100">
          <p className="text-xs font-semibold text-islamic-800 uppercase tracking-wider">Portal Mode</p>
          <p className="text-sm font-bold text-islamic-900 capitalize flex items-center space-x-1 mt-0.5">
            <Award className="h-4 w-4 text-islamic-600 inline mr-1" />
            {user.role} View
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-islamic-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-islamic-100' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 shadow-lg">
        <div className="flex justify-around items-center h-16 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
                  isActive ? 'text-islamic-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-islamic-700' : 'text-slate-400'}`} />
                <span className="text-[10px] mt-1 truncate max-w-[60px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
