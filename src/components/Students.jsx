import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Plus, Search, Edit2, Trash2, Eye, X } from 'lucide-react';

export const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent, classes, getStudentAttendancePercentage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Quran with Tajweed',
    classId: classes[0]?.id || 'c1',
    status: 'Active',
    enrollmentDate: new Date().toISOString().split('T')[0]
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: 'Quran with Tajweed',
      classId: classes[0]?.id || 'c1',
      status: 'Active',
      enrollmentDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in required fields (Name, Email)');
      return;
    }
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
    setShowModal(false);
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Users className="h-6 w-6 text-islamic-700" />
            <span>Students Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Add, edit, view, and manage enrolled students at the academy.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-islamic-700 hover:bg-islamic-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center space-x-2 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Student</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-3">
        <Search className="h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by student name, email, or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm outline-none bg-transparent"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase border-b border-slate-200">
                <th className="p-4">Student Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Course</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    No students found matching your search.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const pct = getStudentAttendancePercentage(student.id, student.classId || 'c1');
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition">
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{student.name}</div>
                        <div className="text-xs text-slate-500">{student.email}</div>
                      </td>
                      <td className="p-4 text-xs text-slate-600">{student.phone}</td>
                      <td className="p-4">
                        <span className="bg-islamic-50 text-islamic-800 text-xs font-medium px-2.5 py-1 rounded-md border border-islamic-100">
                          {student.course}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-emerald-600 text-xs">{pct}%</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${student.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setViewingStudent(student)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${student.name}?`)) {
                              deleteStudent(student.id);
                            }
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingStudent ? 'Edit Student Details' : 'Add New Student'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  placeholder="e.g. Ahmad Khan"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                    placeholder="student@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Course</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600 bg-white"
                  >
                    <option value="Quran with Tajweed">Quran with Tajweed</option>
                    <option value="Noorani Qaida">Noorani Qaida</option>
                    <option value="Nazra Quran">Nazra Quran</option>
                    <option value="Hifz Quran">Hifz Quran</option>
                    <option value="Islamic Studies">Islamic Studies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Class</label>
                  <select
                    value={formData.classId}
                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                    className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600 bg-white"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Enrollment Date</label>
                  <input
                    type="date"
                    value={formData.enrollmentDate}
                    onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                    className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-islamic-700 text-white text-xs font-semibold rounded-lg hover:bg-islamic-800"
                >
                  {editingStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingStudent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Student Profile</h3>
              <button onClick={() => setViewingStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-islamic-50 p-4 rounded-xl border border-islamic-100 text-center">
                <div className="h-16 w-16 bg-islamic-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                  {viewingStudent.name.charAt(0)}
                </div>
                <h4 className="font-bold text-slate-900 text-lg">{viewingStudent.name}</h4>
                <p className="text-xs text-islamic-800 font-medium">{viewingStudent.course}</p>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-medium text-slate-900">{viewingStudent.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-medium text-slate-900">{viewingStudent.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-semibold text-emerald-600">{viewingStudent.status}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-slate-500">Enrollment Date:</span>
                  <span className="font-medium text-slate-900">{viewingStudent.enrollmentDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Attendance Percentage:</span>
                  <span className="font-bold text-islamic-700">
                    {getStudentAttendancePercentage(viewingStudent.id, viewingStudent.classId || 'c1')}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-3">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 bg-islamic-700 text-white text-xs font-semibold rounded-lg hover:bg-islamic-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
