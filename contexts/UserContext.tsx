"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserData {
  restaurantName: string;
  ownerName: string;
  whatsapp: string;
  email: string;
  plan: "basic" | "pro";
  isNewUser: boolean;
  createdAt?: string;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("bocao_user");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error loading user data:", e);
      }
    }
    setIsLoading(false);
  }, []);

  const setUser = (userData: UserData) => {
    setUserState(userData);
    localStorage.setItem("bocao_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem("bocao_user");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}


