import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
}

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
    } else {
      setReviews(data || []);
    }
  };

  const submitReview = async () => {
    if (!user) {
      toast.error("Please log in to submit a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!newReview.trim()) {
      toast.error("Please write a review");
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        product_id: productId,
        rating,
        comment: newReview.trim()
      });

    if (error) {
      console.error('Error submitting review:', error);
      toast.error("Failed to submit review. Please try again.");
    } else {
      toast.success("Review submitted successfully!");
      setNewReview("");
      setRating(0);
      fetchReviews();
    }
    
    setIsSubmitting(false);
  };

  const renderStars = (starRating: number, isInteractive = false) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= (isInteractive ? (hoveredRating || rating) : starRating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${isInteractive ? "cursor-pointer" : ""}`}
            onClick={isInteractive ? () => setRating(star) : undefined}
            onMouseEnter={isInteractive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={isInteractive ? () => setHoveredRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="mt-12 space-y-8">
      <div>
        <h3 className="text-2xl font-bold font-playfair text-spice-brown mb-4">
          Customer Reviews
        </h3>
        
        {reviews.length > 0 && (
          <div className="flex items-center mb-6">
            {renderStars(Math.round(averageRating))}
            <span className="ml-2 text-lg font-medium">
              {averageRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>

      {/* Write a Review */}
      {user ? (
        <div className="bg-spice-cream/30 p-6 rounded-lg">
          <h4 className="text-lg font-medium mb-4">Write a Review</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            {renderStars(rating, true)}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <Textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Share your experience with this product..."
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={submitReview}
            disabled={isSubmitting || rating === 0 || !newReview.trim()}
            className="bg-spice-red hover:bg-spice-red/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      ) : (
        <div className="bg-spice-cream/30 p-6 rounded-lg text-center">
          <p className="text-gray-600">Please log in to write a review</p>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="mt-3 bg-spice-red hover:bg-spice-red/90"
          >
            Log In
          </Button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-spice-turmeric/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-spice-brown" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;