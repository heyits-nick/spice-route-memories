
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya S.",
    location: "New York, USA",
    text: "These spices taste exactly like the ones my mother used to grind at home. The rasam powder especially has that authentic aroma I've missed for years since moving abroad.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
  },
  {
    id: 2,
    name: "Rahul M.",
    location: "London, UK",
    text: "I've tried many sambar powders from stores, but nothing comes close to this. The freshness and balance of flavors is incredible. My non-Indian friends now request my sambar every weekend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
  },
  {
    id: 3,
    name: "Sarah T.",
    location: "Toronto, Canada",
    text: "I discovered South Indian cuisine only recently and wanted to try cooking it at home. These masalas made it so easy with perfect results every time. The cultural notes included with each recipe were a lovely touch.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <section className="py-12 bg-spice-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">From Our Spice Community</h2>
        <p className="section-subtitle text-center">What people are saying about our masalas</p>
        
        <div className="relative mt-12">
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-spice-brown" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-spice-brown" />
          </button>
          
          {/* Testimonial content */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mx-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-spice-turmeric mx-auto">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <p className="text-lg italic text-gray-600">"{testimonials[activeIndex].text}"</p>
                </div>
                
                <div>
                  <p className="font-bold text-spice-brown">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[activeIndex].location}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-spice-red" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
