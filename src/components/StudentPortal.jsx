import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, FileText, Award, CheckCircle } from 'lucide-react';

export const StudentPortal = () => {
  const { user, students, classes, materials, getStudentAttendancePercentage } = useApp();

  const currentStudent = students.find(s => s.email === user.email) || students[0];
  const enrolledClass = classes.find(c => c.courseName === currentStudent?.course) || classes[0];
  const attendancePct = getStudentAttendancePercentage(currentStudent?.id, enrolledClass?.id);
  const studentMaterials = materials.filter(m => m.course === currentStudent?.course || m.course === 'Quran with Tajweed');

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-islamic-900 to-islamic-800 text-white rounded-2xl p-6 shadow-md">
        <div className="inline-block bg-islamic-700 text-islamic-100 text-xs px-3 py-1 rounded-full font-medium mb-3 border border-islamic-600">
          Student Portal
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Assalamu Alaikum, {currentStudent?.name}!</h2>
        <p className="text-islamic-200 text-sm mt-1">
          Welcome to your personal learning dashboard at Qari Asim Junaid Quran Academy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Enrolled Course</p>
            <h3 className="text-lg font-bold text-islamic-900 mt-1">{currentStudent?.course}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{enrolledClass?.name}</p>
          </div>
          <div className="bg-islamic-50 p-3 rounded-xl text-islamic-700">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Attendance Rate</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{attendancePct}%</h3>
            <p className="text-xs text-slate-500 mt-0.5">Overall presence</p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Assigned Teacher</p>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{enrolledClass?.teacher}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{enrolledClass?.time}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
            <Award className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <FileText className="h-5 w-5 text-islamic-700" />
          <span>Available Study Materials & Lessons</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentMaterials.map((mat) => (
            <div key={mat.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-islamic-100 text-islamic-800 font-semibold px-2 py-0.5 rounded">
                  {mat.course}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-2">{mat.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{mat.description}</p>
                <p className="text-xs text-islamic-700 font-medium mt-2">{mat.lesson}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                <a
                  href={mat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-islamic-700 hover:bg-islamic-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition inline-flex items-center space-x-1"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Open PDF / Lesson</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
