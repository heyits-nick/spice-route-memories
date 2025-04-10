
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { mockImages } from "../mock/images";

const HeroBanner = () => {
  return <div className="relative bg-gradient-to-r from-spice-brown to-spice-red text-white">
      {/* Decorative kolam pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-kolam-pattern bg-repeat"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold font-playfair leading-tight mb-4">
              Bringing Grandma's Masalas to Your Table
            </h1>
            
            <p className="text-lg md:text-xl mb-6 max-w-md">
              Authentic South Indian spice blends made with love, 
              just the way our grandmothers crafted them for generations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-primary inline-flex items-center justify-center">
                Explore Our Masalas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link to="/about" className="btn-secondary bg-transparent border border-white hover:bg-white/10 inline-flex items-center justify-center">
                Our Story
              </Link>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img alt="Traditional South Indian spices arranged in brass vessels" className="w-full h-[300px] md:h-[400px] object-cover" src={mockImages.rasamPowder} />
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-spice-turmeric text-black px-4 py-2 rounded-md shadow-lg">
                <p className="text-sm font-semibold">Tradition in every pack</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroBanner;
