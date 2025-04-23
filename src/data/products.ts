
import { mockImages } from "@/mock/images";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  culturalInfo: string;
  usageInfo: string;
  nutritionalBenefits: string[];
  allergyWarnings: string[];
  pairingInfo: string;
  recipeIdeas: string[];
  image: string;
  region: string;
  state: string;
  price: number;
  videoUrl?: string;
}

export const products: Product[] = [
  {
    id: "sambar-powder",
    name: "Sambar Powder (huli pudi)",
    slug: "sambar-powder",
    description: "A rich, complex spice mix essential for creating the hearty lentil and vegetable stew beloved across South India.",
    longDescription: "Our Sambar Powder is carefully roasted and ground to create a deep, robust flavor profile that forms the backbone of a perfect sambar. Unlike store-bought varieties, our blend maintains the perfect balance between spicy, tangy, and savory notes, with none of the bitterness that comes from over-grinding.",
    ingredients: [
      "Coriander Seeds", 
      "Red Chillies", 
      "Chana Dal", 
      "Urad Dal", 
      "Fenugreek Seeds", 
      "Mustard Seeds", 
      "Curry Leaves", 
      "Turmeric", 
      "Asafoetida"
    ],
    culturalInfo: "Sambar is the cornerstone of South Indian cuisine, especially in Karnataka where it originated in the kitchen of the Maratha ruler Sambhaji. Each region has developed its distinct variation—from the more tamarind-heavy Tamil style to the coconut-infused Kerala version.",
    usageInfo: "For authentic sambar, cook toor dal until soft. In a separate pan, sauté onions, tomatoes, and vegetables of choice. Add 2-3 teaspoons of sambar powder, tamarind extract, and the cooked dal. Simmer until vegetables are tender.",
    nutritionalBenefits: [
      "Rich in dietary fiber from the lentils and spices",
      "Contains anti-inflammatory compounds from turmeric",
      "Good source of plant protein",
      "Provides essential minerals like iron and magnesium"
    ],
    allergyWarnings: [
      "Contains lentils (dal)",
      "Processed in a facility that also handles nuts, wheat, and soy"
    ],
    pairingInfo: "Pairs perfectly with steamed rice, idli, dosa, or vada. Also excellent with rice-based dishes like lemon rice or coconut rice.",
    recipeIdeas: [
      "Classic Vegetable Sambar",
      "Drumstick Sambar",
      "Pumpkin Sambar",
      "Onion Sambar"
    ],
    image: mockImages.sambarPowder,
    region: "South Karnataka",
    state: "Karnataka",
    price: 15.99,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
  },
  {
    id: "rasam-powder",
    name: "Rasam Powder (saarina pudi)",
    slug: "rasam-powder",
    description: "An aromatic blend perfect for making the quintessential South Indian soup that combines tartness with heat and spice.",
    longDescription: "Our signature Rasam Powder is crafted using a recipe passed down through generations. This authentic blend captures the essence of Tamil Nadu's kitchens with its perfect balance of sourness, heat, and aromatic spices.",
    ingredients: [
      "Red Chillies", 
      "Coriander Seeds", 
      "Black Pepper", 
      "Cumin Seeds", 
      "Toor Dal", 
      "Curry Leaves", 
      "Mustard Seeds", 
      "Asafoetida"
    ],
    culturalInfo: "Rasam is more than just a soup in Tamil Nadu—it's a remedy, a comfort food, and an essential dish at every meal. Traditionally served after a meal of rice and sambar, rasam aids digestion and is considered medicinal, especially during colds or fevers.",
    usageInfo: "To make authentic rasam, temper mustard seeds, curry leaves, and garlic in ghee. Add tomatoes, tamarind extract, and 1-2 teaspoons of rasam powder. Simmer until the flavors meld, then finish with fresh cilantro.",
    nutritionalBenefits: [
      "Contains black pepper which enhances nutrient absorption",
      "Rich in antioxidants from various spices",
      "Supports digestion and gut health",
      "Natural immune system booster"
    ],
    allergyWarnings: [
      "Contains lentils (toor dal)",
      "May contain traces of mustard",
      "Processed in a facility that also handles nuts and wheat"
    ],
    pairingInfo: "Traditionally served with steamed rice. Also excellent as a soothing soup on its own or paired with appam or idiyappam.",
    recipeIdeas: [
      "Traditional Tomato Rasam",
      "Pepper Rasam",
      "Garlic Rasam",
      "Lemon Rasam"
    ],
    image: mockImages.rasamPowder,
    region: "Central Tamil Nadu",
    state: "Tamil Nadu",
    price: 12.99
  },
  {
    id: "chutney-powder",
    name: "Chutney Powder (mixed dal)",
    slug: "chutney-powder",
    description: "A versatile spice blend made with mixed lentils that adds instant flavor to any meal.",
    longDescription: "Our Mixed Dal Chutney Powder combines various lentils with a perfect balance of spices to create a versatile condiment that can transform even the simplest dishes. Dry-roasted to perfection to enhance the nutty flavors of the lentils.",
    ingredients: [
      "Chana Dal",
      "Urad Dal",
      "Red Chillies",
      "Curry Leaves",
      "Asafoetida",
      "Tamarind",
      "Salt",
      "Sesame Seeds"
    ],
    culturalInfo: "Chutney powders are an integral part of South Indian meals, often sprinkled over rice mixed with a little oil or ghee to make a quick and satisfying meal. They're also commonly served alongside dosas and idlis at breakfast.",
    usageInfo: "Mix with a teaspoon of sesame oil or ghee and sprinkle over hot rice. Also excellent as a sprinkled condiment over dosa, idli or upma. Can be used as a dry rub for roasted vegetables.",
    nutritionalBenefits: [
      "High in plant-based protein from mixed lentils",
      "Contains essential amino acids",
      "Good source of dietary fiber",
      "Rich in iron and B vitamins"
    ],
    allergyWarnings: [
      "Contains various lentils",
      "Contains sesame seeds",
      "Processed in a facility that handles nuts and wheat"
    ],
    pairingInfo: "Perfect with rice and ghee, idli, dosa, or as a flavor enhancer for steamed vegetables. Also great sprinkled over yogurt rice.",
    recipeIdeas: [
      "Chutney Powder Rice",
      "Spiced Vegetable Stir-fry",
      "Flavored Yogurt Dip",
      "Spiced Idli"
    ],
    image: mockImages.groundnutChutney, // Using placeholder
    region: "North Karnataka",
    state: "Karnataka",
    price: 13.99
  },
  {
    id: "groundnut-chutney-powder-no-garlic",
    name: "Groundnut Chutney Powder (without garlic)",
    slug: "groundnut-chutney-powder-no-garlic",
    description: "A savory, nutty condiment made with roasted peanuts and spices, perfect for those who prefer no garlic.",
    longDescription: "Our Groundnut Chutney Powder without garlic is specially crafted for those who follow sattvic diets or simply prefer foods without garlic. The roasted peanuts provide a rich, nutty base that's complemented perfectly by our blend of spices.",
    ingredients: [
      "Roasted Peanuts",
      "Red Chillies",
      "Curry Leaves",
      "Tamarind",
      "Jaggery",
      "Salt",
      "Asafoetida"
    ],
    culturalInfo: "Peanut-based condiments are particularly popular in Karnataka and Andhra Pradesh. This garlic-free version is traditionally prepared during religious festivals or for those following sattvic dietary practices.",
    usageInfo: "Mix with a little sesame oil or ghee and serve with rice, idli, or dosa. Can also be used as a stuffing for sandwiches or as a flavor enhancer for vegetable dishes.",
    nutritionalBenefits: [
      "High in healthy fats from peanuts",
      "Good source of plant-based protein",
      "Contains resveratrol, an antioxidant",
      "Rich in vitamin E and magnesium"
    ],
    allergyWarnings: [
      "Contains peanuts",
      "Processed in a facility that handles other nuts, wheat, and soy"
    ],
    pairingInfo: "Excellent with South Indian breakfast items like idli, dosa, and pongal. Also pairs well with plain rice or as a filling for stuffed paratha.",
    recipeIdeas: [
      "Peanut Rice Bowl",
      "Stuffed Dosa",
      "Spiced Vegetable Wraps",
      "Flavored Roti"
    ],
    image: mockImages.groundnutChutney, // Using placeholder
    region: "North Karnataka",
    state: "Karnataka",
    price: 14.99
  },
  {
    id: "groundnut-chutney-powder-with-garlic",
    name: "Groundnut Chutney Powder (with garlic)",
    slug: "groundnut-chutney-powder-with-garlic",
    description: "A robust, aromatic peanut-based powder enhanced with the distinct flavor of roasted garlic.",
    longDescription: "Our Groundnut Chutney Powder with garlic combines the rich nuttiness of roasted peanuts with the aromatic depth of garlic. This popular variant offers a more robust flavor profile that garlic lovers appreciate.",
    ingredients: [
      "Roasted Peanuts",
      "Garlic",
      "Red Chillies",
      "Curry Leaves",
      "Tamarind",
      "Jaggery",
      "Salt",
      "Asafoetida"
    ],
    culturalInfo: "This garlic-infused version is particularly popular in everyday home cooking across Karnataka and Andhra Pradesh. The addition of garlic not only enhances flavor but also adds nutritional benefits.",
    usageInfo: "Mix with sesame oil or ghee and serve with rice or as a condiment with idli, dosa, or vada. Can also be used as a flavor-packed crust for roasted vegetables.",
    nutritionalBenefits: [
      "Contains allicin from garlic, which has antimicrobial properties",
      "High in protein and healthy fats from peanuts",
      "Good source of antioxidants",
      "Provides essential minerals like magnesium and phosphorus"
    ],
    allergyWarnings: [
      "Contains peanuts",
      "Contains garlic",
      "Processed in a facility that handles other nuts, wheat, and soy"
    ],
    pairingInfo: "Particularly good with plain rice and ghee, dosa, idli, or mixed into yogurt rice. Also excellent as a flavor enhancer for roasted potatoes or vegetable stir-fries.",
    recipeIdeas: [
      "Spicy Peanut Rice",
      "Garlic Peanut Dosa",
      "Flavored Vegetable Stir-fry",
      "Spiced Potato Roast"
    ],
    image: mockImages.groundnutChutney,
    region: "North Karnataka",
    state: "Karnataka",
    price: 14.99
  },
  {
    id: "bisibele-bath-powder",
    name: "Bisibele-bath Powder",
    slug: "bisibele-bath-powder",
    description: "A complex, aromatic spice blend specially created for the traditional one-pot rice and lentil dish.",
    longDescription: "Our Bisibele-bath Powder is a carefully balanced blend of over 15 spices, creating the distinctive flavor profile that makes this Karnataka specialty so beloved. Each small-batch preparation ensures maximum freshness and flavor intensity.",
    ingredients: [
      "Coriander Seeds",
      "Chana Dal",
      "Urad Dal",
      "Dried Red Chillies",
      "Cinnamon",
      "Cloves",
      "Cardamom",
      "Fenugreek Seeds",
      "Mustard Seeds",
      "Black Pepper",
      "Cumin Seeds",
      "Asafoetida",
      "Curry Leaves"
    ],
    culturalInfo: "Bisibele-bath is a royal dish that originated in the kitchens of Mysore Palace. Its name literally means 'hot lentil rice dish' in Kannada. This one-pot meal is a staple at celebrations and gatherings throughout Karnataka.",
    usageInfo: "To prepare authentic Bisibele-bath, cook rice and toor dal together. In a separate pan, sauté vegetables and add tamarind extract, jaggery, and 2-3 teaspoons of our Bisibele-bath powder. Combine with the rice-dal mixture and finish with a tadka of ghee, cashews, and curry leaves.",
    nutritionalBenefits: [
      "Contains warming spices that aid digestion",
      "Rich in antioxidants from various spices",
      "Provides anti-inflammatory benefits",
      "Contains essential oils that support gut health"
    ],
    allergyWarnings: [
      "Contains various lentils",
      "May contain traces of nuts",
      "Processed in a facility that handles wheat and dairy products"
    ],
    pairingInfo: "Traditional Bisibele-bath is served with raita, papad, and a dollop of ghee on top. The spice blend can also be used to flavor other rice dishes for a unique twist.",
    recipeIdeas: [
      "Traditional Bisibele-bath",
      "Mixed Vegetable Bisibele-bath",
      "Quinoa Bisibele-bath (modern variation)",
      "Bisibele-bath Stuffed Tomatoes"
    ],
    image: mockImages.sambarPowder, // Using placeholder
    region: "South Karnataka",
    state: "Karnataka",
    price: 16.99
  },
  {
    id: "vangibath-powder",
    name: "Vangibath Powder",
    slug: "vangibath-powder",
    description: "A fragrant spice blend designed specifically for the popular eggplant rice dish of Karnataka.",
    longDescription: "Our Vangibath Powder combines carefully selected spices to create the signature flavor profile of this beloved Karnataka dish. The balanced blend enhances the natural flavors of eggplant while adding aromatic depth to the rice preparation.",
    ingredients: [
      "Coriander Seeds",
      "Chana Dal",
      "Urad Dal",
      "Dried Red Chillies",
      "Cinnamon",
      "Cloves",
      "Tamarind",
      "Curry Leaves",
      "Mustard Seeds",
      "Jaggery",
      "Asafoetida"
    ],
    culturalInfo: "Vangibath (eggplant rice) is a popular one-pot meal across Karnataka, especially for packed lunches and picnics. The dish showcases the versatility of eggplant in Indian cuisine and the importance of specialized spice blends in creating distinct flavor profiles.",
    usageInfo: "Sauté cubed eggplant with onions and tomatoes. Add 2-3 teaspoons of Vangibath powder and mix well. Combine with cooked rice, adjust seasoning, and finish with a tempering of mustard seeds, curry leaves, and peanuts.",
    nutritionalBenefits: [
      "Contains antioxidants from various spices",
      "Provides dietary fiber when used with eggplant",
      "Rich in essential oils that aid digestion",
      "Good source of minerals like iron and manganese"
    ],
    allergyWarnings: [
      "Contains various lentils",
      "May contain traces of peanuts",
      "Processed in a facility that handles wheat and soy"
    ],
    pairingInfo: "Traditionally served with raita, papad, and a side of potato chips. The spice blend can also be used to flavor other vegetable rice preparations.",
    recipeIdeas: [
      "Traditional Eggplant Vangibath",
      "Mixed Vegetable Vangibath",
      "Vangibath Stuffed Bell Peppers",
      "Vangibath Spiced Potato"
    ],
    image: mockImages.sambarPowder, // Using placeholder
    region: "Central Karnataka",
    state: "Karnataka",
    price: 15.99
  },
  {
    id: "methi-powder",
    name: "Methi Powder (Menthyada hittu)",
    slug: "methi-powder",
    description: "A unique blend centered around fenugreek seeds, known for their distinctive flavor and health benefits.",
    longDescription: "Our Methi Powder (Menthyada hittu) highlights the distinctive bitter-sweet flavor of fenugreek seeds, complemented by a careful selection of supporting spices. This traditional Karnataka blend is both a flavor enhancer and a powerhouse of health benefits.",
    ingredients: [
      "Fenugreek Seeds",
      "Cumin Seeds",
      "Coriander Seeds",
      "Black Pepper",
      "Dried Ginger",
      "Asafoetida",
      "Curry Leaves",
      "Turmeric"
    ],
    culturalInfo: "Methi (fenugreek) has been used in Indian cooking and traditional medicine for thousands of years. In Karnataka cuisine, this powder is particularly valued for both its culinary applications and its health benefits, especially for digestive health and lactating mothers.",
    usageInfo: "Use 1 teaspoon in vegetable preparations, especially with potatoes, peas, or greens. Can also be mixed with buttermilk or yogurt for a digestive drink. Sprinkle lightly over finished dishes for a nutritional boost.",
    nutritionalBenefits: [
      "Rich in iron and calcium",
      "Supports digestive health",
      "Known to help regulate blood sugar",
      "Traditionally used to enhance milk production in nursing mothers"
    ],
    allergyWarnings: [
      "May interact with blood thinning medications due to fenugreek content",
      "Processed in a facility that handles nuts, wheat, and soy"
    ],
    pairingInfo: "Pairs exceptionally well with potato dishes, leafy greens, and lentil preparations. Also excellent mixed into yogurt or buttermilk as a digestive aid.",
    recipeIdeas: [
      "Methi Aloo (Potatoes with Fenugreek)",
      "Methi Chapati",
      "Methi Buttermilk",
      "Methi Dal"
    ],
    image: mockImages.sambarPowder, // Using placeholder
    region: "North Karnataka",
    state: "Karnataka",
    price: 13.99
  },
  {
    id: "puliyogare-gojju",
    name: "Puliyogare Gojju",
    slug: "puliyogare-gojju",
    description: "A tangy, spiced tamarind paste used to make the popular South Indian tamarind rice.",
    longDescription: "Our Puliyogare Gojju is a concentrated paste combining tangy tamarind with roasted spices, peanuts, and sesame seeds. This ready-to-use paste makes preparing authentic tamarind rice (puliyogare) quick and convenient without compromising on traditional flavor.",
    ingredients: [
      "Tamarind Extract",
      "Roasted Peanuts",
      "Sesame Seeds",
      "Chana Dal",
      "Urad Dal",
      "Dried Red Chillies",
      "Asafoetida",
      "Curry Leaves",
      "Mustard Seeds",
      "Jaggery",
      "Salt",
      "Turmeric"
    ],
    culturalInfo: "Puliyogare (tamarind rice) is a temple food in Karnataka and Tamil Nadu, often distributed as prasadam at temples. The distinctive gojju paste is what gives this dish its complex flavor profile, balancing sourness, heat, sweetness, and nuttiness.",
    usageInfo: "Mix 2 tablespoons of gojju with 2 cups of cooked and cooled rice. Adjust quantities to taste. For enhanced flavor, add a tempering of mustard seeds, curry leaves, and cashews in hot ghee before serving.",
    nutritionalBenefits: [
      "Tamarind is rich in antioxidants and vitamin C",
      "Contains healthy fats from peanuts and sesame seeds",
      "Good source of plant protein",
      "Supports digestive health"
    ],
    allergyWarnings: [
      "Contains peanuts",
      "Contains sesame seeds",
      "Contains various lentils",
      "Processed in a facility that handles wheat and other tree nuts"
    ],
    pairingInfo: "Traditionally served with yogurt, papad, and a simple vegetable side dish. The paste can also be used as a base for other tamarind-centered dishes or as a tangy marinade.",
    recipeIdeas: [
      "Traditional Puliyogare",
      "Mixed Vegetable Tamarind Rice",
      "Puliyogare Stuffed Peppers",
      "Tamarind Rice Balls (for packed lunches)"
    ],
    image: mockImages.sambarPowder, // Using placeholder
    region: "South Karnataka",
    state: "Karnataka",
    price: 17.99
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductsByRegion = (region: string): Product[] => {
  return products.filter(product => product.region === region);
};

export const getProductsByState = (state: string): Product[] => {
  return products.filter(product => product.state === state);
};

export const getAllStates = (): string[] => {
  const states = products.map(product => product.state);
  return [...new Set(states)];
};

export const getRegionsByState = (state: string): string[] => {
  const regions = products
    .filter(product => product.state === state)
    .map(product => product.region);
  
  return [...new Set(regions)];
};
