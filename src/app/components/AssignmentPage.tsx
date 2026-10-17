import { ArrowLeft, Calendar, CheckCircle2, Clock, FileText, Upload, XCircle } from 'lucide-react';
import { useState } from 'react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockAssignments } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface AssignmentPageProps {
  navigate: (page: Page) => void;
  assignmentId: string;
}

export function AssignmentPage({ navigate, assignmentId }: AssignmentPageProps) {
  const { isDarkMode } = useDarkMode();
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';
  const secondaryColor = isDarkMode ? '#00b37e' : '#8b6f4a';
  
  const assignment = mockAssignments.find(a => a.id === assignmentId);
  const [submissionText, setSubmissionText] = useState(assignment?.submissionText || '');
  const [submissionUrl, setSubmissionUrl] = useState('');

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'Rejected':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'Under review':
      case 'Submitted':
        return <Clock className="w-6 h-6" style={{ color: primaryColor }} />;
      default:
        return <FileText className="w-6 h-6 text-yellow-500" />;
    }
  };

  const daysLeft = Math.ceil(
    (new Date(assignment.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const canSubmit = assignment.status === 'Pending' || assignment.status === 'Urgent' || assignment.status === 'Rejected';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate({ type: 'assignments-list' })}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assignments
        </button>

        {/* Assignment Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(assignment.status)}
                <h1 className="text-gray-900 dark:text-white">{assignment.title}</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{assignment.course}</p>
            </div>
            <span className={`px-4 py-2 rounded-full ${getStatusColor(assignment.status)}`}>
              {assignment.status}
            </span>
          </div>

          {/* Deadline Info */}
          <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                <p className="text-gray-900 dark:text-white">
                  {new Date(assignment.deadline).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {daysLeft >= 0 && assignment.status !== 'Approved' && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time Remaining</p>
                  <p className={`${
                    daysLeft <= 2 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-gray-900 dark:text-white mb-4">Assignment Description</h2>
          <p className="text-gray-700 dark:text-gray-300">{assignment.description}</p>
        </div>

        {/* Submission Form */}
        {canSubmit && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
            <h2 className="text-gray-900 dark:text-white mb-6">Submit Your Work</h2>

            <div className="space-y-4">
              {/* Text Submission */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Description / Notes
                </label>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Describe your work or add notes..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:border-transparent outline-none transition"
                  style={{ 
                    '--tw-ring-color': primaryColor 
                  } as React.CSSProperties}
                />
              </div>

              {/* URL Submission */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Project URL (optional)
                </label>
                <input
                  type="url"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  placeholder="https://github.com/yourusername/project"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:border-transparent outline-none transition"
                  style={{ 
                    '--tw-ring-color': primaryColor 
                  } as React.CSSProperties}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Attach File (optional)
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center transition cursor-pointer"
                  style={{
                    '&:hover': {
                      borderColor: primaryColor
                    }
                  } as React.CSSProperties}
                >
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">PDF, ZIP, or other documents</p>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                className="w-full text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
                style={{ backgroundColor: primaryColor }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
              >
                <CheckCircle2 className="w-5 h-5" />
                Submit Assignment
              </button>
            </div>
          </div>
        )}

        {/* Show submission if already submitted */}
        {(assignment.status === 'Submitted' || assignment.status === 'Under review' || assignment.status === 'Approved') && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-blue-900 dark:text-blue-300 mb-2">Submission Received</h3>
                <p className="text-blue-700 dark:text-blue-400 mb-3">{assignment.submissionText}</p>
                {assignment.status === 'Approved' && (
                  <button
                    onClick={() => navigate({ type: 'mentor-feedback', assignmentId: assignment.id })}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
                  >
                    View Mentor Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rejected - Resubmit */}
        {assignment.status === 'Rejected' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-red-900 dark:text-red-300 mb-2">Assignment Needs Revision</h3>
                <p className="text-red-700 dark:text-red-400 mb-3">Please review the mentor feedback and resubmit your work.</p>
                <button
                  onClick={() => navigate({ type: 'mentor-feedback', assignmentId: assignment.id })}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline"
                >
                  View Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <NavigationBar navigate={navigate} currentPage="assignments" />
    </div>
  );
}