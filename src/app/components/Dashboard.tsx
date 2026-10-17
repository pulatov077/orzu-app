import { ArrowRight, BookOpen, CheckCircle2, Clock, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { MiniCalendar } from './MiniCalendar';
import { Page } from '../App';
import { todaysFocus, studentData, mentorMessage, mockAssignments, mockCourses } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface DashboardProps {
  navigate: (page: Page) => void;
}

export function Dashboard({ navigate }: DashboardProps) {
  const { isDarkMode } = useDarkMode();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';
  
  const upcomingDeadlines = mockAssignments
    .filter(a => a.status === 'Pending' || a.status === 'Urgent')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const activeCourses = mockCourses.filter(c => c.status === 'Active').slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content (70%) */}
          <div className="flex-1 space-y-6">
            {/* Daily Focus - Hero Block */}
            <div 
              className="rounded-2xl p-6 md:p-8 text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
              }}
            >
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                <div>
                  <p className="opacity-90 mb-1">Today's Focus</p>
                  <h2 className="text-white mb-2">{todaysFocus.course}</h2>
                  <h3 className="text-white">{todaysFocus.lesson}</h3>
                </div>
                <BookOpen className="w-12 h-12 opacity-70" />
              </div>
              
              <p className="opacity-90 mb-6">
                {todaysFocus.description}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm opacity-90">{todaysFocus.homework}</p>
                </div>
                
                <button 
                  onClick={() => navigate({ 
                    type: 'lesson', 
                    lessonId: todaysFocus.lessonId,
                    courseId: todaysFocus.courseId
                  })}
                  className="bg-white px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 shadow-md whitespace-nowrap"
                  style={{ color: primaryColor }}
                >
                  Continue Learning
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-2xl text-gray-900 dark:text-white mb-1">{studentData.weeklyProgress}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Progress</p>
              </div>

              <div 
                className="p-6 rounded-xl shadow-sm border"
                style={{
                  backgroundColor: isDarkMode ? '#1f2937' : 'white',
                  borderColor: isDarkMode ? '#374151' : '#f3f4f6'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="w-8 h-8" style={{ color: primaryColor }} />
                </div>
                <p className="text-2xl mb-1" style={{ color: isDarkMode ? 'white' : '#111827' }}>{studentData.completedLessons}</p>
                <p className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Completed Lessons</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-2xl text-gray-900 dark:text-white mb-1">{studentData.activeAssignments}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Assignments</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 text-2xl">🔥</div>
                </div>
                <p className="text-2xl text-gray-900 dark:text-white mb-1">{studentData.streak}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
              </div>
            </div>

            {/* Mentor Message */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-start gap-4">
                <img 
                  src={mentorMessage.avatar} 
                  alt={mentorMessage.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-gray-900 dark:text-white">{mentorMessage.name}</h3>
                    <span className="px-2 py-1 text-xs rounded-full" style={{ 
                      backgroundColor: isDarkMode ? `${primaryColor}20` : `${primaryColor}20`,
                      color: primaryColor
                    }}>
                      Your Mentor
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">"{mentorMessage.message}"</p>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h3>
              
              <div className="space-y-3">
                {upcomingDeadlines.map((assignment) => {
                  const daysLeft = Math.ceil(
                    (new Date(assignment.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <button
                      key={assignment.id}
                      onClick={() => navigate({ type: 'assignment', assignmentId: assignment.id })}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                      <div className="flex-1 text-left">
                        <p className="text-gray-900 dark:text-white">{assignment.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.course}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(assignment.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          assignment.status === 'Urgent' 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 dark:text-white">Continue Learning</h3>
                <button
                  onClick={() => navigate({ type: 'courses' })}
                  className="text-sm hover:opacity-80 transition"
                  style={{ color: primaryColor }}
                >
                  View All
                </button>
              </div>
              
              <div className="grid gap-4">
                {activeCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => navigate({ type: 'course-detail', courseId: course.id })}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-left"
                  >
                    <img 
                      src={course.thumbnail} 
                      alt={course.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white mb-1">{course.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.instructor}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${course.progress}%`,
                              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                            }}
                          />
                        </div>
                        <span className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>{course.progress}%</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Motivational Section */}
            <div 
              className="rounded-xl p-8 text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
              }}
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-white mb-3">Keep Up The Momentum! 🚀</h2>
                  <p className="opacity-90 mb-4">
                    You've maintained a {studentData.streak}-day streak and completed {studentData.completedLessons} lessons. 
                    Every step forward is progress toward your goals. Stay consistent and keep learning!
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                      <p className="text-sm opacity-90">Next milestone: 50 lessons</p>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                      <p className="text-sm opacity-90">{50 - studentData.completedLessons} lessons to go</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Learning Tips</h3>
              <div className="grid gap-3">
                {[
                  { icon: '📚', title: 'Review Regularly', text: 'Revisit concepts to strengthen your understanding' },
                  { icon: '💡', title: 'Practice Daily', text: 'Consistency builds lasting skills' },
                  { icon: '🎯', title: 'Set Goals', text: 'Break down large tasks into achievable steps' },
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h4 className="text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tip.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel (30%) - Calendar */}
          <div className="w-full lg:w-80">
            <MiniCalendar />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <NavigationBar navigate={navigate} currentPage="dashboard" />
    </div>
  );
}