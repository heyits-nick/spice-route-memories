
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";

export type ProductSize = "trial" | "full";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: ProductSize;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  cart: [],
  subtotal: 0,
  discount: 0,
  total: 0,
};

// Load cart from localStorage
const loadCart = (): CartState => {
  const savedCart = localStorage.getItem("spiceCart");
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return initialState;
};

// Calculate totals and apply discounts
const calculateTotals = (cart: CartItem[]): Pick<CartState, "subtotal" | "discount" | "total"> => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Apply "Buy 2 Get 1 Free" discount for trial packs
  let discount = 0;
  
  // Group items by product to count how many trial packs of each product we have
  const trialPacksByProduct: Record<string, number> = {};
  
  cart.forEach(item => {
    if (item.size === "trial") {
      if (!trialPacksByProduct[item.id]) {
        trialPacksByProduct[item.id] = 0;
      }
      trialPacksByProduct[item.id] += item.quantity;
    }
  });
  
  // Calculate discount based on the number of trial packs
  Object.values(trialPacksByProduct).forEach(quantity => {
    if (quantity >= 3) {
      const freeItems = Math.floor(quantity / 3);
      // Find the price of a trial pack for this product
      const trialPackPrice = cart.find(item => item.size === "trial")?.price || 0;
      discount += freeItems * trialPackPrice;
    }
  });
  
  const total = subtotal - discount;
  
  return { subtotal, discount, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newCart: CartItem[];
  
  switch (action.type) {
    case "ADD_ITEM":
      // Check if the item already exists in the cart
      const existingItem = state.cart.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );
      
      if (existingItem) {
        // Update quantity if item exists
        newCart = state.cart.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item
        newCart = [...state.cart, action.payload];
      }
      break;
      
    case "REMOVE_ITEM":
      newCart = state.cart.filter(item => `${item.id}-${item.size}` !== action.payload);
      break;
      
    case "UPDATE_QUANTITY":
      newCart = state.cart.map(item =>
        `${item.id}-${item.size}` === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      break;
      
    case "CLEAR_CART":
      newCart = [];
      break;
      
    default:
      return state;
  }
  
  // Calculate new totals
  const totals = calculateTotals(newCart);
  
  return {
    cart: newCart,
    ...totals,
  };
};

interface CartContextProps {
  cart: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: ProductSize) => void;
  updateQuantity: (id: string, size: ProductSize, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadCart);
  
  // Save to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("spiceCart", JSON.stringify(state));
  }, [state]);
  
  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    toast.success(`Added ${item.name} to cart!`);
  };
  
  const removeItem = (id: string, size: ProductSize) => {
    dispatch({ type: "REMOVE_ITEM", payload: `${id}-${size}` });
  };
  
  const updateQuantity = (id: string, size: ProductSize, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: `${id}-${size}`, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        subtotal: state.subtotal,
        discount: state.discount,
        total: state.total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
