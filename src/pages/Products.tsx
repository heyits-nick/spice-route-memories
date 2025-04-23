
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, getAllStates, getRegionsByState } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const Products = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  
  const states = getAllStates();
  
  // Set the first state as selected by default
  useEffect(() => {
    if (states.length > 0 && !selectedState) {
      setSelectedState(states[0]);
    }
  }, [states, selectedState]);
  
  const toggleStateExpansion = (state: string) => {
    setExpandedStates(prev => ({
      ...prev,
      [state]: !prev[state]
    }));
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };
  
  // Filter products based on selected state, region, and search query
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = !selectedState || product.state === selectedState;
    const matchesRegion = !selectedRegion || product.region === selectedRegion;
    
    return matchesSearch && matchesState && matchesRegion;
  });

  return (
    <div>
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-spice-brown">
              Explore Our Products
            </h1>
            <p className="text-lg text-spice-red mt-2">
              Authentic pudis and gojjus from across South India
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search products, e.g. 'pudi' or 'powder'..."
                className="pl-10 border-spice-brown/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar for State and Region Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-lg border border-spice-brown/10 mb-4 sticky top-24">
                <h3 className="text-xl font-medium font-playfair text-spice-brown mb-4">Filter by Region</h3>
                
                {states.map(state => (
                  <div key={state} className="mb-4">
                    <Button
                      variant="ghost"
                      className={`w-full justify-between font-medium ${
                        selectedState === state ? 'bg-spice-cream/50 text-spice-brown' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setSelectedState(state);
                        toggleStateExpansion(state);
                        setSelectedRegion(null);
                      }}
                    >
                      {state}
                      {expandedStates[state] ? 
                        <ChevronUp size={16} /> : 
                        <ChevronDown size={16} />
                      }
                    </Button>
                    
                    {selectedState === state && expandedStates[state] && (
                      <div className="ml-4 mt-2 space-y-2">
                        {getRegionsByState(state).map(region => (
                          <Button
                            key={region}
                            variant="ghost"
                            size="sm"
                            className={`w-full justify-start text-sm ${
                              selectedRegion === region 
                                ? 'bg-spice-turmeric/20 text-spice-brown font-medium' 
                                : 'text-gray-600'
                            }`}
                            onClick={() => handleRegionSelect(region)}
                          >
                            {region}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {(selectedState || selectedRegion || searchQuery) && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => {
                      setSelectedState(null);
                      setSelectedRegion(null);
                      setSearchQuery("");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search query</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      description={product.description}
                      image={product.image}
                      slug={product.slug}
                      price={product.price}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
