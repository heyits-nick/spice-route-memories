import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Package, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  status: string;
  total: number;
  created_at: string;
  order_items: {
    product_name: string;
    product_size: string;
    quantity: number;
    price: number;
  }[];
}

interface Review {
  id: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

const Profile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          id,
          status,
          total,
          created_at,
          order_items (
            product_name,
            product_size,
            quantity,
            price
          )
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (reviewsError) throw reviewsError;

      setOrders(ordersData || []);
      setReviews(reviewsData || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error",
        description: "Failed to load your profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-spice-brown"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-playfair text-spice-brown">
              My Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {profile?.first_name || "User"}!
            </p>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                My Orders ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                My Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              {orders.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                    <Button onClick={() => navigate("/products")}>
                      Browse Products
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              Order #{order.id.slice(0, 8)}
                            </CardTitle>
                            <CardDescription>
                              {formatDate(order.created_at)}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                            <p className="text-lg font-semibold mt-1">
                              {formatCurrency(order.total)}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {order.order_items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{item.product_name}</p>
                                <p className="text-sm text-gray-600">
                                  Size: {item.product_size} • Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              {reviews.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No reviews yet</h3>
                    <p className="text-gray-600 mb-4">Share your experience with our products</p>
                    <Button onClick={() => navigate("/products")}>
                      Browse Products
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Product Review</CardTitle>
                            <CardDescription>
                              {formatDate(review.created_at)}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {review.comment && (
                          <p className="text-gray-700">{review.comment}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;