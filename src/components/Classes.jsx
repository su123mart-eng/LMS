import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Plus, Edit2, Trash2, X, Clock, User, Calendar } from 'lucide-react';

export const Classes = () => {
  const { classes, addClass, updateClass, deleteClass } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    courseName: 'Quran with Tajweed',
    teacher: 'Qari Asim Junaid',
    time: '04:00 PM - 05:00 PKT',
    days: 'Mon, Wed, Fri'
  });

  const handleOpenAdd = () => {
    setEditingClass(null);
    setFormData({
      name: '',
      courseName: 'Quran with Tajweed',
      teacher: 'Qari Asim Junaid',
      time: '04:00 PM - 05:00 PKT',
      days: 'Mon, Wed, Fri'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (cls) => {
    setEditingClass(cls);
    setFormData(cls);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please enter class name');
      return;
    }
    if (editingClass) {
      updateClass(editingClass.id, formData);
    } else {
      addClass(formData);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-islamic-700" />
            <span>Classes & Courses Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Create and manage Quran groups, set timings, and assign academy teachers.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-islamic-700 hover:bg-islamic-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center space-x-2 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Class</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-islamic-50 text-islamic-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-islamic-100">
                  {cls.courseName}
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleOpenEdit(cls)}
                    className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition"
                    title="Edit Class"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete class ${cls.name}?`)) {
                        deleteClass(cls.id);
                      }
                    }}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition"
                    title="Delete Class"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{cls.name}</h3>
              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-islamic-700" />
                  <span>Teacher: <strong className="text-slate-900">{cls.teacher}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Timing: <strong className="text-slate-900">{cls.time}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span>Days: <strong className="text-slate-900">{cls.days}</strong></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingClass ? 'Edit Class Details' : 'Add New Class'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Class Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  placeholder="e.g. Quran with Tajweed - Group A"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Course Name</label>
                <select
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
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
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Assigned Teacher</label>
                <input
                  type="text"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  placeholder="e.g. Qari Asim Junaid"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Class Time</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  placeholder="e.g. 04:00 PM - 05:00 PKT"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Days</label>
                <input
                  type="text"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                  className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  placeholder="e.g. Mon, Wed, Fri"
                />
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
                  {editingClass ? 'Save Changes' : 'Add Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
