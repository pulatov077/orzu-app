import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Clock } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockCourses, mockLessons } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface CourseDetailProps {
  navigate: (page: Page) => void;
  courseId: string;
}

export function CourseDetail({ navigate, courseId }: CourseDetailProps) {
  const { isDarkMode } = useDarkMode();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';
  
  const course = mockCourses.find(c => c.id === courseId);
  const lessons = mockLessons.filter(l => l.courseId === courseId);
  const nextLesson = lessons.find(l => l.status === 'In progress') || lessons.find(l => l.status === 'Not started');

  if (!course) {
    return <div>Course not found</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'In progress':
        return <Clock className="w-5 h-5" style={{ color: primaryColor }} />;
      default:
        return <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate({ type: 'courses' })}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>

        {/* Course Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-gray-900 dark:text-white mb-3">{course.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-600 dark:text-gray-400">{course.instructor}</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">Course Progress</span>
              <span className="text-gray-900 dark:text-white">{course.progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{ 
                  width: `${course.progress}%`,
                  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                }}
              />
            </div>
          </div>

          {/* Continue Button */}
          {nextLesson && (
            <button
              onClick={() => navigate({ 
                type: 'lesson', 
                lessonId: nextLesson.id,
                courseId: course.id
              })}
              className="text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
              style={{ backgroundColor: primaryColor }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
            >
              Continue Last Lesson
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Lessons List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-gray-900 dark:text-white">Lessons</h2>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => navigate({ 
                  type: 'lesson', 
                  lessonId: lesson.id,
                  courseId: course.id
                })}
                className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {getStatusIcon(lesson.status)}
                </div>

                {/* Lesson Number */}
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-700 dark:text-gray-300">{lesson.number}</span>
                </div>

                {/* Lesson Info */}
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 dark:text-white mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</p>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    lesson.status === 'Completed' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : lesson.status === 'In progress'
                      ? isDarkMode ? 'bg-[#01de9d]/20 text-[#01de9d]' : 'bg-[#ae8c5e]/10 text-[#ae8c5e]'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {lesson.status}
                  </span>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <NavigationBar navigate={navigate} currentPage="courses" />
    </div>
  );
}