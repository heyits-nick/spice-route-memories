
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-spice-brown text-white mt-16 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and about */}
          <div>
            <h2 className="text-2xl font-bold font-playfair mb-4">Pudilicious Masalas</h2>
            <p className="mb-4 text-sm">
              Bringing authentic South Indian flavors to your kitchen with recipes passed down through generations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-spice-turmeric transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-spice-turmeric transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-spice-turmeric transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products/rasam-powder" className="hover:text-spice-turmeric transition-colors">
                  Rasam Powder
                </Link>
              </li>
              <li>
                <Link to="/products/sambar-powder" className="hover:text-spice-turmeric transition-colors">
                  Sambar Powder
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-spice-turmeric transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>hello@grandmasmasalas.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1" />
                <span>123 Spice Avenue, San Francisco, CA 94110</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Pudilicious Masalas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

