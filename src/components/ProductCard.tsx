
import { Link } from "react-router-dom";
import { useCart, CartItem, ProductSize } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

const ProductCard = ({ id, name, description, image, slug }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (size: ProductSize) => {
    const price = size === "trial" ? 10 : 50;
    
    const item: CartItem = {
      id,
      name,
      price,
      image,
      size,
      quantity: 1,
    };
    
    addItem(item);
  };

  return (
    <div className="spice-card group">
      <div className="overflow-hidden h-48">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold font-playfair text-spice-brown">
          {name}
        </h3>
        
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {description}
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">Trial Pack - 100g</div>
            <div className="font-semibold">$10</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">Full Size - 1kg</div>
            <div className="font-semibold">$50</div>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex flex-col space-y-2">
          <Link 
            to={`/products/${slug}`} 
            className="text-sm font-medium text-spice-red hover:text-spice-red/80 transition-colors"
          >
            View Details
          </Link>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs bg-white hover:bg-spice-cream border-spice-brown/20"
              onClick={() => handleAddToCart("trial")}
            >
              <ShoppingCart className="mr-1 h-3 w-3" /> 
              Add Trial
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs bg-white hover:bg-spice-cream border-spice-brown/20"
              onClick={() => handleAddToCart("full")}
            >
              <ShoppingCart className="mr-1 h-3 w-3" /> 
              Add Full
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
