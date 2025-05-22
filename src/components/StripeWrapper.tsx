
import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

// Replace with your publishable key
const stripePromise = loadStripe("pk_test_placeholder");

interface StripeWrapperProps {
  children: ReactNode;
}

const StripeWrapper = ({ children }: StripeWrapperProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
