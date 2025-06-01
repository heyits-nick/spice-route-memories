import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ShieldCheck, CreditCard, Check } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, subtotal, discount, total } = useCart();
  const { user, profile } = useAuth();
  const { createOrder, updateOrderStatus, isProcessing } = useOrder();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : "",
    email: user?.email || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
  });
  
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("shipping");

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab("payment");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setPaymentError("Payment form not loaded. Please refresh and try again.");
      return;
    }
    
    setIsPaymentProcessing(true);
    setPaymentError(null);
    
    try {
      // Create an order first
      const orderId = await createOrder(shippingDetails);
      
      if (!orderId) {
        throw new Error("Failed to create order");
      }
      
      // Process payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        'client_secret_placeholder', // This would normally be obtained from your backend
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: shippingDetails.fullName,
              address: {
                line1: shippingDetails.addressLine1,
                line2: shippingDetails.addressLine2 || undefined,
                city: shippingDetails.city,
                state: shippingDetails.state,
                postal_code: shippingDetails.postalCode,
                country: shippingDetails.country,
              },
              phone: shippingDetails.phone,
              email: shippingDetails.email,
            },
          },
        }
      );
      
      if (error) {
        setPaymentError(error.message || "Payment failed");
        await updateOrderStatus(orderId, "failed");
      } else if (paymentIntent) {
        await updateOrderStatus(orderId, "completed", paymentIntent.id);
        toast.success("Order placed successfully!");
        navigate("/order-confirmation", { state: { orderId } });
      }
    } catch (err: any) {
      setPaymentError(err.message || "An unexpected error occurred");
    } finally {
      setIsPaymentProcessing(false);
    }
  };
  
  // For demo purposes only - skip real payment processing
  const handleDemoSubmit = async () => {
    setIsPaymentProcessing(true);
    
    try {
      // Create an order
      const orderId = await createOrder(shippingDetails, "demo_payment_123");
      
      if (orderId) {
        // Update order status to completed
        await updateOrderStatus(orderId, "completed", "demo_payment_123");
        toast.success("Order placed successfully!");
        navigate("/order-confirmation", { state: { orderId } });
      } else {
        throw new Error("Failed to create order");
      }
    } catch (err: any) {
      setPaymentError(err.message || "An unexpected error occurred");
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div>
      <Navbar />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-playfair text-spice-brown mb-8">
            Checkout
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="shipping" className="flex-1">
                      <span className="flex items-center">
                        1. Shipping Details
                        {activeTab === "payment" && <Check className="ml-2 h-4 w-4 text-green-500" />}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="flex-1" disabled={activeTab === "shipping"}>
                      2. Payment
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="p-6">
                    <TabsContent value="shipping">
                      <form onSubmit={handleShippingSubmit} className="space-y-6">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={shippingDetails.fullName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={shippingDetails.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="addressLine1">Address Line 1</Label>
                          <Input
                            id="addressLine1"
                            name="addressLine1"
                            value={shippingDetails.addressLine1}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                          <Input
                            id="addressLine2"
                            name="addressLine2"
                            value={shippingDetails.addressLine2}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={shippingDetails.city}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              name="state"
                              value={shippingDetails.state}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                              id="postalCode"
                              name="postalCode"
                              value={shippingDetails.postalCode}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              value={shippingDetails.country}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={shippingDetails.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-spice-red hover:bg-spice-red/90"
                        >
                          Continue to Payment
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="payment">
                      <div className="mb-6">
                        <h3 className="font-medium text-lg mb-2">Shipping to:</h3>
                        <p>{shippingDetails.fullName}</p>
                        <p>{shippingDetails.email}</p>
                        <p>{shippingDetails.addressLine1}</p>
                        {shippingDetails.addressLine2 && <p>{shippingDetails.addressLine2}</p>}
                        <p>
                          {shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}
                        </p>
                        <p>{shippingDetails.country}</p>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setActiveTab("shipping")}
                        >
                          Edit
                        </Button>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <form onSubmit={handlePaymentSubmit} className="space-y-6">
                        <div>
                          <Label htmlFor="card-element">Credit Card</Label>
                          <div className="mt-1 border rounded-md p-3">
                            <div className="flex items-center justify-center py-4 px-3 bg-gray-50 text-sm">
                              <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                              <span>Credit Card Input Placeholder (Stripe)</span>
                            </div>
                            {/* In a real implementation, this would be: */}
                            {/* <CardElement 
                              id="card-element"
                              options={{
                                style: {
                                  base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                      color: '#aab7c4',
                                    },
                                  },
                                  invalid: {
                                    color: '#9e2146',
                                  },
                                },
                              }}
                            /> */}
                          </div>
                        </div>
                        
                        {paymentError && (
                          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                            {paymentError}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-gray-600">
                            Your payment information is secure
                          </span>
                        </div>
                        
                        {/* Using demo button for now instead of real payment processing */}
                        <Button 
                          type="button" 
                          onClick={handleDemoSubmit}
                          disabled={isPaymentProcessing || isProcessing}
                          className="w-full bg-spice-red hover:bg-spice-red/90"
                        >
                          {(isPaymentProcessing || isProcessing) ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>Complete Purchase</>
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
            
            {/* Order summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold font-playfair text-spice-brown mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-1">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between py-2">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.size === "trial" ? "100g Trial Pack" : "1kg Full Size"} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-spice-red">
                      <span>Discount (Buy 2 Get 1 Free)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{total >= 35 ? "Free" : "$5.00"}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(total >= 35 ? total : total + 5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
