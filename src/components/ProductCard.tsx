
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, ProductSize } from "@/context/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import { getProductBySlug } from "@/data/products";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  price?: number;
}

const ProductCard = ({ id, name, description, image, slug, price }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize>("trial");
  
  const product = getProductBySlug(slug);

  const getCurrentPrice = () => {
    if (!price) return 0;
    return selectedSize === "trial" ? price * 0.5 : price;
  };

  const handleAddToCart = () => {
    if (price) {
      const currentPrice = getCurrentPrice();
      addItem({
        id,
        name,
        price: currentPrice,
        image,
        size: selectedSize,
        quantity: 1,
      });
      
      toast.success(`${name} (${selectedSize === "trial" ? "Trial Pack" : "Full Size"}) added to your cart`);
    }
  };

  return (
    <div className="spice-card hover:shadow-lg transition-shadow">
      <Link to={`/products/${slug}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${slug}`} className="block">
          <h3 className="text-lg font-bold font-playfair text-spice-brown mb-2">
            {name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Size Selection Toggle */}
        <div className="mb-4">
          <ToggleGroup 
            type="single" 
            value={selectedSize} 
            onValueChange={(value: ProductSize) => value && setSelectedSize(value)}
            className="w-full grid grid-cols-2 gap-1"
          >
            <ToggleGroupItem 
              value="trial" 
              className="text-xs py-2 data-[state=on]:bg-spice-turmeric/20 data-[state=on]:text-spice-brown border border-spice-brown/20"
            >
              Trial Pack
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="full" 
              className="text-xs py-2 data-[state=on]:bg-spice-turmeric/20 data-[state=on]:text-spice-brown border border-spice-brown/20"
            >
              Full Size
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          {price ? (
            <div className="text-left">
              <span className="font-bold text-lg">${getCurrentPrice().toFixed(2)}</span>
              <div className="text-xs text-gray-500">
                {selectedSize === "trial" ? "100g" : "500g"}
              </div>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Price unavailable</span>
          )}
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-spice-red hover:text-spice-brown hover:bg-transparent p-0"
              >
                <Info className="h-4 w-4 mr-1" />
                Learn More
              </Button>
            </DialogTrigger>
            
            {product && (
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-playfair text-spice-brown">
                    {product.name}
                  </DialogTitle>
                  <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogHeader>
                
                <Tabs defaultValue="history" className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="history">
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-3">Origin & Cultural Context</h3>
                      <p className="text-gray-700 text-sm mb-4">{product.culturalInfo}</p>
                      
                      {product.videoUrl && (
                        <div className="mt-4">
                          <h4 className="text-md font-medium mb-2">Watch: The Story of {product.name}</h4>
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src={product.videoUrl}
                              title={`${product.name} story`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="nutrition">
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-3">Nutritional Benefits</h3>
                      <ul className="space-y-2 mb-4">
                        {product.nutritionalBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-spice-turmeric font-bold mr-2">•</span>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-medium mb-3 text-spice-red">Allergy Warnings</h3>
                      <ul className="space-y-2">
                        {product.allergyWarnings.map((warning, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-spice-red font-bold mr-2">!</span>
                            <span className="text-gray-700">{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="usage">
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-3">How to Use</h3>
                      <p className="text-gray-700 text-sm mb-4">{product.usageInfo}</p>
                      
                      <h3 className="text-lg font-medium mb-2">Recipe Ideas</h3>
                      <ul className="space-y-1 mb-4">
                        {product.recipeIdeas.map((recipe, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            • {recipe}
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-medium mb-2">Pairing Suggestions</h3>
                      <p className="text-gray-700 text-sm">{product.pairingInfo}</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/products/${slug}`}
                    className="text-spice-red hover:underline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    View Full Details
                  </Link>
                  
                  {price && (
                    <Button
                      onClick={() => {
                        handleAddToCart();
                        setIsDialogOpen(false);
                      }}
                      size="sm"
                      className="bg-spice-turmeric hover:bg-spice-turmeric/90 text-black"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </DialogContent>
            )}
          </Dialog>
        </div>
        
        {price && (
          <Button
            onClick={handleAddToCart}
            className="w-full bg-spice-turmeric hover:bg-spice-turmeric/90 text-black"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart - ${getCurrentPrice().toFixed(2)}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
