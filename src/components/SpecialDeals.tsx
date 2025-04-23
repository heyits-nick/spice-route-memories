
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const deals = [
  {
    id: "combo-1",
    name: "South Karnataka Combo",
    originalPrice: 39.99,
    salePrice: 29.99,
    discount: "25%",
    image: "/placeholder.svg" // Placeholder image
  },
  {
    id: "combo-2",
    name: "Andhra Spice Collection",
    originalPrice: 45.99,
    salePrice: 34.99,
    discount: "24%",
    image: "/placeholder.svg" // Placeholder image
  },
  {
    id: "combo-3",
    name: "Tamil Nadu Favorites",
    originalPrice: 42.99,
    salePrice: 32.99,
    discount: "23%",
    image: "/placeholder.svg" // Placeholder image
  },
  {
    id: "combo-4",
    name: "Festival Season Bundle",
    originalPrice: 59.99,
    salePrice: 44.99,
    discount: "25%",
    image: "/placeholder.svg" // Placeholder image
  }
];

const SpecialDeals = () => {
  return (
    <section className="py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="section-title mb-2">Special Deals</h2>
          <p className="text-lg text-gray-600">Limited time offers on our premium collections</p>
        </div>
        <Link to="/deals" className="text-spice-red hover:underline flex items-center">
          View All Deals
        </Link>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {deals.map((deal) => (
            <CarouselItem key={deal.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="spice-card p-1">
                <div className="relative">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full aspect-[4/3] object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-spice-red text-white px-2 py-1 rounded-md font-bold text-sm">
                    {deal.discount} OFF
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold font-playfair text-spice-brown mb-3">
                    {deal.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold">${deal.salePrice.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
                  </div>
                  
                  <Link to={`/deals/${deal.id}`}>
                    <Button className="w-full bg-spice-turmeric hover:bg-spice-turmeric/90 text-black">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </section>
  );
};

export default SpecialDeals;
