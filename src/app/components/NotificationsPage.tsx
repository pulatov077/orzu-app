import { ArrowLeft, Bell, Calendar, CheckCircle, MessageSquare } from 'lucide-react';
import { TopNav } from './TopNav';
import { NavigationBar } from './NavigationBar';
import { Page } from '../App';
import { mockNotifications } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface NotificationsPageProps {
  navigate: (page: Page) => void;
}

export function NotificationsPage({ navigate }: NotificationsPageProps) {
  const { isDarkMode } = useDarkMode();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case 'feedback':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800';
      case 'feedback':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopNav navigate={navigate} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate({ type: 'dashboard' })}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-gray-900 dark:text-white" />
          <div>
            <h1 className="text-gray-900 dark:text-white">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400">Stay updated with your learning</p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`border rounded-xl p-6 ${getTypeColor(notification.type)} ${
                notification.read ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900 dark:text-white">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{notification.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if needed) */}
        {mockNotifications.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">No notifications yet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </div>

      <NavigationBar navigate={navigate} currentPage="dashboard" />
    </div>
  );
}