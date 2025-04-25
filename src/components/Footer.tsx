import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { mockImages } from "@/mock/images";

const Footer = () => {
  return (
    <footer className="bg-spice-brown text-white mt-16 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and about */}
          <div>
            <div className="mb-4">
              <img 
                src={mockImages.logo} 
                alt="Pudilicious logo" 
                className="h-24 md:h-48 w-auto"
              />
            </div>
            <p className="mb-4 text-sm">
              Your one-stop shop for traditional Indian flavors. Explore our varieties of pudis, fast-meals 
              and snacks from different regions of Karnataka and other south Indian flavors.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-spice-turmeric transition-colors" aria-label="Follow us on Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-spice-turmeric transition-colors" aria-label="Like us on Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-spice-turmeric transition-colors" aria-label="Subscribe to our YouTube channel">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-spice-turmeric transition-colors" aria-label="Follow us on Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-spice-turmeric transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-spice-turmeric transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-spice-turmeric transition-colors">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-spice-turmeric transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-spice-turmeric transition-colors">
                  Contact Us
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
                <span>hello@pudilicious.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+91 (80) 1234-5678</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1" />
                <span>123 Spice Avenue, Bangalore, Karnataka 560001, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Pudi'licious. All rights reserved.</p>
          <p className="mt-2 text-white/70">
            Taste Grounded with Tradition
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
