
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const orderId = location.state?.orderId;

  useEffect(() => {
    // If no order ID is provided, redirect to home
    if (!orderId) {
      navigate("/");
      return;
    }

    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .eq("user_id", user?.id)
          .single();
          
        if (orderError || !orderData) {
          throw new Error("Order not found");
        }
        
        setOrder(orderData);
        
        // Fetch order items
        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", orderId);
          
        if (itemsError) {
          throw new Error("Failed to fetch order items");
        }
        
        setOrderItems(itemsData || []);
      } catch (error) {
        console.error("Error fetching order:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate, user?.id]);

  if (isLoading || !order) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-32 w-32 mx-auto bg-gray-200 rounded-full mb-6"></div>
            <div className="h-8 bg-gray-200 max-w-md mx-auto rounded mb-4"></div>
            <div className="h-4 bg-gray-200 max-w-sm mx-auto rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-green-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold font-playfair text-spice-brown mb-2">
              Order Confirmed!
            </h1>
            
            <p className="text-gray-600">
              Thank you for your order. Your spices are on the way!
            </p>
            
            <p className="mt-2 text-sm font-medium">
              Order #{orderId.substring(0, 8)}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-gray-500">
                          {item.product_size === "trial" ? "100g Trial Pack" : "1kg Full Size"} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${(order.total - (order.total >= 35 ? 0 : 5)).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.total >= 35 ? "Free" : "$5.00"}</span>
                </div>
                
                <div className="flex justify-between font-bold mt-4">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p>{order.shipping_address.fullName}</p>
                <p>{order.shipping_address.addressLine1}</p>
                {order.shipping_address.addressLine2 && <p>{order.shipping_address.addressLine2}</p>}
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postalCode}
                </p>
                <p>{order.shipping_address.country}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/products">
              <Button className="bg-spice-turmeric hover:bg-spice-turmeric/90 text-black">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
