import { Calendar, Clock } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockAssignments, mockCourses } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface AssignmentsListPageProps {
  navigate: (page: Page) => void;
}

export function AssignmentsListPage({ navigate }: AssignmentsListPageProps) {
  const { isDarkMode } = useDarkMode();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  
  // Group assignments by course
  const assignmentsByCourse = mockCourses.map(course => ({
    course,
    assignments: mockAssignments.filter(a => a.courseId === course.id)
  })).filter(group => group.assignments.length > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'Under review':
        return isDarkMode 
          ? 'bg-[#01de9d]/10 text-[#01de9d]'
          : 'bg-[#ae8c5e]/10 text-[#ae8c5e]';
      case 'Submitted':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'Urgent':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-gray-900 dark:text-white mb-2">Your Assignments</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and submit your course assignments</p>
        </div>

        <div className="space-y-6">
          {assignmentsByCourse.map(({ course, assignments }) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Course Header */}
              <div 
                className="p-6 border-b border-gray-100 dark:border-gray-700"
                style={{ 
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(1,222,157,0.1) 0%, rgba(0,150,107,0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(174,140,94,0.1) 0%, rgba(139,111,74,0.1) 100%)'
                }}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={course.thumbnail} 
                    alt={course.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-gray-900 dark:text-white mb-1">{course.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'}</p>
                  </div>
                </div>
              </div>

              {/* Assignments */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {assignments.map((assignment) => {
                  const daysLeft = Math.ceil(
                    (new Date(assignment.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  const isPastDue = daysLeft < 0;
                  
                  return (
                    <button
                      key={assignment.id}
                      onClick={() => navigate({ type: 'assignment', assignmentId: assignment.id })}
                      className="w-full p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition text-left"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-gray-900 dark:text-white mb-2">{assignment.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{assignment.description}</p>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>Due: {new Date(assignment.deadline).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}</span>
                            </div>
                            
                            {!isPastDue && (assignment.status === 'Pending' || assignment.status === 'Urgent') && (
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span className={daysLeft <= 2 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}>
                                  {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(assignment.status)}`}>
                            {assignment.status}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {assignmentsByCourse.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-gray-900 dark:text-white mb-2">No assignments yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start taking courses to receive assignments
              </p>
              <button
                onClick={() => navigate({ type: 'courses' })}
                className="px-6 py-3 rounded-lg transition"
                style={{ 
                  backgroundColor: primaryColor,
                  color: 'white'
                }}
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>

      <NavigationBar navigate={navigate} currentPage="assignments" />
    </div>
  );
}