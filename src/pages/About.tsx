
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-spice-brown">
              Our Story
            </h1>
            <p className="text-lg text-spice-red mt-2">
              From grandma's kitchen to your table
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="/about-image.jpg" 
                alt="Traditional South Indian kitchen" 
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold font-playfair text-spice-brown mb-4">
                Bringing Grandma's Masalas to Your Modern Kitchen
              </h2>
              
              <p className="text-gray-700 mb-4">
                We're a small family-run brand rooted in the fragrant kitchens of South India—where 
                every meal starts with sizzling mustard seeds and the warmth of rasam on a rainy day.
              </p>
              
              <p className="text-gray-700 mb-4">
                Our goal is simple: to bring you authentic, hand-crafted masalas made with love, 
                just like our grandmothers did.
              </p>
              
              <p className="text-gray-700 mb-4">
                Every packet of sambar or rasam powder you buy carries the legacy of our home, 
                and the comfort of familiar spices that have seasoned generations.
              </p>
              
              <p className="text-gray-700">
                Whether you're far from home or exploring these flavors for the first time—we're 
                here to make sure your meals taste like memories.
              </p>
            </div>
          </div>
          
          <div className="kolam-divider"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold font-playfair text-spice-brown mb-3">
                Our Process
              </h3>
              <p className="text-gray-700">
                We source our ingredients directly from small farms in South India. 
                Each spice is sun-dried, slow-roasted, and stone-ground in small batches 
                to preserve its essential oils and aroma.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold font-playfair text-spice-brown mb-3">
                Our Promise
              </h3>
              <p className="text-gray-700">
                No artificial preservatives, no fillers, no shortcuts. 
                Just pure, fresh spice blends that deliver the authentic taste 
                of South Indian home cooking every single time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold font-playfair text-spice-brown mb-3">
                Our Purpose
              </h3>
              <p className="text-gray-700">
                To preserve our culinary heritage while making it accessible 
                to everyone who craves the taste of authentic South Indian flavors, 
                no matter where they are in the world.
              </p>
            </div>
          </div>
          
          <div className="bg-spice-cream rounded-lg p-8 text-center mb-16">
            <h2 className="text-2xl font-bold font-playfair text-spice-brown mb-4">
              "Food should nourish not just the body, but also the soul."
            </h2>
            <p className="text-gray-700 italic">
              — Our Grandmother's favorite saying
            </p>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold font-playfair text-spice-brown mb-6">
              We'd Love to Hear From You
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Have questions about our products? Want to share your cooking experiences? 
              Or maybe you're just looking for some recipe inspiration? 
              We're always happy to chat about all things spice-related.
            </p>
            <div className="mt-6">
              <a 
                href="mailto:hello@grandmasmasalas.com" 
                className="btn-primary inline-block"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
