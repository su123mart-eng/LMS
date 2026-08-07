import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, BookOpen, Calendar, FileText, ArrowRight } from 'lucide-react';
import { StudentPortal } from './StudentPortal';

export const Dashboard = () => {
  const { students, classes, materials, attendance, user, setActiveTab } = useApp();

  if (user.role === 'student') {
    return <StudentPortal />;
  }

  const todayStr = new Date().toISOString().split('T')[0];

  let totalMarkedToday = 0;
  let presentToday = 0;
  Object.keys(attendance).forEach(key => {
    if (key.endsWith(`_${todayStr}`)) {
      const records = attendance[key];
      Object.values(records).forEach(status => {
        totalMarkedToday++;
        if (status === 'Present') presentToday++;
      });
    }
  });

  const attendanceRate = totalMarkedToday > 0 ? Math.round((presentToday / totalMarkedToday) * 100) : 92;
  const recentStudents = [...students].reverse().slice(0, 4);

  return (
    <div className="space-y-6 pb-12 md:pb-6">
      <div className="bg-gradient-to-r from-islamic-900 to-islamic-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10">
          <div className="inline-block bg-islamic-700/80 text-islamic-100 text-xs px-3 py-1 rounded-full font-medium mb-3 border border-islamic-600">
            Bismillahir Rahmanir Rahim
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h2>
          <p className="text-islamic-200 text-sm mt-1 max-w-xl">
            Manage your Quran classes, student attendance, and Islamic study materials for Qari Asim Junaid Quran Academy seamlessly.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('attendance')}
              className="bg-white text-islamic-900 font-semibold px-4 py-2 rounded-lg text-xs hover:bg-islamic-50 transition shadow"
            >
              Mark Today's Attendance
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className="bg-islamic-700 hover:bg-islamic-600 text-white font-semibold px-4 py-2 rounded-lg text-xs transition border border-islamic-600"
            >
              View All Students
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Students</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{students.length}</h3>
            <p className="text-xs text-islamic-700 font-medium mt-1">Active enrollments</p>
          </div>
          <div className="bg-islamic-50 p-3.5 rounded-xl text-islamic-700 border border-islamic-100">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Classes</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{classes.length}</h3>
            <p className="text-xs text-blue-600 font-medium mt-1">Active Quran groups</p>
          </div>
          <div className="bg-blue-50 p-3.5 rounded-xl text-blue-600 border border-blue-100">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Today's Attendance</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{attendanceRate}%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">{presentToday} present today</p>
          </div>
          <div className="bg-emerald-50 p-3.5 rounded-xl text-emerald-600 border border-emerald-100">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Study Materials</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{materials.length}</h3>
            <p className="text-xs text-amber-600 font-medium mt-1">PDF guides & lessons</p>
          </div>
          <div className="bg-amber-50 p-3.5 rounded-xl text-amber-600 border border-amber-100">
            <FileText className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">Recent Students</h3>
            <button
              onClick={() => setActiveTab('students')}
              className="text-xs text-islamic-700 font-semibold hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentStudents.map((student) => (
              <div key={student.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-islamic-100 text-islamic-800 flex items-center justify-center font-bold text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{student.name}</h4>
                    <p className="text-xs text-slate-500">{student.course} • {student.phone}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">Active Quran Classes</h3>
            <button
              onClick={() => setActiveTab('classes')}
              className="text-xs text-islamic-700 font-semibold hover:underline"
            >
              Manage
            </button>
          </div>
          <div className="space-y-3">
            {classes.slice(0, 3).map((cls) => (
              <div key={cls.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-slate-900">{cls.name}</h4>
                  <span className="text-[10px] bg-islamic-100 text-islamic-800 px-2 py-0.5 rounded font-medium">{cls.teacher}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{cls.time} ({cls.days})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
