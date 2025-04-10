
import HeroBanner from "@/components/HeroBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import ComboPackSection from "@/components/ComboPackSection";
import TestimonialSection from "@/components/TestimonialSection";
import OfferBanner from "@/components/OfferBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroBanner />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <OfferBanner />
        </div>
        
        <FeaturedProducts />
        <ComboPackSection />
        <TestimonialSection />
        
        <section className="py-16 bg-spice-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-title">About Us</h2>
            <p className="section-subtitle">Our story and passion</p>
            
            <div className="mt-6 prose prose-lg text-gray-700 mx-auto">
              <h3 className="text-xl font-playfair font-bold text-spice-brown">
                Bringing Grandma's Masalas to Your Modern Kitchen
              </h3>
              
              <p className="my-4">
                We're a small family-run brand rooted in the fragrant kitchens of South India—where 
                every meal starts with sizzling mustard seeds and the warmth of rasam on a rainy day.
              </p>
              
              <p className="my-4">
                Our goal is simple: to bring you authentic, hand-crafted masalas made with love, 
                just like our grandmothers did.
              </p>
              
              <p className="my-4">
                Every packet of sambar or rasam powder you buy carries the legacy of our home, 
                and the comfort of familiar spices that have seasoned generations.
              </p>
              
              <p className="my-4">
                Whether you're far from home or exploring these flavors for the first time—we're 
                here to make sure your meals taste like memories.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
