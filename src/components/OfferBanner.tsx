
import { Link } from "react-router-dom";

interface OfferBannerProps {
  className?: string;
}

const OfferBanner = ({ className = "" }: OfferBannerProps) => {
  return (
    <div className={`bg-gradient-to-r from-spice-turmeric to-spice-red text-white py-3 px-4 rounded-lg ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <div className="hidden md:block mr-4">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl font-bold">3</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg md:text-xl">Special Offer!</h3>
            <p className="text-sm md:text-base">Buy 2 Trial Packs, Get 1 Free</p>
          </div>
        </div>
        <Link 
          to="/#combo-offer" 
          className="btn-primary bg-white hover:bg-white/90 text-spice-red text-sm px-4 py-2"
          onClick={(e) => {
            e.preventDefault();
            const comboSection = document.getElementById('combo-offer');
            if (comboSection) {
              comboSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = '/#combo-offer';
            }
          }}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default OfferBanner;
