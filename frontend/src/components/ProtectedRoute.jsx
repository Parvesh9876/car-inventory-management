import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Prevent unauthenticated users from accessing
 * protected pages.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait while authentication state is restored.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-lg font-medium text-white">
          Loading...
        </div>
      </div>
    );
  }

  // User isn't authenticated.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;