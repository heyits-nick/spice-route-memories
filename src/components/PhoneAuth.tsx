
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, Phone, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PhoneAuthProps {
  onSuccess: () => void;
}

const PhoneAuth = ({ onSuccess }: PhoneAuthProps) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("OTP sent to your phone!");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message || "Error sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: 'sms',
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Successfully logged in!");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Error verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setStep("phone");
    setOtp("");
  };

  if (step === "otp") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-spice-red mb-4" />
          <h2 className="text-2xl font-bold text-spice-brown font-playfair">
            Enter Verification Code
          </h2>
          <p className="text-gray-600 mt-2">
            We sent a 6-digit code to {phone}
          </p>
        </div>

        <form onSubmit={verifyOTP} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-center block">
              Verification Code
            </Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full bg-spice-red hover:bg-spice-red/90"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Verify & Login
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={goBack}
              disabled={isLoading}
            >
              Change Phone Number
            </Button>
          </div>
        </form>

        <div className="text-center">
          <Button
            type="button"
            variant="ghost"
            className="text-spice-red hover:text-spice-red/90"
            onClick={sendOTP}
            disabled={isLoading}
          >
            Resend Code
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Phone className="mx-auto h-12 w-12 text-spice-red mb-4" />
        <h2 className="text-2xl font-bold text-spice-brown font-playfair">
          Sign In with Phone
        </h2>
        <p className="text-gray-600 mt-2">
          Enter your phone number to receive a verification code
        </p>
      </div>

      <form onSubmit={sendOTP} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="text-center"
          />
          <p className="text-xs text-gray-500 text-center">
            Include country code (e.g., +1 for US)
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-spice-red hover:bg-spice-red/90"
          disabled={isLoading || !phone}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MessageSquare className="mr-2 h-4 w-4" />
          )}
          Send Verification Code
        </Button>
      </form>
    </div>
  );
};

export default PhoneAuth;
