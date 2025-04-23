
import HeroBanner from "@/components/HeroBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BestSellers from "@/components/BestSellers";
import SpecialDeals from "@/components/SpecialDeals";
import ExploreProducts from "@/components/ExploreProducts";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroBanner />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BestSellers />
          <ExploreProducts />
          <SpecialDeals />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
