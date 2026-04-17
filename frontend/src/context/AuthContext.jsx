import { createContext, useContext, useEffect, useState } from "react";
import { clearAuthData, getToken, getUser, setAuthData } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());

  const login = (authData) => {
    setAuthData(authData);
    setUser(authData.user);
    setToken(authData.token);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    setUser(getUser());
    setToken(getToken());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);