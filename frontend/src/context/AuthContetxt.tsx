import React, { createContext, useState, useMemo } from "react";
import type { AuthTokens } from "../shared/types/auth/auth.types";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  });

  const isAuthenticated = useMemo(() => !!tokens, [tokens]);

  const login = (newTokens: AuthTokens) => {
    localStorage.setItem("accessToken", newTokens.accessToken);
    localStorage.setItem("refreshToken", newTokens.refreshToken);
    setTokens(newTokens);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setTokens(null);
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
