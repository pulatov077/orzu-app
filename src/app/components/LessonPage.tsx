import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, FileText, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockLessons, mockCourses } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface LessonPageProps {
  navigate: (page: Page) => void;
  lessonId: string;
  courseId: string;
}

export function LessonPage({ navigate, lessonId, courseId }: LessonPageProps) {
  const { isDarkMode } = useDarkMode();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';
  
  const lesson = mockLessons.find(l => l.id === lessonId);
  const course = mockCourses.find(c => c.id === courseId);
  const [checklist, setChecklist] = useState({
    video: false,
    material: false,
    practice: false
  });

  if (!lesson || !course) {
    return <div>Lesson not found</div>;
  }

  const toggleChecklistItem = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const allCompleted = Object.values(checklist).every(v => v);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <button 
            onClick={() => navigate({ type: 'courses' })}
            className="hover:text-gray-900 dark:hover:text-white transition"
          >
            Courses
          </button>
          <ChevronRight className="w-4 h-4" />
          <button 
            onClick={() => navigate({ type: 'course-detail', courseId })}
            className="hover:text-gray-900 dark:hover:text-white transition"
          >
            {course.name}
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">{lesson.title}</span>
        </div>

        <div className="flex gap-6">
          {/* Main Content (70%) */}
          <div className="flex-1 space-y-6">
            {/* Lesson Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span 
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(1,222,157,0.2)' : 'rgba(174,140,94,0.1)',
                        color: primaryColor
                      }}
                    >
                      Lesson {lesson.number}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</span>
                  </div>
                  <h1 className="text-gray-900 dark:text-white">{lesson.title}</h1>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                <PlayCircle className="w-20 h-20 text-white opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white">Video: {lesson.title}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-gray-900 dark:text-white mb-4">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{lesson.description}</p>

              {/* Key Points */}
              {lesson.keyPoints && (
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {lesson.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel (30%) */}
          <div className="w-80 space-y-6">
            {/* Task Checklist */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <h3 className="text-gray-900 dark:text-white mb-4">Tasks</h3>
              
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => toggleChecklistItem('video')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    checklist.video 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {checklist.video && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <PlayCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <span className={`flex-1 text-left ${
                    checklist.video ? 'line-through text-gray-500 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Watch video
                  </span>
                </button>

                <button
                  onClick={() => toggleChecklistItem('material')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    checklist.material 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {checklist.material && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <FileText className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <span className={`flex-1 text-left ${
                    checklist.material ? 'line-through text-gray-500 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Read material
                  </span>
                </button>

                <button
                  onClick={() => toggleChecklistItem('practice')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    checklist.practice 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {checklist.practice && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <span className={`flex-1 text-left ${
                    checklist.practice ? 'line-through text-gray-500 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Practice task
                  </span>
                </button>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  disabled={!allCompleted}
                  className={`w-full py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                    allCompleted
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Mark as Completed
                </button>

                <button
                  onClick={() => navigate({ type: 'assignment', assignmentId: '1' })}
                  className="w-full text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                >
                  Go to Assignment
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate({ type: 'course-detail', courseId })}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationBar navigate={navigate} currentPage="courses" />
    </div>
  );
}