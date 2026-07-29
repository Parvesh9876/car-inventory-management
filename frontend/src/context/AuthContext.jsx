import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
} from "../api/auth.api";

/**
 * Authentication Context
 *
 * Keeps authentication information available throughout
 * the React application without passing props manually.
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Restore user information when the browser refreshes.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  /**
   * Login user and store authentication information.
   */
  const login = async (credentials) => {
    const response = await loginUser(credentials);

    localStorage.setItem("token", response.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );

    setUser(response.data);

    return response;
  };

  /**
   * Register user.
   *
   * We don't automatically log the user in here.
   * After registration they will be redirected to login.
   */
  const register = async (userData) => {
    return await registerUser(userData);
  };

  /**
   * Logout user.
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,

    // Useful for rendering admin-only controls.
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook for accessing authentication state.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};