export interface Course {
  id: string;
  name: string;
  instructor: string;
  description: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  status: 'Active' | 'Near completion' | 'Paused';
  thumbnail: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  number: number;
  title: string;
  duration: string;
  status: 'Not started' | 'In progress' | 'Completed';
  videoUrl?: string;
  description?: string;
  keyPoints?: string[];
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  courseId: string;
  deadline: string;
  status: 'Pending' | 'Urgent' | 'Submitted' | 'Under review' | 'Approved' | 'Rejected';
  description?: string;
  mentorFeedback?: string;
  mentorRating?: number;
  mentorName?: string;
  mentorAvatar?: string;
  submissionText?: string;
}

export interface Notification {
  id: string;
  type: 'deadline' | 'feedback' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Certificate {
  id: string;
  courseName: string;
  completionDate: string;
  instructor: string;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'IELTS Writing Mastery - DREAM Project',
    instructor: 'Dr. Emily Carter',
    description: 'Master IELTS Writing Task 1 & 2 through the DREAM methodology',
    progress: 65,
    lessonsCompleted: 13,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400'
  },
  {
    id: '2',
    name: 'IELTS Speaking Excellence',
    instructor: 'James Robertson',
    description: 'Achieve Band 7+ in IELTS Speaking with proven strategies',
    progress: 40,
    lessonsCompleted: 8,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400'
  },
  {
    id: '3',
    name: 'SAT Math Intensive - DREAM Project',
    instructor: 'Prof. Michael Zhang',
    description: 'Complete SAT Math preparation with advanced problem-solving',
    progress: 15,
    lessonsCompleted: 3,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400'
  },
  {
    id: '4',
    name: 'IELTS Reading Strategies',
    instructor: 'Sarah Williams',
    description: 'Master all IELTS Reading question types and time management',
    progress: 88,
    lessonsCompleted: 22,
    totalLessons: 25,
    status: 'Near completion',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
  },
  {
    id: '5',
    name: 'SAT Evidence-Based Reading',
    instructor: 'Dr. Rachel Adams',
    description: 'Excel in SAT Reading and Writing sections with DREAM techniques',
    progress: 30,
    lessonsCompleted: 6,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
  },
  {
    id: '6',
    name: 'IELTS Listening Mastery',
    instructor: 'David Lee',
    description: 'Improve IELTS Listening scores with targeted practice',
    progress: 50,
    lessonsCompleted: 10,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400'
  },
  {
    id: '7',
    name: 'SAT Essay Writing - DREAM Project',
    instructor: 'Dr. Maria Santos',
    description: 'Write high-scoring SAT essays with analysis and evidence',
    progress: 75,
    lessonsCompleted: 15,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400'
  },
  {
    id: '8',
    name: 'IELTS Academic Vocabulary',
    instructor: 'Prof. Robert Taylor',
    description: 'Build essential academic vocabulary for IELTS success',
    progress: 20,
    lessonsCompleted: 4,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'
  },
  {
    id: '9',
    name: 'SAT Test-Taking Strategies',
    instructor: 'Dr. Amanda Brown',
    description: 'Master time management and strategic approaches for SAT',
    progress: 10,
    lessonsCompleted: 2,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
  },
  {
    id: '10',
    name: 'DREAM Project: Full Preparation',
    instructor: 'Dr. Alex Morgan',
    description: 'Complete IELTS & SAT preparation through integrated DREAM methodology',
    progress: 5,
    lessonsCompleted: 1,
    totalLessons: 20,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
  }
];

export const mockLessons: Lesson[] = [
  {
    id: '1',
    courseId: '1',
    number: 1,
    title: 'IELTS Writing Task 1 - Overview',
    duration: '45 min',
    status: 'Completed',
    description: 'Learn how to write effective overviews for Task 1 graphs and charts',
    keyPoints: ['Identifying key trends', 'Writing clear overviews', 'Academic language patterns']
  },
  {
    id: '2',
    courseId: '1',
    number: 2,
    title: 'Task 2 Essay Structure - DREAM Method',
    duration: '60 min',
    status: 'Completed',
    description: 'Master the DREAM methodology for organizing Task 2 essays',
    keyPoints: ['Introduction techniques', 'Body paragraph structure', 'Conclusion strategies']
  },
  {
    id: '3',
    courseId: '1',
    number: 3,
    title: 'Advanced Vocabulary for Writing',
    duration: '90 min',
    status: 'In progress',
    description: 'Build topic-specific vocabulary for high-scoring essays',
    keyPoints: ['Academic word lists', 'Collocations', 'Paraphrasing techniques']
  },
  {
    id: '4',
    courseId: '1',
    number: 4,
    title: 'Grammar for Band 7+',
    duration: '75 min',
    status: 'Not started',
    description: 'Master complex sentence structures for IELTS Writing',
    keyPoints: ['Conditional sentences', 'Relative clauses', 'Passive voice usage']
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'IELTS Writing Task 2 Practice Essay',
    course: 'IELTS Writing Mastery - DREAM Project',
    courseId: '1',
    deadline: '2026-03-25',
    status: 'Pending',
    description: 'Write a complete Task 2 essay on education using DREAM methodology'
  },
  {
    id: '2',
    title: 'IELTS Speaking Part 2 Recording',
    course: 'IELTS Speaking Excellence',
    courseId: '2',
    deadline: '2026-03-24',
    status: 'Urgent',
    description: 'Record a 2-minute response about a memorable journey'
  },
  {
    id: '3',
    title: 'SAT Math Practice Set - Algebra',
    course: 'SAT Math Intensive - DREAM Project',
    courseId: '3',
    deadline: '2026-03-28',
    status: 'Submitted',
    description: 'Complete 20 algebra problems from the official SAT practice test',
    submissionText: 'Completed all 20 problems with detailed explanations. Score: 18/20'
  },
  {
    id: '4',
    title: 'IELTS Reading Practice Test',
    course: 'IELTS Reading Strategies',
    courseId: '4',
    deadline: '2026-03-15',
    status: 'Approved',
    description: 'Complete a full IELTS Academic Reading test under timed conditions',
    mentorFeedback: 'Excellent work! Your time management has improved significantly. You correctly answered 36/40 questions. Focus on True/False/Not Given questions for even better results.',
    mentorRating: 5,
    mentorName: 'Sarah Williams',
    mentorAvatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: '5',
    title: 'SAT Reading Comprehension Analysis',
    course: 'SAT Evidence-Based Reading',
    courseId: '5',
    deadline: '2026-03-30',
    status: 'Pending',
    description: 'Analyze three SAT reading passages and identify evidence-based answers'
  },
  {
    id: '6',
    title: 'IELTS Listening Section Practice',
    course: 'IELTS Listening Mastery',
    courseId: '6',
    deadline: '2026-03-29',
    status: 'Pending',
    description: 'Complete IELTS Listening Sections 3 and 4 with note-taking'
  },
  {
    id: '7',
    title: 'SAT Essay Analysis Assignment',
    course: 'SAT Essay Writing - DREAM Project',
    courseId: '7',
    deadline: '2026-03-26',
    status: 'Under review',
    description: 'Write an analytical essay using the DREAM framework'
  },
  {
    id: '8',
    title: 'IELTS Vocabulary Building Exercise',
    course: 'IELTS Writing Mastery - DREAM Project',
    courseId: '1',
    deadline: '2026-03-27',
    status: 'Pending',
    description: 'Create flashcards for 50 academic words with example sentences'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Assignment Due Soon',
    message: 'IELTS Speaking Part 2 Recording is due tomorrow',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'feedback',
    title: 'Mentor Feedback Received',
    message: 'Sarah Williams reviewed your IELTS Reading Practice Test',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'system',
    title: 'New DREAM Module Available',
    message: 'Advanced SAT Grammar module is now available',
    time: '1 day ago',
    read: true
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseName: 'IELTS Foundation Course',
    completionDate: '2026-01-15',
    instructor: 'Dr. Emily Carter'
  },
  {
    id: '2',
    courseName: 'SAT Vocabulary Mastery',
    completionDate: '2025-12-20',
    instructor: 'Prof. Robert Taylor'
  }
];

export const studentData = {
  name: 'Alex Morgan',
  avatar: 'https://i.pravatar.cc/150?img=12',
  streak: 12,
  weeklyProgress: 68,
  completedLessons: 47,
  activeAssignments: 3
};

export const todaysFocus = {
  course: 'IELTS Writing Mastery - DREAM Project',
  lesson: 'Advanced Vocabulary for Writing',
  lessonId: '3',
  courseId: '1',
  description: 'Build topic-specific vocabulary for high-scoring essays with the DREAM method',
  homework: 'Assignment due: IELTS Writing Task 2 Practice Essay (4 days left)'
};

export const mentorMessage = {
  name: 'Dr. Emily Carter',
  avatar: 'https://i.pravatar.cc/150?img=9',
  message: "Excellent progress on your IELTS writing! Your use of the DREAM methodology is improving. Keep practicing daily for best results."
};

export const weeklyActivity = [
  { id: 'mon', day: 'Mon', lessons: 3, hours: 2.5 },
  { id: 'tue', day: 'Tue', lessons: 2, hours: 1.5 },
  { id: 'wed', day: 'Wed', lessons: 4, hours: 3 },
  { id: 'thu', day: 'Thu', lessons: 1, hours: 1 },
  { id: 'fri', day: 'Fri', lessons: 3, hours: 2 },
  { id: 'sat', day: 'Sat', lessons: 2, hours: 1.5 },
  { id: 'sun', day: 'Sun', lessons: 1, hours: 0.5 }
];

export const streakData = [
  { id: 'dec16', day: 'Dec 16', active: true },
  { id: 'dec17', day: 'Dec 17', active: true },
  { id: 'dec18', day: 'Dec 18', active: true },
  { id: 'dec19', day: 'Dec 19', active: true },
  { id: 'dec20', day: 'Dec 20', active: true },
  { id: 'dec21', day: 'Dec 21', active: true },
  { id: 'dec22', day: 'Dec 22', active: true },
  { id: 'dec23', day: 'Dec 23', active: true },
  { id: 'dec24', day: 'Dec 24', active: true },
  { id: 'dec25', day: 'Dec 25', active: true },
  { id: 'dec26', day: 'Dec 26', active: true },
  { id: 'dec27', day: 'Dec 27', active: true },
];

export const calendarEvents = [
  { date: '2026-03-24', title: 'IELTS Speaking Part 2 Recording', type: 'assignment' as const },
  { date: '2026-03-25', title: 'IELTS Writing Task 2 Practice Essay', type: 'assignment' as const },
  { date: '2026-03-26', title: 'SAT Essay Analysis Assignment', type: 'assignment' as const },
  { date: '2026-03-27', title: 'IELTS Vocabulary Building Exercise', type: 'assignment' as const },
  { date: '2026-03-28', title: 'SAT Math Practice Set - Algebra', type: 'assignment' as const },
  { date: '2026-03-29', title: 'IELTS Listening Section Practice', type: 'assignment' as const },
  { date: '2026-03-30', title: 'SAT Reading Comprehension Analysis', type: 'assignment' as const },
];