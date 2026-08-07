import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Plus, Trash2, X, ExternalLink } from 'lucide-react';

export const StudyMaterials = () => {
  const { materials, addMaterial, deleteMaterial, user } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    course: 'Quran with Tajweed',
    lesson: 'Lesson 1'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Please enter material title');
      return;
    }
    addMaterial(formData);
    setShowModal(false);
    setFormData({
      title: '',
      description: '',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      course: 'Quran with Tajweed',
      lesson: 'Lesson 1'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <FileText className="h-6 w-6 text-islamic-700" />
            <span>Study Materials & PDF Library</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Access and share Quranic guides, Tajweed rules, and lesson notes.</p>
        </div>
        {user.role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-islamic-700 hover:bg-islamic-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center space-x-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Study Material</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {materials.map((mat) => (
          <div key={mat.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-islamic-50 text-islamic-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-islamic-100">
                  {mat.course}
                </span>
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete material ${mat.title}?`)) {
                        deleteMaterial(mat.id);
                      }
                    }}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition"
                    title="Delete Material"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{mat.title}</h3>
              <p className="text-xs text-slate-600 mt-2">{mat.description}</p>
              <p className="text-xs text-islamic-700 font-medium mt-3">{mat.lesson}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <a
                href={mat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-islamic-700 hover:bg-islamic-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition inline-flex items-center space-x-1.5 shadow-sm"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open / Download PDF</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add Study Material</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">PDF Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  placeholder="e.g. Tajweed Rules Summary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  rows="2"
                  placeholder="Brief description of material..."
                />
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
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Lesson</label>
                  <input
                    type="text"
                    value={formData.lesson}
                    onChange={(e) => setFormData({ ...formData, lesson: e.target.value })}
                    className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                    placeholder="e.g. Lesson 1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">PDF / Link URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full text-sm border rounded-lg p-2.5 outline-none focus:border-islamic-600"
                  placeholder="https://..."
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
                  Upload Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
