import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { calendarEvents } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

export function MiniCalendar() {
  const { isDarkMode } = useDarkMode();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };
  
  const hasEvent = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.some(event => event.date === dateStr);
  };
  
  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(event => event.date === dateStr);
  };
  
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };
  
  const primaryColor = isDarkMode ? '#01de9d' : '#ae8c5e';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 dark:text-white">Calendar</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <span className="text-sm text-gray-900 dark:text-white min-w-[100px] text-center">
            {monthNames[month]} {year}
          </span>
          <button 
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-xs text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center text-sm rounded-lg relative ${
              day === null 
                ? '' 
                : isToday(day)
                ? 'bg-opacity-20 ring-2'
                : hasEvent(day)
                ? 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                : 'text-gray-700 dark:text-gray-300'
            }`}
            style={isToday(day) ? { backgroundColor: `${primaryColor}20`, ringColor: primaryColor, color: primaryColor } : {}}
          >
            {day && (
              <>
                <span>{day}</span>
                {hasEvent(day) && (
                  <div 
                    className="absolute bottom-1 w-1 h-1 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Upcoming Events */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <h4 className="text-xs text-gray-600 dark:text-gray-400 mb-3">Upcoming Deadlines</h4>
        <div className="space-y-2">
          {calendarEvents.slice(0, 3).map((event, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <div 
                className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: primaryColor }}
              />
              <div>
                <p className="text-gray-900 dark:text-white">{event.title}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
