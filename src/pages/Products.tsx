
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import OfferBanner from "@/components/OfferBanner";

const Products = () => {
  return (
    <div>
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-spice-brown">
              Our Authentic Masalas
            </h1>
            <p className="text-lg text-spice-red mt-2">
              Hand-crafted spice blends from South India
            </p>
          </div>
          
          <OfferBanner className="mb-8" />
          
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
