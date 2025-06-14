import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { mockImages } from "../mock/images";
const HeroBanner = () => {
  return <div className="relative bg-gradient-to-r from-spice-brown to-spice-red text-white">
      {/* Decorative kolam pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-kolam-pattern bg-repeat"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6 px-0 py-0 my-0 mx-[240px] rounded-none">
            <img src={mockImages.logo} alt="Pudilicious logo" className="h-48 md:h-64 w-auto object-fill" />
          </div>
          
          <p className="text-xl md:text-2xl italic font-medium mb-6">
            Taste Grounded with Tradition
          </p>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg md:text-xl font-medium mb-8">Flavors With Tradition</h2>
            <p className="text-base md:text-lg">
              Welcome to Pudi'licious, your one-stop shop for traditional Indian flavors. 
              Explore our varieties of pudis, fast-meals and snacks from different regions 
              of Karnataka and other south Indian flavors.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
          <div className="order-2 md:order-1 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products" className="btn-primary inline-flex items-center justify-center">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link to="/our-story" className="btn-secondary bg-transparent border border-white hover:bg-white/10 inline-flex items-center justify-center">
                Our Story
              </Link>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img alt="Traditional South Indian spices and pudis arranged on brass plates" className="w-full h-[300px] md:h-[400px] object-cover" src={mockImages.heroSpices} />
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-spice-turmeric text-black px-4 py-2 rounded-md shadow-lg">
                <p className="text-sm font-semibold">Tradition in every pinch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroBanner;