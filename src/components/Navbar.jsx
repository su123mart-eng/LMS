import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, User, Shield, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, setUser, setActiveTab } = useApp();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRoleSwitch = (role, name, email) => {
    setUser({ role, name, email });
    setShowLoginModal(false);
  };

  return (
    <header className="bg-islamic-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-islamic-700 p-2 rounded-lg border border-islamic-600 shadow-inner">
              <BookOpen className="h-6 w-6 text-islamic-100" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                Qari Asim Junaid Quran Academy
              </h1>
              <p className="text-xs text-islamic-200 font-arabic tracking-wide">معهد القاري عاصم جنيد لتحفيظ القرآن الكريم</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-islamic-800 px-3 py-1.5 rounded-full border border-islamic-700">
              <Shield className="h-4 w-4 text-islamic-300" />
              <span className="text-xs font-medium capitalize text-islamic-100">
                {user.role}: <strong className="text-white">{user.name}</strong>
              </span>
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-xs bg-islamic-700 hover:bg-islamic-600 text-white px-3 py-1.5 rounded-md transition font-medium border border-islamic-600 flex items-center space-x-1"
            >
              <User className="h-3.5 w-3.5" />
              <span>Switch Role / Login</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-islamic-200 hover:text-white hover:bg-islamic-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-islamic-800 px-4 pt-2 pb-4 border-t border-islamic-700 space-y-3">
          <div className="flex items-center justify-between text-xs text-islamic-200 pt-1">
            <span>Logged in as: <strong className="text-white uppercase">{user.role} ({user.name})</strong></span>
          </div>
          <button
            onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }}
            className="w-full text-center py-2 bg-islamic-700 text-white rounded-md text-xs font-medium"
          >
            Switch Role / Login
          </button>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6 border border-islamic-100">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-lg font-bold text-islamic-900">Select Login Role</h3>
                <p className="text-xs text-slate-500">Quickly switch access permissions for demonstration.</p>
              </div>
              <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => handleRoleSwitch('admin', 'Qari Asim Junaid', 'admin@quranacademy.com')}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center space-x-4 ${user.role === 'admin' ? 'border-islamic-600 bg-islamic-50 shadow-sm' : 'border-slate-200 hover:border-islamic-300'}`}
              >
                <div className="bg-islamic-700 text-white p-3 rounded-lg"><Shield className="h-5 w-5" /></div>
                <div>
                  <h4 className="font-semibold text-islamic-900">Administrator</h4>
                  <p className="text-xs text-slate-600">Full access to manage students, classes, attendance, and study materials.</p>
                </div>
              </div>

              <div
                onClick={() => handleRoleSwitch('teacher', 'Qari Bilal', 'teacher@quranacademy.com')}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center space-x-4 ${user.role === 'teacher' ? 'border-islamic-600 bg-islamic-50 shadow-sm' : 'border-slate-200 hover:border-islamic-300'}`}
              >
                <div className="bg-blue-600 text-white p-3 rounded-lg"><BookOpen className="h-5 w-5" /></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Teacher (Qari Bilal)</h4>
                  <p className="text-xs text-slate-600">Manage attendance and view assigned classes and students.</p>
                </div>
              </div>

              <div
                onClick={() => handleRoleSwitch('student', 'Ahmad Khan', 'ahmad.khan@example.com')}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center space-x-4 ${user.role === 'student' ? 'border-islamic-600 bg-islamic-50 shadow-sm' : 'border-slate-200 hover:border-islamic-300'}`}
              >
                <div className="bg-amber-600 text-white p-3 rounded-lg"><User className="h-5 w-5" /></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Student (Ahmad Khan)</h4>
                  <p className="text-xs text-slate-600">View personal dashboard, attendance percentage, and lessons.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
