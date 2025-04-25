import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { mockImages } from "@/mock/images";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-spice-cream border-b border-spice-brown/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img 
                src={mockImages.logo} 
                alt="Pudilicious logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 text-spice-brown hover:text-spice-red font-medium"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="px-3 py-2 text-spice-brown hover:text-spice-red font-medium"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="px-3 py-2 text-spice-brown hover:text-spice-red font-medium"
              >
                About Us
              </Link>
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-full bg-spice-turmeric hover:bg-spice-turmeric/90 text-black"
              >
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
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 rounded-full bg-spice-turmeric hover:bg-spice-turmeric/90 text-black mr-2"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-spice-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-spice-brown hover:text-spice-red"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-spice-brown/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-spice-brown hover:text-spice-red font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-spice-brown hover:text-spice-red font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-spice-brown hover:text-spice-red font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
