import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Students } from './components/Students';
import { Classes } from './components/Classes';
import { Attendance } from './components/Attendance';
import { StudyMaterials } from './components/StudyMaterials';
import { Settings } from './components/Settings';

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'students' && <Students />}
      {activeTab === 'classes' && <Classes />}
      {activeTab === 'attendance' && <Attendance />}
      {activeTab === 'materials' && <StudyMaterials />}
      {activeTab === 'settings' && <Settings />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}
