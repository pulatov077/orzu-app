import { useState, useEffect } from 'react';
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Trophy,
  Users,
  CheckCircle,
  Target,
  Globe,
  Award,
  Menu,
  X,
  Star,
  ChevronRight,
  Lightbulb,
  BarChart2,
  Clock,
  MessageSquare,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const NAV_LINKS = ['About', 'Programs', 'Why ORZU', 'Success Stories'];

const STATS = [
  { value: '2,400+', label: 'Students Enrolled' },
  { value: '94%', label: 'Success Rate' },
  { value: '7.8', label: 'Avg. IELTS Band' },
  { value: '1480', label: 'Avg. SAT Score' },
];

const WHY_ITEMS = [
  {
    icon: Target,
    title: 'DREAM Methodology',
    desc: 'Our proven 5-step framework — Diagnose, Reinforce, Execute, Analyze, Master — transforms preparation into progress.',
    color: '#01de9d',
  },
  {
    icon: Lightbulb,
    title: 'Adaptive Learning Paths',
    desc: 'Every lesson adapts to your current level so you spend time on what matters most, never on what you already know.',
    color: '#ae8c5e',
  },
  {
    icon: MessageSquare,
    title: 'Expert Mentor Feedback',
    desc: 'Certified IELTS and SAT instructors review your assignments and give targeted guidance within 24 hours.',
    color: '#01de9d',
  },
  {
    icon: BarChart2,
    title: 'Real-Time Progress Tracking',
    desc: 'Visual dashboards show your band/score trajectory so you always know exactly where you stand and what is next.',
    color: '#ae8c5e',
  },
  {
    icon: Globe,
    title: 'Full Skill Coverage',
    desc: 'Reading, Writing, Listening, Speaking for IELTS. Math and Evidence-Based Reading & Writing for SAT. All in one place.',
    color: '#01de9d',
  },
  {
    icon: Clock,
    title: 'Study at Your Own Pace',
    desc: 'Access every lesson, mock test, and resource any time. Build a schedule that fits around school and life.',
    color: '#ae8c5e',
  },
];

const PROGRAMS = [
  {
    exam: 'IELTS',
    tagline: 'International English Language Testing System',
    target: 'Band 7.0 – 9.0',
    modules: ['Academic Reading', 'Task 1 & 2 Writing', 'Listening Mastery', 'Speaking Confidence'],
    accent: '#01de9d',
    bg: '#0d1b2a',
    light: false,
  },
  {
    exam: 'SAT',
    tagline: 'Scholastic Assessment Test',
    target: 'Score 1400 – 1600',
    modules: ['Advanced Math', 'Algebra & Data Analysis', 'Reading Comprehension', 'Expression of Ideas'],
    accent: '#ae8c5e',
    bg: '#f9f5f0',
    light: true,
  },
];

const TESTIMONIALS = [
  {
    name: 'Malika Yusupova',
    exam: 'IELTS 8.0',
    quote: "ORZU's DREAM method made every study session feel purposeful. I went from band 6.0 to 8.0 in three months — I couldn't have done it without my mentor's feedback.",
    stars: 5,
  },
  {
    name: 'Jasur Mirzaev',
    exam: 'SAT 1510',
    quote: "The progress dashboard kept me motivated on tough days. Seeing my score climb week by week made all the difference. ORZU feels like a coach, not just a course.",
    stars: 5,
  },
  {
    name: 'Nilufar Karimova',
    exam: 'IELTS 7.5',
    quote: "I tried other platforms, but ORZU was the only one that gave me detailed feedback on every essay I wrote. The speaking module alone boosted my band by a full point.",
    stars: 5,
  },
];

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#ffffff' }}
    >
      {/* ── NAV ── */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(13,27,42,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            className="flex items-center gap-2 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <GraduationCap className="w-8 h-8" style={{ color: '#01de9d' }} />
            <span
              className="text-2xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #01de9d 0%, #ae8c5e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ORZU
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, '-'))}
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
              onClick={onGetStarted}
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: '#01de9d', color: '#0d1b2a' }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
            style={{ background: 'rgba(13,27,42,0.98)' }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className="text-left text-base font-medium text-white/80 hover:text-white py-1"
                onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, '-'))}
              >
                {link}
              </button>
            ))}
            <button
              onClick={onGetStarted}
              className="mt-2 w-full py-3 rounded-full text-sm font-bold"
              style={{ background: '#01de9d', color: '#0d1b2a' }}
            >
              Sign In / Get Started
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: '#0d1b2a' }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(1,222,157,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(1,222,157,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial glows */}
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: '#01de9d' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: '#ae8c5e' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
                style={{ background: 'rgba(1,222,157,0.12)', color: '#01de9d', border: '1px solid rgba(1,222,157,0.3)' }}
              >
                <Star className="w-3 h-3 fill-current" />
                The DREAM Project — Exam Preparation Platform
              </div>

              <h1
                className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6"
                style={{ color: '#ffffff' }}
              >
                Ace Your{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #01de9d, #00b87a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  IELTS
                </span>{' '}
                &{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #ae8c5e, #c9a87a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  SAT.
                </span>
                <br />
                Build Your<br />Dream Future.
              </h1>

              <p
                className="text-lg leading-relaxed mb-10 max-w-lg"
                style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Nunito', sans-serif" }}
              >
                ORZU is a structured, mentor-supported learning platform designed to take students
                from their first study session to their target exam score — step by step, every day.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onGetStarted}
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                  style={{ background: '#01de9d', color: '#0d1b2a', boxShadow: '0 0 32px rgba(1,222,157,0.35)' }}
                >
                  Start Learning Free <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onGetStarted}
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:bg-white/10"
                  style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  Sign In
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 mt-10">
                {['Mentor-Reviewed', 'DREAM Method', 'Certified Instructors'].map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: '#01de9d' }} />
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: floating score cards */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Central circle */}
              <div
                className="relative w-72 h-72 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(1,222,157,0.07)', border: '1px solid rgba(1,222,157,0.15)' }}
              >
                <div
                  className="w-48 h-48 rounded-full flex flex-col items-center justify-center"
                  style={{ background: 'rgba(1,222,157,0.12)', border: '1px solid rgba(1,222,157,0.25)' }}
                >
                  <GraduationCap className="w-12 h-12 mb-2" style={{ color: '#01de9d' }} />
                  <span className="text-2xl font-black" style={{ color: '#ffffff' }}>ORZU</span>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Learning Platform</span>
                </div>
              </div>

              {/* Floating cards */}
              <div
                className="absolute -top-4 -right-4 px-5 py-3 rounded-2xl shadow-xl"
                style={{ background: '#ae8c5e', color: '#ffffff' }}
              >
                <div className="text-xs font-semibold opacity-80">IELTS Band</div>
                <div className="text-3xl font-black">8.0</div>
              </div>

              <div
                className="absolute top-1/4 -left-12 px-5 py-3 rounded-2xl shadow-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff' }}
              >
                <div className="text-xs font-semibold opacity-60">SAT Score</div>
                <div className="text-3xl font-black" style={{ color: '#01de9d' }}>1510</div>
              </div>

              <div
                className="absolute -bottom-6 right-12 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3"
                style={{ background: 'rgba(13,27,42,0.9)', border: '1px solid rgba(1,222,157,0.2)', color: '#ffffff' }}
              >
                <Trophy className="w-8 h-8" style={{ color: '#ae8c5e' }} />
                <div>
                  <div className="text-xs font-medium opacity-60">Rank Achieved</div>
                  <div className="text-sm font-bold">Top 5%</div>
                </div>
              </div>

              <div
                className="absolute bottom-1/4 -left-8 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3"
                style={{ background: 'rgba(1,222,157,0.1)', border: '1px solid rgba(1,222,157,0.2)', color: '#ffffff' }}
              >
                <Users className="w-6 h-6" style={{ color: '#01de9d' }} />
                <div>
                  <div className="text-xs font-medium opacity-60">Active Learners</div>
                  <div className="text-sm font-bold">2,400+</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="py-8 px-6 text-center" style={{ background: 'rgba(13,27,42,0.6)' }}>
                <div
                  className="text-4xl font-black mb-1"
                  style={{ color: '#01de9d' }}
                >
                  {s.value}
                </div>
                <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 56 Q720 0 1440 56 L1440 56 L0 56Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div
              className="absolute -top-6 -left-6 w-72 h-72 rounded-3xl opacity-20"
              style={{ background: 'linear-gradient(135deg, #01de9d, #00b87a)' }}
            />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop&auto=format"
                alt="Students studying together in a bright classroom"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(13,27,42,0.5))' }}
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -right-4 px-6 py-4 rounded-2xl shadow-xl"
              style={{ background: '#0d1b2a', color: '#ffffff' }}
            >
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" style={{ color: '#01de9d' }} />
                <div>
                  <div className="text-xs font-medium opacity-60">Founded on</div>
                  <div className="text-sm font-bold">DREAM Methodology</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(174,140,94,0.1)', color: '#ae8c5e' }}
            >
              About ORZU
            </div>

            <h2
              className="text-4xl lg:text-5xl font-black leading-tight mb-6"
              style={{ color: '#0d1b2a' }}
            >
              A Platform Built Around{' '}
              <span style={{ color: '#01de9d' }}>Student Success</span>
            </h2>

            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: '#5a6475', fontFamily: "'Nunito', sans-serif" }}
            >
              ORZU was born from a simple belief: every student deserves a clear, structured path to
              their target exam score — not just a library of videos to get lost in. We built our entire
              platform around the{' '}
              <strong style={{ color: '#0d1b2a' }}>DREAM Project methodology</strong>: Diagnose, Reinforce,
              Execute, Analyze, Master.
            </p>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: '#5a6475', fontFamily: "'Nunito', sans-serif" }}
            >
              From personalized lesson paths and timed mock tests to mentor-reviewed writing submissions
              and real-time progress dashboards, everything in ORZU is engineered to turn consistent
              daily effort into measurable, lasting improvement.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { label: 'Years of Experience', val: '5+' },
                { label: 'Certified Instructors', val: '40+' },
                { label: 'Courses Available', val: '120+' },
                { label: 'Partner Institutions', val: '18' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl"
                  style={{ background: '#f8f9fb', border: '1px solid #eaecf0' }}
                >
                  <div className="text-2xl font-black mb-1" style={{ color: '#0d1b2a' }}>{item.val}</div>
                  <div className="text-xs font-medium" style={{ color: '#8a93a0' }}>{item.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: '#0d1b2a', color: '#ffffff' }}
            >
              Explore Our Programs <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section
        id="programs"
        className="py-28 px-6"
        style={{ background: '#f8f9fb' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(1,222,157,0.1)', color: '#01de9d', border: '1px solid rgba(1,222,157,0.25)' }}
            >
              Our Programs
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black leading-tight"
              style={{ color: '#0d1b2a' }}
            >
              Two Paths. One Platform.
            </h2>
            <p
              className="mt-4 text-base max-w-xl mx-auto"
              style={{ color: '#5a6475', fontFamily: "'Nunito', sans-serif" }}
            >
              Whether your goal is international university admission or a scholarship placement,
              ORZU has a complete program built for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.exam}
                className="relative rounded-3xl overflow-hidden shadow-lg"
                style={{ background: prog.bg }}
              >
                <div className="p-10">
                  {/* Exam badge */}
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black mb-6"
                    style={{
                      background: prog.accent,
                      color: prog.light ? '#0d1b2a' : '#0d1b2a',
                    }}
                  >
                    <BookOpen className="w-4 h-4" />
                    {prog.exam}
                  </div>

                  <h3
                    className="text-3xl font-black mb-1"
                    style={{ color: prog.light ? '#0d1b2a' : '#ffffff' }}
                  >
                    {prog.exam} Preparation
                  </h3>

                  <p
                    className="text-sm mb-2"
                    style={{ color: prog.light ? '#5a6475' : 'rgba(255,255,255,0.55)' }}
                  >
                    {prog.tagline}
                  </p>

                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-8"
                    style={{
                      background: prog.light ? 'rgba(174,140,94,0.12)' : 'rgba(1,222,157,0.12)',
                      color: prog.accent,
                    }}
                  >
                    Target: {prog.target}
                  </div>

                  <div className="space-y-3 mb-10">
                    {prog.modules.map((mod) => (
                      <div key={mod} className="flex items-center gap-3">
                        <CheckCircle
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: prog.accent }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: prog.light ? '#0d1b2a' : 'rgba(255,255,255,0.8)' }}
                        >
                          {mod}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onGetStarted}
                    className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      background: prog.accent,
                      color: '#0d1b2a',
                    }}
                  >
                    Start {prog.exam} Program <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Decorative large text */}
                <div
                  className="absolute bottom-4 right-6 text-8xl font-black opacity-5 select-none pointer-events-none"
                  style={{ color: prog.light ? '#0d1b2a' : '#ffffff' }}
                >
                  {prog.exam}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ORZU ── */}
      <section id="why-orzu" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(174,140,94,0.1)', color: '#ae8c5e' }}
            >
              Why ORZU
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black leading-tight"
              style={{ color: '#0d1b2a' }}
            >
              Built for Results,{' '}
              <span style={{ color: '#01de9d' }}>Not Just Content</span>
            </h2>
            <p
              className="mt-4 text-base max-w-xl mx-auto"
              style={{ color: '#5a6475', fontFamily: "'Nunito', sans-serif" }}
            >
              Most platforms give you lessons. ORZU gives you a system — one that tracks where you
              are, closes your gaps, and keeps you moving forward every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-7 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: '#f8f9fb', border: '1px solid #eaecf0' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ color: '#0d1b2a' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#5a6475', fontFamily: "'Nunito', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section
        id="success-stories"
        className="py-28 px-6"
        style={{ background: '#0d1b2a' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(1,222,157,0.1)', color: '#01de9d', border: '1px solid rgba(1,222,157,0.2)' }}
            >
              Success Stories
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black leading-tight"
              style={{ color: '#ffffff' }}
            >
              Students Who{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #01de9d, #ae8c5e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Reached Their Dream
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="p-7 rounded-3xl flex flex-col"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#ae8c5e' }} />
                  ))}
                </div>

                <p
                  className="text-base leading-relaxed flex-1 mb-6"
                  style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Nunito', sans-serif" }}
                >
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#ffffff' }}>{t.name}</div>
                    <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>ORZU Graduate</div>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-black"
                    style={{ background: 'rgba(1,222,157,0.12)', color: '#01de9d', border: '1px solid rgba(1,222,157,0.25)' }}
                  >
                    {t.exam}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="relative rounded-3xl p-14 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #0f2a1e 100%)' }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(1,222,157,0.6) 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
              }}
            />
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ background: '#01de9d' }}
            />

            <div className="relative">
              <GraduationCap className="w-14 h-14 mx-auto mb-6" style={{ color: '#01de9d' }} />
              <h2
                className="text-4xl lg:text-5xl font-black leading-tight mb-4"
                style={{ color: '#ffffff' }}
              >
                Your Target Score Is<br />Closer Than You Think.
              </h2>
              <p
                className="text-base mb-10 max-w-lg mx-auto"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Nunito', sans-serif" }}
              >
                Join thousands of students already on their path. Register today and get your
                personalized DREAM learning plan in minutes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={onGetStarted}
                  className="flex items-center gap-2 px-10 py-4 rounded-full font-black text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                  style={{ background: '#01de9d', color: '#0d1b2a', boxShadow: '0 0 40px rgba(1,222,157,0.4)' }}
                >
                  Get Started — It's Free <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onGetStarted}
                  className="px-10 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/10"
                  style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-14 px-6"
        style={{ background: '#0d1b2a', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <GraduationCap className="w-7 h-7" style={{ color: '#01de9d' }} />
              <span
                className="text-xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #01de9d 0%, #ae8c5e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ORZU
              </span>
            </div>

            {/* Nav */}
            <nav className="flex flex-wrap gap-6 justify-center">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, '-'))}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {link}
                </button>
              ))}
            </nav>

            <button
              onClick={onGetStarted}
              className="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{ background: '#01de9d', color: '#0d1b2a' }}
            >
              Sign In
            </button>
          </div>

          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              © 2025 ORZU — The DREAM Project. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              IELTS & SAT Exam Preparation Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
