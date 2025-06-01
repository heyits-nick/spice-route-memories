import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart, ProductSize } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, Leaf, Info, Heart, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>("trial");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      toast.error("Product not found!");
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Link to="/products" className="text-spice-red hover:underline mt-4 inline-block">
            Return to all products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const price = selectedSize === "trial" ? product.price * 0.5 : product.price;
    
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: product.image,
      size: selectedSize,
      quantity,
    });
    
    toast.success(`${product.name} added to your cart`);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const currentPrice = selectedSize === "trial" ? product.price * 0.5 : product.price;

  return (
    <div>
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              to="/products" 
              className="inline-flex items-center text-spice-brown hover:text-spice-red transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="mt-6 bg-spice-cream/30 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="h-5 w-5 text-spice-red flex-shrink-0 mt-1" />
                  <p className="text-sm">
                    <span className="font-medium">Region:</span> {product.region}, {product.state} style pudi, 
                    crafted using traditional grinding methods to preserve authentic flavors.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-playfair text-spice-brown mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="h-4 w-4 text-spice-red" />
                  <span className="text-sm">Handcrafted in small batches</span>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  {product.longDescription}
                </p>
              </div>
              
              <Separator />
              
              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium mb-4">Choose Your Size:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSize === "trial" 
                        ? "border-spice-turmeric bg-spice-turmeric/10" 
                        : "border-gray-200 hover:border-spice-turmeric/50"
                    }`}
                    onClick={() => setSelectedSize("trial")}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-spice-brown">Trial Pack</h4>
                      <p className="text-sm text-gray-600">100g - Perfect for trying</p>
                      <p className="text-lg font-bold text-spice-red mt-2">
                        ${(product.price * 0.5).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSize === "full" 
                        ? "border-spice-turmeric bg-spice-turmeric/10" 
                        : "border-gray-200 hover:border-spice-turmeric/50"
                    }`}
                    onClick={() => setSelectedSize("full")}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-spice-brown">Full Size</h4>
                      <p className="text-sm text-gray-600">500g - Family pack</p>
                      <p className="text-lg font-bold text-spice-red mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quantity and Price */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Quantity:</h3>
                  <div className="flex items-center justify-center sm:justify-start space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-spice-brown/20"
                      onClick={decrementQuantity}
                      disabled={quantity === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <div className="text-xl font-semibold text-center min-w-[3rem]">
                      {quantity}
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-spice-brown/20"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-medium mb-2">Total Price:</h3>
                  <div className="text-3xl font-bold text-spice-red">
                    ${(currentPrice * quantity).toFixed(2)}
                  </div>
                  {quantity >= 3 && selectedSize === "trial" && (
                    <div className="bg-spice-turmeric/20 text-spice-brown px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                      Buy 2, Get 1 Free Offer Applied!
                    </div>
                  )}
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-spice-red hover:bg-spice-red/90 text-white py-6 text-lg font-semibold"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - ${(currentPrice * quantity).toFixed(2)}
              </Button>
              
              <div className="text-sm text-gray-500 flex items-center justify-center sm:justify-start">
                <Leaf className="mr-2 h-4 w-4 text-spice-green" />
                Free shipping on orders over $35
              </div>
            </div>
          </div>
          
          {/* Product Information Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="w-full grid grid-cols-2 lg:grid-cols-4 h-auto">
                <TabsTrigger 
                  value="ingredients" 
                  className="py-3 data-[state=active]:text-spice-red text-xs sm:text-sm"
                >
                  Ingredients
                </TabsTrigger>
                <TabsTrigger 
                  value="cultural" 
                  className="py-3 data-[state=active]:text-spice-red text-xs sm:text-sm"
                >
                  History
                </TabsTrigger>
                <TabsTrigger 
                  value="nutrition" 
                  className="py-3 data-[state=active]:text-spice-red text-xs sm:text-sm"
                >
                  Nutrition
                </TabsTrigger>
                <TabsTrigger 
                  value="usage" 
                  className="py-3 data-[state=active]:text-spice-red text-xs sm:text-sm"
                >
                  Recipes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ingredients" className="mt-4 p-6 bg-white rounded-lg border border-spice-brown/10">
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-gray-700"
                    >
                      <div className="w-2 h-2 bg-spice-turmeric rounded-full mr-3"></div>
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  All ingredients are non-GMO, preservative-free, and sourced from trusted farms in South India.
                </p>
              </TabsContent>
              
              <TabsContent value="cultural" className="mt-4 p-6 bg-white rounded-lg border border-spice-brown/10">
                <h3 className="text-xl font-semibold mb-4">Cultural Significance & History</h3>
                <p className="text-gray-700 mb-6">{product.culturalInfo}</p>
                
                {product.videoUrl && (
                  <div className="mt-8">
                    <h4 className="text-lg font-medium mb-3">Watch: The Story Behind Our {product.name}</h4>
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={product.videoUrl}
                        title={`The story of ${product.name}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="nutrition" className="mt-4 p-6 bg-white rounded-lg border border-spice-brown/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Nutritional Benefits</h3>
                    <ul className="space-y-3">
                      {product.nutritionalBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-spice-turmeric font-bold mr-2">•</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-spice-red">Allergy Information</h3>
                    <ul className="space-y-3">
                      {product.allergyWarnings.map((warning, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-spice-red font-bold mr-2">!</span>
                          <span className="text-gray-700">{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="usage" className="mt-4 p-6 bg-white rounded-lg border border-spice-brown/10">
                <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                <p className="text-gray-700 mb-6">{product.usageInfo}</p>
                
                <Collapsible className="mb-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full bg-spice-cream/50 p-3 rounded-md text-left">
                    <span className="font-medium">Pairing Suggestions</span>
                    <span>+</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 border border-t-0 rounded-b-md border-spice-brown/10">
                    <p className="text-gray-700">{product.pairingInfo}</p>
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full bg-spice-cream/50 p-3 rounded-md text-left">
                    <span className="font-medium">Recipe Ideas</span>
                    <span>+</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 border border-t-0 rounded-b-md border-spice-brown/10">
                    <ul className="space-y-2">
                      {product.recipeIdeas.map((recipe, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-spice-turmeric rounded-full mr-3"></div>
                          <span className="text-gray-700">{recipe}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
