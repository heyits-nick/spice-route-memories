
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
  image: string;
  region: string;
}

export const products: Product[] = [
  {
    id: "rasam-powder",
    name: "Traditional Rasam Powder",
    slug: "rasam-powder",
    description: "An aromatic blend perfect for making the quintessential South Indian soup that combines tartness with heat and spice.",
    longDescription: "Our signature Rasam Powder is crafted using a recipe passed down through four generations. This authentic blend captures the essence of Tamil Nadu's kitchens with its perfect balance of sourness, heat, and aromatic spices. The coarse texture ensures the flavors release slowly during cooking, resulting in that homemade taste that's impossible to find in commercial varieties.",
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
    culturalInfo: "Rasam is more than just a soup in Tamil Nadu—it's a remedy, a comfort food, and an essential dish at every meal. Traditionally served after a meal of rice and sambar, rasam aids digestion and is considered medicinal, especially during colds or fevers. In many homes, the recipe for rasam powder is a treasured family secret, adjusted over generations.",
    usageInfo: "To make authentic rasam, temper mustard seeds, curry leaves, and garlic in ghee. Add tomatoes, tamarind extract, and 1-2 teaspoons of rasam powder. Simmer until the flavors meld, then finish with fresh cilantro. Serve hot with rice or as a soothing soup.",
    image: mockImages.rasamPowder,
    region: "Tamil Nadu"
  },
  {
    id: "sambar-powder",
    name: "Traditional Sambar Powder",
    slug: "sambar-powder",
    description: "A rich, complex spice mix essential for creating the hearty lentil and vegetable stew beloved across South India.",
    longDescription: "Our Sambar Powder is carefully roasted and ground to create a deep, robust flavor profile that forms the backbone of a perfect sambar. Unlike store-bought varieties, our blend maintains the perfect balance between spicy, tangy, and savory notes, with none of the bitterness that comes from over-grinding. Each batch is prepared in small quantities to ensure maximum freshness and flavor.",
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
    culturalInfo: "Sambar is the cornerstone of South Indian cuisine, especially in Karnataka where it originated in the kitchen of the Maratha ruler Sambhaji. Each region has developed its distinct variation—from the more tamarind-heavy Tamil style to the coconut-infused Kerala version. In traditional homes, sambar is prepared fresh every morning, with its aroma filling the entire house.",
    usageInfo: "For authentic sambar, cook toor dal until soft. In a separate pan, sauté onions, tomatoes, and vegetables of choice. Add 2-3 teaspoons of sambar powder, tamarind extract, and the cooked dal. Simmer until vegetables are tender. Finish with a tempering of mustard seeds, curry leaves, and red chillies in hot oil.",
    image: mockImages.sambarPowder,
    region: "Karnataka"
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};
