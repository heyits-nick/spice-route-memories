
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OurStory = () => {
  return (
    <div>
      <Navbar />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-spice-brown">
              Our Story Unveiled
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="/about-image.jpg" 
                alt="Traditional South Indian kitchen with spices" 
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold font-playfair text-spice-brown mb-4">
                The Beginning of Pudi'licious
              </h2>
              
              <p className="text-gray-700 mb-4">
                Pudi'licious began in the heart of a traditional Karnataka kitchen, where our founder's 
                grandmother would meticulously prepare spice blends for the family. What started as a 
                labor of love to preserve authentic family recipes has grown into a brand that brings 
                these same traditional flavors to homes across the world.
              </p>
              
              <p className="text-gray-700 mb-4">
                Every pudi and gojju in our collection has its own story, often tied to specific regions, 
                festivals, or family traditions. We've worked tirelessly to ensure that each blend remains 
                true to its origins, using time-honored methods of roasting and grinding to preserve the 
                authentic flavors.
              </p>
            </div>
          </div>
          
          <div className="kolam-divider"></div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-playfair text-spice-brown mb-6 text-center">
              Karnataka Culture & Heritage
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <p className="text-gray-700 mb-4">
                Karnataka's culinary landscape is as diverse as its geography. From the coastal delicacies 
                of Mangalore to the royal cuisines of Mysore, each region has contributed unique flavors to 
                our collection. Our Bisibele-bath powder carries the legacy of the royal kitchens of Mysore, 
                while our Groundnut Chutney Powder celebrates the everyday condiments found in homes across 
                North Karnataka.
              </p>
              
              <p className="text-gray-700">
                In Karnataka tradition, pudis are more than just condiments—they're the heart of home cooking, 
                transforming simple ingredients into flavorful meals. Each blend represents centuries of 
                culinary wisdom passed down through generations.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold font-playfair text-spice-brown mb-6 text-center">
              Broader Indian Culinary Traditions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold font-playfair text-spice-brown mb-3">
                  Tamil Nadu
                </h3>
                <p className="text-gray-700">
                  Tamil cuisine is known for its use of tamarind, coconut, and varied spices. Our 
                  Rasam Powder and specific variants of Sambar Powder honor the traditional Tamil 
                  preparation methods while making them accessible for modern kitchens.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold font-playfair text-spice-brown mb-3">
                  Andhra Pradesh
                </h3>
                <p className="text-gray-700">
                  Known for its fiery flavors and distinctive use of red chilies and tamarind, 
                  Andhra cuisine has influenced several of our spice blends. Our Chutney Powders 
                  particularly showcase this culinary tradition's bold approach to flavor.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold font-playfair text-spice-brown mb-3">
                  Kerala
                </h3>
                <p className="text-gray-700">
                  The abundant use of coconut and fresh herbs gives Kerala cuisine its distinctive 
                  character. While our primary focus is on Karnataka traditions, we honor Kerala's 
                  influence in select special blends and seasonal offerings.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-spice-cream rounded-lg p-8 text-center mb-16">
            <h2 className="text-2xl font-bold font-playfair text-spice-brown mb-4">
              "Let's bring the flavors of Indian Heritage to our foods."
            </h2>
            <p className="text-gray-700 italic">
              At Pudi'licious, we're more than a brand—we're custodians of a rich culinary heritage.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OurStory;
