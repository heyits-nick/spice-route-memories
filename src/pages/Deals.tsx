
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const deals = [
  {
    id: "combo-1",
    name: "South Karnataka Combo",
    originalPrice: 39.99,
    salePrice: 29.99,
    discount: "25%",
    image: "/placeholder.svg", // Placeholder image
    description: "A collection of essential pudis from South Karnataka including Bisibele-bath Powder and Puliyogare Gojju."
  },
  {
    id: "combo-2",
    name: "Andhra Spice Collection",
    originalPrice: 45.99,
    salePrice: 34.99,
    discount: "24%",
    image: "/placeholder.svg", // Placeholder image
    description: "Experience the fiery flavors of Andhra with this special collection of regional spice blends."
  },
  {
    id: "combo-3",
    name: "Tamil Nadu Favorites",
    originalPrice: 42.99,
    salePrice: 32.99,
    discount: "23%",
    image: "/placeholder.svg", // Placeholder image
    description: "Traditional Tamil Nadu spice blends including our premium Rasam Powder and Sambar Powder."
  },
  {
    id: "combo-4",
    name: "Festival Season Bundle",
    originalPrice: 59.99,
    salePrice: 44.99,
    discount: "25%",
    image: "/placeholder.svg", // Placeholder image
    description: "A festive collection of our most popular pudis, perfect for preparing traditional festival meals."
  },
  {
    id: "sambar-powder-special",
    name: "Sambar Powder - Family Pack",
    originalPrice: 28.99,
    salePrice: 22.99,
    discount: "20%",
    image: "/lovable-uploads/40e487fd-8f68-4dfb-82ef-9e14d959f773.png",
    description: "Our bestselling Sambar Powder in a special family-sized package at a discounted price."
  },
  {
    id: "chutney-powder-bundle",
    name: "Chutney Powder Variety Pack",
    originalPrice: 32.99,
    salePrice: 26.99,
    discount: "18%",
    image: "/lovable-uploads/dfde5322-e893-451e-9be1-51739db7bf50.png",
    description: "Try all our chutney powder varieties in this special sampler pack at a discounted price."
  }
];

const Deals = () => {
  const { addItem } = useCart();

  const handleAddToCart = (deal: any) => {
    addItem({
      id: deal.id,
      name: deal.name,
      price: deal.salePrice,
      image: deal.image,
      size: "full",
      quantity: 1,
    });
    
    toast.success(`Added ${deal.name} to your cart`);
  };

  return (
    <div>
      <Navbar />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-spice-brown">
              Special Deals
            </h1>
            <p className="text-lg text-spice-red mt-2">
              Limited time offers on our premium products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {deals.map((deal) => (
              <div key={deal.id} className="spice-card overflow-hidden">
                <div className="relative">
                  <img 
                    src={deal.image} 
                    alt={deal.name} 
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-spice-red text-white px-2 py-1 rounded-md font-bold">
                    {deal.discount} OFF
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold font-playfair text-spice-brown mb-2">
                    {deal.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {deal.description}
                  </p>
                  
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-bold text-spice-brown">${deal.salePrice.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
                    <span className="text-xs bg-spice-turmeric/20 text-spice-brown px-2 py-1 rounded">
                      You save ${(deal.originalPrice - deal.salePrice).toFixed(2)}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(deal)}
                    className="w-full bg-spice-turmeric hover:bg-spice-turmeric/90 text-black"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center text-spice-red hover:text-spice-brown transition-colors"
            >
              Explore More Products <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;
