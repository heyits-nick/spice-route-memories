
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { mockImages } from "@/mock/images";
import { toast } from "sonner";

const bestSellerProducts = [
  {
    id: "sambar-powder",
    name: "Sambar Powder (huli pudi)",
    image: mockImages.sambarPowder,
    description: "The quintessential South Indian spice blend for making delicious sambar.",
    price: 15.99
  },
  {
    id: "rasam-powder",
    name: "Rasam Powder (saarina pudi)",
    image: mockImages.rasamPowder,
    description: "A tangy and aromatic blend perfect for making traditional rasam soup.",
    price: 12.99
  },
  {
    id: "groundnut-chutney-powder",
    name: "Groundnut Chutney Powder (with garlic)",
    image: mockImages.groundnutChutney,
    description: "Savory peanut-based powder with fragrant garlic - perfect condiment for breakfast items.",
    price: 14.99
  },
  {
    id: "bisi-bele-bath-powder",
    name: "Bisibele-bath Powder",
    image: mockImages.sambarPowder, // Using placeholder image
    description: "Rich and flavorful spice blend specifically created for the one-pot rice dish.",
    price: 16.99
  },
];

const BestSellers = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "trial",
      quantity: 1,
    });
    
    toast.success(`Added ${product.name} to your cart`);
  };

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="section-title">Best Sellers</h2>
        <p className="section-subtitle">Our most popular authentic flavors</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestSellerProducts.map((product) => (
          <div key={product.id} className="spice-card flex flex-col">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold font-playfair text-spice-brown mb-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {product.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  <Link to={`/products/${product.id}`} className="text-sm text-spice-red hover:underline">
                    Learn More
                  </Link>
                </div>
                
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-spice-turmeric hover:bg-spice-turmeric/90 text-black"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
