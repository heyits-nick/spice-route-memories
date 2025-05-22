
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Save the current path for redirect after login
  if (!user && !isLoading) {
    sessionStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/auth" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 mx-auto animate-spin text-spice-red" />
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
