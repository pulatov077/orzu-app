import { useEffect, useState, useRef } from 'react';
import { X, Flame, Star, Zap, Target, Trophy } from 'lucide-react';
import { streakData, studentData } from '../data/mockData';
import { useDarkMode } from '../context/DarkModeContext';

interface StreakModalProps {
  onClose: () => void;
}

const QUOTES = [
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
  { text: "Every day you practice brings you one step closer to your dream score.", author: "ORZU" },
  { text: "The secret of getting ahead is getting started — and not stopping.", author: "Mark Twain" },
  { text: "Your future self is cheering you on right now. Keep going.", author: "ORZU" },
  { text: "Champions aren't made in gyms. Champions are made from something they have deep inside them.", author: "Muhammad Ali" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Unknown" },
];

const MILESTONES = [
  { days: 3,  icon: Zap,    label: '3-Day Spark',    color: '#f59e0b' },
  { days: 7,  icon: Star,   label: '1 Week Strong',  color: '#8b5cf6' },
  { days: 14, icon: Target, label: '2-Week Warrior', color: '#01de9d' },
  { days: 30, icon: Trophy, label: '30-Day Legend',  color: '#ae8c5e' },
];

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(duration / target);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export function StreakModal({ onClose }: StreakModalProps) {
  const { isDarkMode } = useDarkMode();
  const primary = isDarkMode ? '#01de9d' : '#ae8c5e';
  const streak = studentData.streak;
  const displayCount = useCountUp(streak);

  const [quoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const quote = QUOTES[quoteIndex];

  // Build last 30 days relative to today, mark streakData days as active
  const activeDays = new Set(streakData.map((d) => d.day));
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const isToday = i === 29;
    const isActive = activeDays.has(label) || (i >= 30 - streak && i < 30);
    return { label, isActive, isToday };
  });

  // Close on backdrop click
  const backdropRef = useRef<HTMLDivElement>(null);
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', animation: 'fadeIn 0.18s ease' }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes flamePulse {
          0%, 100% { transform: scale(1) rotate(-3deg); }
          25% { transform: scale(1.12) rotate(3deg); }
          50% { transform: scale(1.18) rotate(-2deg); }
          75% { transform: scale(1.08) rotate(4deg); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 24px rgba(249,115,22,0.5); }
          50% { box-shadow: 0 0 48px rgba(249,115,22,0.9), 0 0 80px rgba(249,115,22,0.3); }
        }
        @keyframes dotPop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes milestoneEntry {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: isDarkMode ? '#111827' : '#ffffff',
          animation: 'slideUp 0.28s cubic-bezier(0.22,1,0.36,1)',
          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
          style={{ background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
        >
          <X className="w-4 h-4" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }} />
        </button>

        {/* Header: flame + streak count */}
        <div
          className="relative pt-10 pb-8 px-6 text-center overflow-hidden"
          style={{ background: isDarkMode ? '#1f2937' : '#fff7ed' }}
        >
          {/* Background glow rings */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-48 h-48 rounded-full opacity-10" style={{ background: '#f97316', filter: 'blur(32px)' }} />
          </div>

          {/* Flame icon */}
          <div className="relative inline-block mb-4" style={{ animation: 'flamePulse 2s ease-in-out infinite' }}>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)', animation: 'glowPulse 2s ease-in-out infinite' }}
            >
              <Flame className="w-10 h-10 text-white fill-white" />
            </div>
          </div>

          {/* Streak counter */}
          <div
            className="text-7xl font-black mb-1 tabular-nums"
            style={{
              background: 'linear-gradient(90deg, #f97316, #ef4444, #f97316)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 2.5s linear infinite',
            }}
          >
            {displayCount}
          </div>
          <div
            className="text-lg font-bold mb-1"
            style={{ color: isDarkMode ? '#f9fafb' : '#111827' }}
          >
            Day Streak
          </div>
          <p className="text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
            You've studied {streak} days in a row. Incredible! 🔥
          </p>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Calendar dots: last 30 days */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
              Last 30 Days
            </p>
            <div className="grid grid-cols-10 gap-1.5">
              {days.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    title={d.label}
                    className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{
                      background: d.isActive
                        ? d.isToday
                          ? 'linear-gradient(135deg, #f97316, #ef4444)'
                          : isDarkMode ? 'rgba(249,115,22,0.35)' : 'rgba(249,115,22,0.25)'
                        : isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      animation: d.isActive ? `dotPop 0.3s ease ${i * 22}ms both` : 'none',
                      border: d.isToday ? '2px solid #f97316' : 'none',
                    }}
                  >
                    {d.isActive && (
                      <Flame
                        className="w-3 h-3"
                        style={{
                          color: d.isToday ? '#fff' : isDarkMode ? '#fb923c' : '#ea580c',
                          fill: d.isToday ? '#fff' : 'currentColor',
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs" style={{ color: isDarkMode ? '#4b5563' : '#d1d5db' }}>30 days ago</span>
              <span className="text-xs" style={{ color: isDarkMode ? '#4b5563' : '#d1d5db' }}>Today</span>
            </div>
          </div>

          {/* Milestones */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
              Milestones
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MILESTONES.map((m, i) => {
                const Icon = m.icon;
                const unlocked = streak >= m.days;
                return (
                  <div
                    key={m.days}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{
                      background: unlocked
                        ? isDarkMode ? `${m.color}18` : `${m.color}12`
                        : isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      border: `1px solid ${unlocked ? `${m.color}40` : isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                      animation: unlocked ? `milestoneEntry 0.3s ease ${i * 80}ms both` : 'none',
                      opacity: unlocked ? 1 : 0.4,
                    }}
                  >
                    <Icon
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: unlocked ? m.color : isDarkMode ? '#374151' : '#d1d5db' }}
                    />
                    <div>
                      <div className="text-xs font-bold" style={{ color: unlocked ? (isDarkMode ? '#f9fafb' : '#111827') : isDarkMode ? '#4b5563' : '#9ca3af' }}>
                        {m.label}
                      </div>
                      <div className="text-xs" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
                        {unlocked ? 'Unlocked!' : `${m.days - streak} days to go`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote */}
          <div
            className="relative px-5 py-4 rounded-2xl overflow-hidden"
            style={{ background: isDarkMode ? `rgba(1,222,157,0.07)` : `rgba(174,140,94,0.08)`, border: `1px solid ${primary}25` }}
          >
            <div
              className="absolute top-3 left-4 text-5xl font-black leading-none select-none opacity-20"
              style={{ color: primary }}
            >
              "
            </div>
            <p
              className="text-sm leading-relaxed italic relative z-10 mb-2"
              style={{ color: isDarkMode ? '#d1d5db' : '#374151', fontFamily: "'Nunito', sans-serif" }}
            >
              {quote.text}
            </p>
            <p className="text-xs font-semibold" style={{ color: primary }}>
              — {quote.author}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: `linear-gradient(135deg, #f97316, #ef4444)`, color: '#ffffff', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
          >
            Keep the Streak Going! 🔥
          </button>
        </div>
      </div>
    </div>
  );
}
