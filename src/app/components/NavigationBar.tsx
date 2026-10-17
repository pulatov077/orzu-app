import { BookOpen, Clock, TrendingUp, Award, Home } from 'lucide-react';
import { Page } from '../App';
import { useDarkMode } from '../context/DarkModeContext';

interface NavigationBarProps {
  navigate: (page: Page) => void;
  currentPage: string;
}

export function NavigationBar({ navigate, currentPage }: NavigationBarProps) {
  const { isDarkMode } = useDarkMode();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, page: { type: 'dashboard' as const } },
    { id: 'courses', label: 'Courses', icon: BookOpen, page: { type: 'courses' as const } },
    { id: 'assignments', label: 'Assignments', icon: Clock, page: { type: 'assignments-list' as const } },
    { id: 'progress', label: 'Progress', icon: TrendingUp, page: { type: 'progress' as const } },
    { id: 'certificates', label: 'Certificates', icon: Award, page: { type: 'certificates' as const } },
  ];

  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.page)}
                className={`flex flex-col items-center gap-1 py-3 px-4 transition min-w-[80px] ${
                  isActive
                    ? ''
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={isActive ? { color: primaryColor } : {}}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}