import { Check, BookOpen, TrendingUp } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockCourses, weeklyActivity, studentData, streakData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDarkMode } from '../context/DarkModeContext';

interface ProgressPageProps {
  navigate: (page: Page) => void;
}

export function ProgressPage({ navigate }: ProgressPageProps) {
  const { isDarkMode } = useDarkMode();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';
  
  const overallProgress = Math.round(
    mockCourses.reduce((sum, course) => sum + course.progress, 0) / mockCourses.length
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 dark:text-white mb-2">Your Progress</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your learning journey</p>
        </div>

        {/* Overall Progress */}
        <div 
          className="rounded-xl p-8 text-white mb-6 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="opacity-90 mb-1">Overall Progress</p>
              <h2 className="text-white">{overallProgress}%</h2>
            </div>
            <TrendingUp className="w-12 h-12 opacity-70" />
          </div>
          
          <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div>
              <p className="opacity-90 text-sm mb-1">Completed Lessons</p>
              <p className="text-2xl text-white">{studentData.completedLessons}</p>
            </div>
            <div>
              <p className="opacity-90 text-sm mb-1">Current Streak</p>
              <p className="text-2xl text-white">{studentData.streak} days</p>
            </div>
            <div>
              <p className="opacity-90 text-sm mb-1">Weekly Progress</p>
              <p className="text-2xl text-white">{studentData.weeklyProgress}%</p>
            </div>
          </div>
        </div>

        {/* Streak Visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 dark:text-white mb-1">Learning Streak</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{studentData.streak} days in a row! Keep going! 🔥</p>
            </div>
            <div className="text-right">
              <p className="text-3xl" style={{ color: primaryColor }}>{studentData.streak}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {streakData.map((day) => (
              <div key={day.id} className="flex flex-col items-center min-w-[60px]">
                <div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 transition ${
                    day.active
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 border-2'
                      : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
                  }`}
                  style={day.active ? { borderColor: '#fbbf24' } : {}}
                >
                  {day.active ? (
                    <Check className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{day.day.split(' ')[1]}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{day.day.split(' ')[0]}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg" style={{ 
            backgroundColor: isDarkMode ? 'rgba(251, 191, 36, 0.1)' : '#fef3c7'
          }}>
            <p className="text-sm" style={{ color: isDarkMode ? '#fbbf24' : '#92400e' }}>
              💪 You're on fire! Maintain your streak to build lasting learning habits.
            </p>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-gray-900 dark:text-white mb-6">Course Progress</h2>
          
          <div className="space-y-4">
            {mockCourses.map((course) => (
              <button
                key={course.id}
                onClick={() => navigate({ type: 'course-detail', courseId: course.id })}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-left"
              >
                <img 
                  src={course.thumbnail} 
                  alt={course.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {course.lessonsCompleted} / {course.totalLessons} lessons
                  </p>
                  
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">{course.progress}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-gray-900 dark:text-white mb-6">Weekly Activity</h2>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#f0f0f0'} />
                <XAxis dataKey="day" stroke={isDarkMode ? '#9ca3af' : '#666'} />
                <YAxis stroke={isDarkMode ? '#9ca3af' : '#666'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1f2937' : 'white',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: isDarkMode ? 'white' : 'black'
                  }}
                />
                <Bar key="lessons-bar" dataKey="lessons" fill={primaryColor} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <p className="text-2xl text-gray-900 dark:text-white mb-1">
                {weeklyActivity.reduce((sum, day) => sum + day.lessons, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lessons This Week</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-gray-900 dark:text-white mb-1">
                {weeklyActivity.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hours This Week</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <h2 className="text-gray-900 dark:text-white mb-6">Recent Achievements</h2>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🔥', title: '12-Day Streak', desc: 'Learning every day' },
              { icon: '📚', title: '47 Lessons', desc: 'Completed' },
              { icon: '🎯', title: 'Top Performer', desc: '68% weekly progress' },
            ].map((achievement, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-gray-900 dark:text-white mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavigationBar navigate={navigate} currentPage="progress" />
    </div>
  );
}