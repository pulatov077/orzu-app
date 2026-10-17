import { ArrowRight, BookOpen } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockCourses } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface CoursesPageProps {
  navigate: (page: Page) => void;
}

export function CoursesPage({ navigate }: CoursesPageProps) {
  const { isDarkMode } = useDarkMode();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 dark:text-white mb-2">Your Courses</h1>
          <p className="text-gray-600 dark:text-gray-400">Continue learning and growing your skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    course.status === 'Active' 
                      ? isDarkMode ? 'bg-[#01de9d]/20 text-[#01de9d]' : 'bg-[#ae8c5e]/10 text-[#ae8c5e]'
                      : course.status === 'Near completion'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-gray-900 dark:text-white mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{course.instructor}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-sm text-gray-900 dark:text-white">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${course.progress}%`,
                        background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {course.lessonsCompleted} / {course.totalLessons} lessons completed
                  </p>
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => navigate({ type: 'course-detail', courseId: course.id })}
                  className="w-full text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NavigationBar navigate={navigate} currentPage="courses" />
    </div>
  );
}