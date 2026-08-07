import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar } from 'lucide-react';

export const Attendance = () => {
  const { classes, students, attendance, markAttendance, getStudentAttendancePercentage } = useApp();

  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || 'c1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const classStudents = students.filter(s => s.classId === selectedClassId || !s.classId);
  const attendanceKey = `${selectedClassId}_${selectedDate}`;
  const currentAttendanceRecords = attendance[attendanceKey] || {};

  const handleStatusChange = (studentId, status) => {
    markAttendance(selectedClassId, selectedDate, studentId, status);
  };

  const handleMarkAllPresent = () => {
    classStudents.forEach(s => {
      markAttendance(selectedClassId, selectedDate, s.id, 'Present');
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-islamic-700" />
          <span>Attendance Management</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">Select class and date to mark and review daily student attendance.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600 bg-white font-medium"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.teacher})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Students List for Attendance</h3>
            <p className="text-xs text-slate-500">Date: {selectedDate}</p>
          </div>
          <button
            onClick={handleMarkAllPresent}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Mark All Present
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-600 text-xs font-semibold uppercase border-b border-slate-200">
                <th className="p-4">Student Name</th>
                <th className="p-4">Course</th>
                <th className="p-4">Overall Percentage</th>
                <th className="p-4 text-center">Status for {selectedDate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    No students assigned to this class.
                  </td>
                </tr>
              ) : (
                classStudents.map((student) => {
                  const status = currentAttendanceRecords[student.id] || 'Present';
                  const pct = getStudentAttendancePercentage(student.id, selectedClassId);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition">
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{student.name}</div>
                        <div className="text-xs text-slate-500">{student.email}</div>
                      </td>
                      <td className="p-4 text-xs text-slate-600">{student.course}</td>
                      <td className="p-4 font-bold text-emerald-600">{pct}%</td>
                      <td className="p-4 text-center">
                        <div className="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200 space-x-1">
                          <button
                            onClick={() => handleStatusChange(student.id, 'Present')}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${status === 'Present' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'Absent')}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${status === 'Absent' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            Absent
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'Leave')}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${status === 'Leave' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            Leave
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
