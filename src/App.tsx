
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import StripeWrapper from "@/components/StripeWrapper";
import RequireAuth from "@/components/RequireAuth";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import OurStory from "./pages/OurStory";
import Deals from "./pages/Deals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <StripeWrapper>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/checkout" element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  } />
                  <Route path="/order-confirmation" element={
                    <RequireAuth>
                      <OrderConfirmation />
                    </RequireAuth>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </StripeWrapper>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
