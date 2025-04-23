
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ExploreProducts = () => {
  return (
    <section className="py-12 bg-spice-cream/50 my-12 rounded-lg">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="section-title">Explore Our Full Range</h2>
        <p className="text-lg text-gray-700 mb-8">
          Discover authentic flavors from Karnataka, Tamil Nadu, Andhra Pradesh and more. 
          Each pudi is crafted with traditional recipes passed down through generations.
        </p>
        
        <Link 
          to="/products" 
          className="btn-primary inline-flex items-center justify-center text-lg px-10 py-4"
        >
          Explore All Products
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default ExploreProducts;
