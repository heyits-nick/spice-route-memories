
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, ProductSize } from "@/context/CartContext";
import { products } from "@/data/products";

const ComboPackSection = () => {
  const { addItem } = useCart();

  const handleAddCombo = () => {
    // Add one of each product as trial size
    products.forEach(product => {
      addItem({
        id: product.id,
        name: product.name,
        price: 10,
        image: product.image,
        size: "trial" as ProductSize,
        quantity: 1,
      });
    });
  };

  return (
    <section className="py-12 bg-spice-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Special Combo Offer</h2>
          <p className="section-subtitle">Try our trial packs with this special deal</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-spice-red to-spice-brown text-white p-8 flex flex-col justify-center">
              <div className="badge-offer inline-block mb-4 bg-white text-spice-red">Limited Time Offer</div>
              <h3 className="text-2xl md:text-3xl font-bold font-playfair mb-4">Buy 2 Trial Packs, Get 1 Free!</h3>
              <p className="mb-6 text-white/90">
                The perfect way to experience our authentic South Indian flavors before committing to a full-size pack.
              </p>
              
              <ul className="space-y-3 mb-6">
                {[
                  "100g trial packs of each masala",
                  "Perfect for 3-4 dishes each",
                  "Freshly ground spices",
                  "Authentic family recipes"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="col-span-1 lg:col-span-3 p-8">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {products.map((product, index) => (
                  <div key={product.id} className="flex-1 relative">
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-semibold mt-3">{product.name}</h4>
                    <p className="text-sm text-gray-500">100g Trial Pack</p>
                    <div className="mt-2 font-medium">$10</div>
                    
                    {index === 2 && (
                      <div className="absolute -right-3 -top-3 bg-spice-red text-white text-xs font-bold px-2 py-1 rounded-full">
                        FREE
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-spice-brown">$20 <span className="text-gray-400 line-through text-lg">$30</span></div>
                  <p className="text-sm text-gray-500">Free shipping on orders over $35</p>
                </div>
                
                <Button 
                  onClick={handleAddCombo}
                  className="mt-4 md:mt-0 bg-spice-red hover:bg-spice-red/90 text-white"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add Combo Pack to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboPackSection;
