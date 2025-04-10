
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, ProductSize } from "@/context/CartContext";
import { products } from "@/data/products";
import { mockImages } from "@/mock/images";
import { toast } from "sonner";

const ComboPackSection = () => {
  const { addItem } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [freeProduct, setFreeProduct] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "free">("select");

  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    } else {
      if (selectedProducts.length < 2) {
        setSelectedProducts(prev => [...prev, productId]);
      } else {
        toast.info("You can only select 2 products for this offer");
      }
    }
  };

  const handleProceedToFree = () => {
    if (selectedProducts.length === 2) {
      setStep("free");
    } else {
      toast.error("Please select 2 products first");
    }
  };

  const handleSelectFreeProduct = (productId: string) => {
    setFreeProduct(productId);
  };

  const handleAddCombo = () => {
    // Add the 2 selected products
    selectedProducts.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        addItem({
          id: product.id,
          name: product.name,
          price: 10,
          image: product.image,
          size: "trial" as ProductSize,
          quantity: 1,
        });
      }
    });

    // Add the free product if selected
    if (freeProduct) {
      const product = products.find(p => p.id === freeProduct);
      if (product) {
        addItem({
          id: product.id,
          name: product.name,
          price: 0, // Free!
          image: product.image,
          size: "trial" as ProductSize,
          quantity: 1,
        });
      }
    }

    // Reset states
    setSelectedProducts([]);
    setFreeProduct(null);
    setStep("select");
    
    toast.success("Combo pack added to cart!");
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
              {step === "select" ? (
                <>
                  <h4 className="font-semibold text-lg mb-4">Step 1: Select 2 trial packs</h4>
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {products.map((product) => (
                      <div 
                        key={product.id} 
                        className={`flex-1 relative border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedProducts.includes(product.id) 
                            ? "border-spice-red bg-spice-red/5" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleSelectProduct(product.id)}
                      >
                        <div className="rounded-lg overflow-hidden mb-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-500">100g Trial Pack</p>
                        <div className="mt-2 font-medium">$10</div>
                        
                        {selectedProducts.includes(product.id) && (
                          <div className="absolute -right-2 -top-2 bg-spice-red text-white h-6 w-6 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-spice-brown">
                        {selectedProducts.length > 0 ? `$${selectedProducts.length * 10}` : "$0"}
                      </div>
                      <p className="text-sm text-gray-500">Select 2 products to proceed</p>
                    </div>
                    
                    <Button 
                      onClick={handleProceedToFree}
                      disabled={selectedProducts.length !== 2}
                      className="mt-4 md:mt-0 bg-spice-red hover:bg-spice-red/90 text-white"
                    >
                      Proceed to Select Free Pack
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="font-semibold text-lg mb-4">Step 2: Select your FREE trial pack</h4>
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {products.map((product) => (
                      <div 
                        key={product.id} 
                        className={`flex-1 relative border rounded-lg p-4 cursor-pointer transition-all ${
                          freeProduct === product.id 
                            ? "border-spice-green bg-spice-green/5" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleSelectFreeProduct(product.id)}
                      >
                        <div className="rounded-lg overflow-hidden mb-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-500">100g Trial Pack</p>
                        <div className="mt-2 font-medium line-through text-gray-400">$10</div>
                        <div className="font-bold text-spice-green">FREE</div>
                        
                        {freeProduct === product.id && (
                          <div className="absolute -right-2 -top-2 bg-spice-green text-white h-6 w-6 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-spice-brown">$20 <span className="text-gray-400 line-through text-lg">$30</span></div>
                      <p className="text-sm text-gray-500">You save $10 with this offer!</p>
                    </div>
                    
                    <div className="flex gap-4 mt-4 md:mt-0">
                      <Button 
                        onClick={() => setStep("select")}
                        variant="outline"
                        className="border-spice-brown/20"
                      >
                        Back
                      </Button>
                      
                      <Button 
                        onClick={handleAddCombo}
                        disabled={!freeProduct}
                        className="bg-spice-red hover:bg-spice-red/90 text-white"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add Combo to Cart
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboPackSection;
