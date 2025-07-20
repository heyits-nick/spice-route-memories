
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhoneAuth from "@/components/PhoneAuth";
import { ArrowRight, Mail, Facebook, Loader2, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const { signIn, signUp, signInWithProvider, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("phone");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationType, setRegistrationType] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const handleAuthRedirect = () => {
    const redirectPath = sessionStorage.getItem("redirectPath") || "/";
    navigate(redirectPath);
    sessionStorage.removeItem("redirectPath");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await signIn(email, password);
    
    setIsSubmitting(false);
    
    if (!error) {
      handleAuthRedirect();
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await signUp(email, password, { 
      first_name: firstName,
      last_name: lastName
    });
    
    setIsSubmitting(false);
    
    if (!error) {
      setActiveTab("login");
    }
  };

  const handleProviderSignIn = async (provider: 'google' | 'facebook') => {
    await signInWithProvider(provider);
  };

  // If user is already authenticated and not in a loading state, redirect them
  if (user && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-spice-brown font-playfair">
              Welcome to Pudi'licious
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to your account or create a new one
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border border-spice-lightBrown/10">
            <Tabs 
              defaultValue="phone"
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="login">Email</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="phone">
                <PhoneAuth onSuccess={handleAuthRedirect} />
              </TabsContent>
              
              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="spice@pudilicious.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a 
                        href="#" 
                        className="text-sm text-spice-red hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle forgot password
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-spice-red hover:bg-spice-red/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="mr-2 h-4 w-4" />
                    )}
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-lg border border-gray-200 p-1">
                      <button
                        type="button"
                        onClick={() => setRegistrationType("phone")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          registrationType === "phone"
                            ? "bg-spice-red text-white"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        Phone
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegistrationType("email")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          registrationType === "email"
                            ? "bg-spice-red text-white"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        Email
                      </button>
                    </div>
                  </div>

                  {registrationType === "phone" ? (
                    <PhoneAuth onSuccess={handleAuthRedirect} />
                  ) : (
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="registerEmail">Email</Label>
                        <Input
                          id="registerEmail"
                          type="email"
                          placeholder="spice@pudilicious.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="registerPassword">Password</Label>
                        <div className="relative">
                          <Input
                            id="registerPassword"
                            type={showRegisterPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          >
                            {showRegisterPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Password must be at least 6 characters long
                        </p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-spice-red hover:bg-spice-red/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="mr-2 h-4 w-4" />
                        )}
                        Create Account
                      </Button>
                    </form>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleProviderSignIn('google')}
                  className="w-full"
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Google
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleProviderSignIn('facebook')}
                  className="w-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                >
                  <Facebook className="mr-2 h-5 w-5" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
