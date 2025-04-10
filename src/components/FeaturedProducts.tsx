
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="section-title">Our Signature Masalas</h2>
            <p className="section-subtitle">Authentic flavors, handcrafted with care</p>
          </div>
          
          <Link 
            to="/products" 
            className="hidden md:flex items-center text-spice-red hover:text-spice-red/80 font-medium"
          >
            View All 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              slug={product.slug}
            />
          ))}
          
          {/* Placeholder for future products */}
          <div className="spice-card flex flex-col items-center justify-center p-8 text-center border-dashed bg-white/50">
            <div className="h-16 w-16 rounded-full bg-spice-cream flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-spice-brown">+</span>
            </div>
            
            <h3 className="text-xl font-bold font-playfair text-spice-brown mb-2">
              More Masalas Coming Soon
            </h3>
            
            <p className="text-sm text-gray-600">
              We're expanding our collection with more authentic South Indian spice blends.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/products" 
            className="inline-flex items-center text-spice-red hover:text-spice-red/80 font-medium"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
