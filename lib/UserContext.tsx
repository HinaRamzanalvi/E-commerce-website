"use client";
import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from './use-local-storage';

// Define the shape of a user object
interface User {
  username: string;
}

// Define the shape of the user context
interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create a context for user data
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to persist user data in local storage
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user data
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};