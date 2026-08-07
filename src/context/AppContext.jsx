import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudents, initialClasses, initialMaterials, initialAttendance } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('quran_lms_user');
    return saved ? JSON.parse(saved) : { role: 'admin', name: 'Qari Asim Junaid', email: 'admin@quranacademy.com' };
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('quran_lms_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('quran_lms_classes');
    return saved ? JSON.parse(saved) : initialClasses;
  });

  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('quran_lms_materials');
    return saved ? JSON.parse(saved) : initialMaterials;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('quran_lms_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  useEffect(() => {
    localStorage.setItem('quran_lms_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('quran_lms_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('quran_lms_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('quran_lms_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('quran_lms_attendance', JSON.stringify(attendance));
  }, [attendance]);

  const addStudent = (student) => {
    const newStudent = { ...student, id: 's_' + Date.now() };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const addClass = (cls) => {
    const newClass = { ...cls, id: 'c_' + Date.now() };
    setClasses([...classes, newClass]);
  };

  const updateClass = (id, updatedData) => {
    setClasses(classes.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const addMaterial = (mat) => {
    const newMat = { ...mat, id: 'm_' + Date.now() };
    setMaterials([...materials, newMat]);
  };

  const deleteMaterial = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const markAttendance = (classId, date, studentId, status) => {
    const key = `${classId}_${date}`;
    setAttendance(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [studentId]: status
      }
    }));
  };

  const getStudentAttendancePercentage = (studentId, classId) => {
    let totalMarked = 0;
    let presentCount = 0;
    Object.keys(attendance).forEach(key => {
      if (key.startsWith(`${classId}_`)) {
        const record = attendance[key][studentId];
        if (record) {
          totalMarked++;
          if (record === 'Present') presentCount++;
        }
      }
    });
    if (totalMarked === 0) return 100;
    return Math.round((presentCount / totalMarked) * 100);
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      activeTab, setActiveTab,
      students, addStudent, updateStudent, deleteStudent,
      classes, addClass, updateClass, deleteClass,
      materials, addMaterial, deleteMaterial,
      attendance, markAttendance,
      getStudentAttendancePercentage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
