
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { mockImages } from "@/mock/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  
  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.substring(0, 1).toUpperCase();
  };
  
  return (
    <nav className="bg-spice-cream border-b border-spice-brown/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src="/lovable-uploads/9461b30d-a9a2-49b8-a9d5-4d5caa3e3284.png" alt="Pudilicious logo" className="h-36 w-auto" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 text-spice-brown hover:text-spice-red font-medium">
                Home
              </Link>
              <Link to="/products" className="px-3 py-2 text-spice-brown hover:text-spice-red font-medium">
                Products
              </Link>
              <Link to="/about" className="px-3 py-2 text-spice-brown hover:text-spice-red font-medium">
                About Us
              </Link>
              
              {!user ? (
                <Link to="/auth" className="px-3 py-2 bg-spice-turmeric hover:bg-spice-turmeric/90 text-black rounded-md">
                  Sign In
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center outline-none">
                    <Avatar className="h-8 w-8 bg-spice-red text-white">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-default opacity-70">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              <button onClick={() => navigate("/cart")} className="relative p-2 rounded-full bg-spice-turmeric hover:bg-spice-turmeric/90 text-black">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-spice-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => navigate("/cart")} className="relative p-2 rounded-full bg-spice-turmeric hover:bg-spice-turmeric/90 text-black mr-2">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-spice-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={toggleMenu} className="p-2 rounded-md text-spice-brown hover:text-spice-red">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-spice-brown/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-spice-brown hover:text-spice-red font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="block px-3 py-2 text-spice-brown hover:text-spice-red font-medium" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/about" className="block px-3 py-2 text-spice-brown hover:text-spice-red font-medium" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            {!user ? (
              <Link to="/auth" className="block px-3 py-2 text-spice-brown hover:text-spice-red font-medium" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            ) : (
              <>
                <Link to="/profile" className="block px-3 py-2 text-spice-brown hover:text-spice-red font-medium" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-spice-brown hover:text-spice-red font-medium"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out ({user.email})</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
