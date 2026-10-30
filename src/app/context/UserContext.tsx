import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  targetExam: 'IELTS' | 'SAT' | 'Both';
  targetScore: string;
  avatar: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  isRegistered: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const DEFAULT_AVATAR = 'https://i.pravatar.cc/150?img=12';

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserDataState] = useState<UserData | null>(null);

  // Load user data from localStorage safely on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('orzuUserData');
      if (storedData) {
        const parsed = JSON.parse(storedData) as UserData;
        if (parsed && typeof parsed === 'object' && parsed.name) {
          setUserDataState(parsed);
        } else {
          localStorage.removeItem('orzuUserData');
        }
      }
    } catch {
      localStorage.removeItem('orzuUserData');
    }
  }, []);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
    localStorage.setItem('orzuUserData', JSON.stringify(data));
  };

  const isRegistered = userData !== null;

  return (
    <UserContext.Provider value={{ userData, setUserData, isRegistered }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
