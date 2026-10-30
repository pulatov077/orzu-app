import { useState } from 'react';
import { Flame, Moon, Sun, User } from 'lucide-react';
import { Page } from '../App';
import { studentData } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';
import { useUser } from '../context/UserContext';
import { StreakModal } from './StreakModal';

interface TopNavProps {
  navigate: (page: Page) => void;
}

export function TopNav({ navigate }: TopNavProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { userData } = useUser();
  const [streakOpen, setStreakOpen] = useState(false);
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';

  return (
    <>
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => navigate({ type: 'dashboard' })}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-[#01de9d] to-[#00b87a] dark:from-[#01de9d] dark:to-[#00ffa3] bg-clip-text text-transparent">
              ORZU
            </span>
          </button>

          {/* Date */}
          <div className="hidden md:block">
            <p className="text-sm text-gray-600 dark:text-gray-300">{today}</p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Streak */}
            <button
              onClick={() => setStreakOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-orange-50 dark:bg-orange-900/20 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-150 hover:scale-105 hover:shadow-md active:scale-95"
              style={{ border: '1px solid rgba(249,115,22,0.2)' }}
            >
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" />
              <span className="text-orange-700 dark:text-orange-400 font-semibold text-xs sm:text-sm">
                {studentData.streak}d<span className="hidden sm:inline"> streak</span>
              </span>
            </button>

            {/* User Profile Button - With Icon instead of Avatar */}
            <button 
              onClick={() => navigate({ type: 'profile' })}
              className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isDarkMode ? 'rgba(1,222,157,0.2)' : 'rgba(174,140,94,0.2)' }}
              >
                <User className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <span className="hidden md:block text-gray-900 dark:text-white">{userData?.name || studentData.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    {streakOpen && <StreakModal onClose={() => setStreakOpen(false)} />}
    </>
  );
}