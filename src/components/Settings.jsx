import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon, Shield, Database, RefreshCw } from 'lucide-react';

export const Settings = () => {
  const { user, students, classes, materials } = useApp();

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all demo data to initial defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <SettingsIcon className="h-6 w-6 text-islamic-700" />
          <span>Academy Settings & Configuration</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">Manage platform preferences and demo configurations for Qari Asim Junaid Quran Academy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
            <Shield className="h-5 w-5 text-islamic-700" />
            <span>Academy Profile</span>
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs text-slate-500 uppercase block">Academy Name</span>
              <strong className="text-slate-900 text-base">Qari Asim Junaid Quran Academy</strong>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase block">Current Role</span>
              <span className="capitalize font-semibold text-islamic-700 bg-islamic-50 px-2.5 py-1 rounded border border-islamic-100 inline-block mt-1">
                {user.role} ({user.name})
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
            <Database className="h-5 w-5 text-islamic-700" />
            <span>System Storage & Demo Data</span>
          </h3>
          <p className="text-xs text-slate-600">
            The application currently runs with local storage persistence ({students.length} students, {classes.length} classes, {materials.length} study materials).
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetData}
              className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold px-4 py-2 rounded-lg transition inline-flex items-center space-x-2 border border-red-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset Demo Data to Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
