
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Process the OAuth callback
      const { error } = await supabase.auth.getSession();
      
      // Get the intended redirect URL or default to homepage
      const redirectTo = sessionStorage.getItem("redirectPath") || "/";
      sessionStorage.removeItem("redirectPath");
      
      // Redirect the user
      navigate(redirectTo);
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 mx-auto animate-spin text-spice-red" />
        <h1 className="mt-4 text-xl font-semibold">Logging you in...</h1>
        <p className="mt-2 text-gray-500">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
