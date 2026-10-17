import { ArrowLeft, CheckCircle2, Star } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockAssignments } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface MentorFeedbackPageProps {
  navigate: (page: Page) => void;
  assignmentId: string;
}

export function MentorFeedbackPage({ navigate, assignmentId }: MentorFeedbackPageProps) {
  const { isDarkMode } = useDarkMode();
  const assignment = mockAssignments.find(a => a.id === assignmentId);

  const getStatusColor = (status: string) => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
    
    switch (status) {
      case 'Approved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'Under review':
        return isDarkMode ? 'bg-[#01de9d]/20 text-[#01de9d]' : 'bg-[#ae8c5e]/10 text-[#ae8c5e]';
      case 'Submitted':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'Urgent':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    }
  };

  if (!assignment || !assignment.mentorFeedback) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        <TopNav navigate={navigate} />

        <div className="max-w-5xl mx-auto px-6 py-8">
          <p className="text-gray-600 dark:text-gray-400">No feedback available yet.</p>
        </div>

        <NavigationBar navigate={navigate} currentPage="assignments" />
      </div>
    );
  }

  const { mentorFeedback } = assignment;
  const isApproved = assignment.status === 'Approved';
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate({ type: 'assignment', assignmentId })}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assignment
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-gray-900 dark:text-gray-100 mb-2">{assignment.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{assignment.course}</p>
            </div>
            <span className={`px-4 py-2 rounded-full ${getStatusColor(assignment.status)}`}>
              {assignment.status}
            </span>
          </div>
        </div>

        {/* Mentor Card */}
        <div className="bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bf] border border-[#ae8c5e]/20 rounded-xl p-8 mb-6">
          <div className="flex items-start gap-6">
            <img 
              src={assignment.mentorAvatar} 
              alt={assignment.mentorName}
              className="w-20 h-20 rounded-full border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Your Mentor</p>
              <h2 className="text-gray-900 dark:text-gray-100 mb-4">{assignment.mentorName}</h2>
              
              {/* Rating */}
              {assignment.mentorRating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < assignment.mentorRating!
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 dark:text-gray-400">{assignment.mentorRating}/5</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <h2 className="text-gray-900 dark:text-gray-100 mb-6">Feedback</h2>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
              {assignment.mentorFeedback}
            </p>
          </div>

          {isApproved && (
            <div className="mt-8 p-6 bg-green-50 border border-green-100 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-green-900 mb-2">Assignment Approved!</h3>
                  <p className="text-green-700">
                    Congratulations! Your work has been approved. Keep up the excellent work!
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isApproved && (
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-100 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1">ℹ️</div>
                <div>
                  <h3 className="text-yellow-900 mb-2">Revision Required</h3>
                  <p className="text-yellow-700 mb-4">
                    Please review the feedback above and resubmit your assignment.
                  </p>
                  <button
                    onClick={() => navigate({ type: 'assignment', assignmentId })}
                    className="bg-[#ae8c5e] text-white px-6 py-2 rounded-lg hover:bg-[#8b6f4a] transition"
                  >
                    Resubmit Assignment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <NavigationBar navigate={navigate} currentPage="assignments" />
    </div>
  );
}