
import { createContext, useContext, useState } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface OrderContextProps {
  createOrder: (shippingAddress: ShippingAddress, paymentIntentId?: string) => Promise<string | null>;
  updateOrderStatus: (orderId: string, status: string, paymentIntentId?: string) => Promise<void>;
  isProcessing: boolean;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { cart, subtotal, discount, total, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = async (shippingAddress: ShippingAddress, paymentIntentId?: string): Promise<string | null> => {
    if (!user) {
      toast.error("You must be logged in to create an order");
      return null;
    }
    
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return null;
    }
    
    setIsProcessing(true);
    
    try {
      // Calculate the final total including shipping
      const finalTotal = total >= 35 ? total : total + 5;
      
      // Create the order in the database
      // Convert the ShippingAddress to a regular object so it can be stored as JSONB
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total: finalTotal,
          payment_intent_id: paymentIntentId || null,
          shipping_address: shippingAddress as any, // Cast to any to avoid type issues with JSONB
          status: "pending"
        })
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // Create order items for each item in the cart
      const orderItems = cart.map((item: CartItem) => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        product_size: item.size,
      }));
      
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      return orderData.id;
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  const updateOrderStatus = async (orderId: string, status: string, paymentIntentId?: string) => {
    try {
      const updates: any = { status };
      if (paymentIntentId) {
        updates.payment_intent_id = paymentIntentId;
      }
      
      const { error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", orderId);
        
      if (error) throw error;
      
      if (status === "completed") {
        clearCart();
        toast.success("Order completed successfully!");
      }
    } catch (error: any) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };
  
  return (
    <OrderContext.Provider 
      value={{
        createOrder,
        updateOrderStatus,
        isProcessing
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
