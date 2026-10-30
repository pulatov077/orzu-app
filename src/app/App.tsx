import { useState } from 'react';
import { DarkModeProvider } from './context/DarkModeContext';
import { UserProvider, useUser } from './context/UserContext';
import { LandingPage } from './components/LandingPage';
import { RegistrationPage } from './components/RegistrationPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { CoursesPage } from './components/CoursesPage';
import { CourseDetail } from './components/CourseDetail';
import { LessonPage } from './components/LessonPage';
import { AssignmentPage } from './components/AssignmentPage';
import { MentorFeedbackPage } from './components/MentorFeedbackPage';
import { ProgressPage } from './components/ProgressPage';
import { NotificationsPage } from './components/NotificationsPage';
import { CertificatesPage } from './components/CertificatesPage';
import { ProfilePage } from './components/ProfilePage';
import { AssignmentsListPage } from './components/AssignmentsListPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UserData } from './context/UserContext';

export type Page = 
  | { type: 'login' }
  | { type: 'dashboard' }
  | { type: 'courses' }
  | { type: 'course-detail'; courseId: string }
  | { type: 'lesson'; lessonId: string; courseId: string }
  | { type: 'assignments-list' }
  | { type: 'assignment'; assignmentId: string }
  | { type: 'mentor-feedback'; assignmentId: string }
  | { type: 'progress' }
  | { type: 'notifications' }
  | { type: 'certificates' }
  | { type: 'profile' };

function AppContent() {
  const { userData, setUserData, isRegistered } = useUser();
  const [showLanding, setShowLanding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'login' });

  const handleRegister = (newUserData: UserData) => {
    setUserData(newUserData);
    setIsLoggedIn(true);
    setCurrentPage({ type: 'dashboard' });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage({ type: 'dashboard' });
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  // Show registration page if not registered
  if (!isRegistered) {
    return <RegistrationPage onRegister={handleRegister} />;
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {currentPage.type === 'dashboard' && <Dashboard navigate={navigate} />}
        {currentPage.type === 'courses' && <CoursesPage navigate={navigate} />}
        {currentPage.type === 'course-detail' && <CourseDetail navigate={navigate} courseId={currentPage.courseId} />}
        {currentPage.type === 'lesson' && <LessonPage navigate={navigate} lessonId={currentPage.lessonId} courseId={currentPage.courseId} />}
        {currentPage.type === 'assignments-list' && <AssignmentsListPage navigate={navigate} />}
        {currentPage.type === 'assignment' && <AssignmentPage navigate={navigate} assignmentId={currentPage.assignmentId} />}
        {currentPage.type === 'mentor-feedback' && <MentorFeedbackPage navigate={navigate} assignmentId={currentPage.assignmentId} />}
        {currentPage.type === 'progress' && <ProgressPage navigate={navigate} />}
        {currentPage.type === 'notifications' && <NotificationsPage navigate={navigate} />}
        {currentPage.type === 'certificates' && <CertificatesPage navigate={navigate} />}
        {currentPage.type === 'profile' && <ProfilePage navigate={navigate} />}
      </div>
    </DarkModeProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ErrorBoundary>
  );
}