export const initialStudents = [
  {
    id: 's1',
    name: 'Ahmad Khan',
    email: 'ahmad.khan@example.com',
    phone: '+92 300 1234567',
    course: 'Quran with Tajweed',
    classId: 'c1',
    status: 'Active',
    enrollmentDate: '2026-01-10'
  },
  {
    id: 's2',
    name: 'Abdullah',
    email: 'abdullah@example.com',
    phone: '+92 321 9876543',
    course: 'Noorani Qaida',
    classId: 'c2',
    status: 'Active',
    enrollmentDate: '2026-02-01'
  },
  {
    id: 's3',
    name: 'Muhammad Hamza',
    email: 'hamza@example.com',
    phone: '+92 333 4567890',
    course: 'Hifz Quran',
    classId: 'c3',
    status: 'Active',
    enrollmentDate: '2025-11-15'
  },
  {
    id: 's4',
    name: 'Abdul Rahman',
    email: 'rahman@example.com',
    phone: '+92 312 3456789',
    course: 'Nazra Quran',
    classId: 'c4',
    status: 'Active',
    enrollmentDate: '2026-01-20'
  }
];

export const initialClasses = [
  {
    id: 'c1',
    name: 'Quran with Tajweed - Group A',
    courseName: 'Quran with Tajweed',
    teacher: 'Qari Asim Junaid',
    time: '04:00 PM - 05:00 PKT',
    days: 'Mon, Wed, Fri'
  },
  {
    id: 'c2',
    name: 'Noorani Qaida - Beginners',
    courseName: 'Noorani Qaida',
    teacher: 'Qari Bilal',
    time: '03:00 PM - 04:00 PKT',
    days: 'Mon to Thu'
  },
  {
    id: 'c3',
    name: 'Hifz Quran - Advanced',
    courseName: 'Hifz Quran',
    teacher: 'Hafiz Usman',
    time: '07:00 AM - 09:00 PKT',
    days: 'Daily'
  },
  {
    id: 'c4',
    name: 'Nazra Quran - Intermediate',
    courseName: 'Nazra Quran',
    teacher: 'Qari Asim Junaid',
    time: '05:00 PM - 06:00 PKT',
    days: 'Tue, Thu, Sat'
  }
];

export const initialMaterials = [
  {
    id: 'm1',
    title: 'Tajweed Rules Summary (Qaidah Noorania Guide)',
    description: 'Complete PDF guide covering Makharij and Sifaat of Arabic letters.',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    course: 'Quran with Tajweed',
    lesson: 'Lesson 1: Introduction to Makharij'
  },
  {
    id: 'm2',
    title: 'Noorani Qaida Full Exercise Book',
    description: 'Essential practice sheets for beginners learning Arabic letters and harakaat.',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    course: 'Noorani Qaida',
    lesson: 'Lesson 3: Hurroof e Muqattaat & Harakaat'
  },
  {
    id: 'm3',
    title: 'Hifz Memorization Schedule & Tracking Sheet',
    description: 'Weekly Sabqi and Manzil targets for Hifz students.',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    course: 'Hifz Quran',
    lesson: 'Surah Al-Baqarah Review'
  }
];

const todayStr = new Date().toISOString().split('T')[0];

export const initialAttendance = {
  [`c1_${todayStr}`]: { 's1': 'Present' },
  [`c2_${todayStr}`]: { 's2': 'Present' },
  [`c3_${todayStr}`]: { 's3': 'Absent' },
  [`c4_${todayStr}`]: { 's4': 'Present' }
};
