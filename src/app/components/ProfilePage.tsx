import { ArrowLeft, Award, BookOpen, Calendar, CheckCircle2, Flame, TrendingUp, Target, Mail, Phone, Trophy } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { studentData, mockCourses, weeklyActivity, mockCertificates } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';
import { useUser } from '../context/UserContext';

interface ProfilePageProps {
  navigate: (page: Page) => void;
}

export function ProfilePage({ navigate }: ProfilePageProps) {
  const { isDarkMode } = useDarkMode();
  const { userData } = useUser();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';
  
  const totalLessons = mockCourses.reduce((sum, course) => sum + course.totalLessons, 0);
  const completedPercentage = Math.round((studentData.completedLessons / totalLessons) * 100);
  const thisWeekLessons = weeklyActivity.reduce((sum, day) => sum + day.lessons, 0);
  const thisWeekHours = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);

  const joinDate = new Date('2025-09-01');
  const monthsActive = Math.floor(
    (new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div 
          className="rounded-2xl p-8 text-white shadow-lg mb-6"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
          }}
        >
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white/20 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-white mb-2">{userData?.name || studentData.name}</h1>
              <p className="text-[#f5e6d3] mb-4">
                {userData?.targetExam === 'Both' 
                  ? 'IELTS & SAT Preparation Student' 
                  : `${userData?.targetExam || 'IELTS & SAT'} Preparation Student`}
              </p>
              
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f5e6d3]" />
                  <span className="text-[#f5e6d3]">Joined {monthsActive} months ago</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                  <Flame className="w-5 h-5 text-orange-300" />
                  <span className="text-white">{studentData.streak} day streak</span>
                </div>
                {userData?.targetScore && (
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span className="text-white">Target: {userData.targetScore}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Card */}
        {userData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-gray-900 dark:text-white mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.1)' : 'rgba(174,140,94,0.1)' }}
                >
                  <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="text-gray-900 dark:text-white">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.1)' : 'rgba(174,140,94,0.1)' }}
                >
                  <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="text-gray-900 dark:text-white">{userData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.1)' : 'rgba(174,140,94,0.1)' }}
                >
                  <Calendar className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                  <p className="text-gray-900 dark:text-white">{calculateAge(userData.dateOfBirth)} years old</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.1)' : 'rgba(174,140,94,0.1)' }}
                >
                  <Target className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Target Exam</p>
                  <p className="text-gray-900 dark:text-white">{userData.targetExam}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900 dark:text-white mb-2">You're Making Great Progress! 🎯</h2>
              <p className="text-gray-700 dark:text-gray-300">
                You've completed {studentData.completedLessons} lessons and maintained a {studentData.streak}-day streak. 
                Keep pushing forward – every lesson brings you closer to your goals!
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.1)' : 'rgba(174,140,94,0.1)' }}
              >
                <BookOpen className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
            </div>
            <p className="text-2xl text-gray-900 dark:text-white mb-1">{studentData.completedLessons}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.1)' : 'rgba(174,140,94,0.1)' }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
            </div>
            <p className="text-2xl text-gray-900 dark:text-white mb-1">{completedPercentage}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <p className="text-2xl text-gray-900 dark:text-white mb-1">{studentData.streak}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <p className="text-2xl text-gray-900 dark:text-white mb-1">{mockCertificates.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Certificates</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-gray-900 dark:text-white mb-6">This Week's Activity</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.1)' : 'rgba(174,140,94,0.05)' }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lessons Completed</p>
              <p className="text-3xl" style={{ color: primaryColor }}>{thisWeekLessons}</p>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.1)' : 'rgba(174,140,94,0.05)' }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hours Studied</p>
              <p className="text-3xl" style={{ color: primaryColor }}>{thisWeekHours.toFixed(1)}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Completed "Advanced Vocabulary for Writing"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Submitted "IELTS Reading Practice Test"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">3 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <Award className="w-5 h-5" style={{ color: primaryColor }} />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Earned certificate for "SAT Vocabulary Mastery"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 week ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Courses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-gray-900 dark:text-white mb-6">Active Courses</h2>
          
          <div className="space-y-4">
            {mockCourses.filter(c => c.status === 'Active').map((course) => (
              <button
                key={course.id}
                onClick={() => navigate({ type: 'course-detail', courseId: course.id })}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <img 
                  src={course.thumbnail} 
                  alt={course.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 dark:text-white mb-1">{course.name}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
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

        {/* Goals Section */}
        <div 
          className="mt-6 rounded-xl p-8 text-white"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
          }}
        >
          <h2 className="text-white mb-4">Keep Going! 💪</h2>
          <p className="opacity-90 mb-4">
            You're on track to complete your current courses. Stay consistent with your {studentData.streak}-day streak and you'll achieve your goals in no time!
          </p>
          <button
            onClick={() => navigate({ type: 'dashboard' })}
            className="bg-white px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            style={{ color: primaryColor }}
          >
            Continue Learning
          </button>
        </div>
      </div>

      <NavigationBar navigate={navigate} currentPage="profile" />
    </div>
  );
}