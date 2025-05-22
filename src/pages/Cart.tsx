
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, ProductSize } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart, ArrowRight, Check, LogIn } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { cart, subtotal, discount, total, removeItem, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleQuantityChange = (id: string, size: ProductSize, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, size, quantity);
  };

  const handleCheckout = () => {
    if (!user) {
      // If user is not logged in, redirect to auth page
      // Store the current path to redirect back after login
      sessionStorage.setItem("redirectPath", "/checkout");
      navigate("/auth");
      return;
    }
    
    // If user is logged in, proceed to checkout
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-8">
            <div className="h-24 w-24 bg-spice-cream rounded-full mx-auto flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-spice-brown" />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-playfair text-spice-brown mb-4">Your cart is empty</h1>
          <p className="text-gray-700 mb-6">
            Looks like you haven't added any masalas to your cart yet.
          </p>
          <Link 
            to="/products" 
            className="btn-primary inline-flex items-center"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-playfair text-spice-brown mb-8">
            Your Shopping Cart
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left pb-4 font-medium text-gray-600">Product</th>
                        <th className="text-center pb-4 font-medium text-gray-600">Quantity</th>
                        <th className="text-right pb-4 font-medium text-gray-600">Price</th>
                        <th className="text-right pb-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={`${item.id}-${item.size}`} className="border-b border-gray-100 last:border-0">
                          <td className="py-4">
                            <div className="flex items-center">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded mr-4"
                              />
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <div className="text-sm text-gray-500">
                                  {item.size === "trial" ? "100g Trial Pack" : "1kg Full Size"}
                                </div>
                                <div className="text-sm font-medium">${item.price}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-l border border-gray-300 bg-gray-50"
                              >
                                -
                              </button>
                              <input 
                                type="text" 
                                value={item.quantity}
                                readOnly
                                className="h-8 w-10 text-center border-t border-b border-gray-300"
                              />
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-r border border-gray-300 bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4 text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="text-gray-500 hover:text-spice-red transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Link 
                  to="/products" 
                  className="text-spice-brown hover:text-spice-red transition-colors inline-flex items-center"
                >
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold font-playfair text-spice-brown mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
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
                    
                    <Separator />
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${(total >= 35 ? total : total + 5).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {discount > 0 && (
                    <div className="mt-4 bg-spice-cream/30 p-3 rounded-lg">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-spice-red flex-shrink-0 mt-0.5 mr-2" />
                        <p className="text-sm">
                          <span className="font-semibold">Special offer applied:</span> Buy 2 trial packs, get 1 free!
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-spice-red hover:bg-spice-red/90 text-white py-6"
                  >
                    {!user ? (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In to Checkout
                      </>
                    ) : (
                      <>Proceed to Checkout</>
                    )}
                  </Button>
                  
                  <div className="mt-4 text-center text-xs text-gray-500">
                    Secure checkout and payment
                  </div>
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

export default Cart;
