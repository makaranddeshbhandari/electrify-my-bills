import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Zap, CheckCircle2 } from "lucide-react";
import { supabase, USERS_TABLE } from "@/lib/supabaseClient";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "aadhar" | "password">("details");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadhar: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep("aadhar");
  };

  const handleAadharVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.aadhar.length !== 12) {
      toast.error("Aadhar number must be 12 digits");
      return;
    }
    toast.success("Aadhar verified successfully!");
    setStep("password");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    // Check if email or phone already exists
    const { data: existingUser, error: lookupError } = await supabase
      .from(USERS_TABLE)
      .select("email, phone")
      .or(`email.eq."${formData.email}",phone.eq."${formData.phone}"`)
      .maybeSingle();

    if (lookupError) {
      toast.error("Unable to verify email/phone. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (existingUser) {
      if (existingUser.email === formData.email) {
        toast.error("Email already registered. Please use a different email.");
      } else if (existingUser.phone === formData.phone) {
        toast.error("Phone number already registered. Please use a different phone number.");
      } else {
        toast.error("Email or phone number already registered.");
      }
      setIsSubmitting(false);
      return;
    }

    // Generate unique user ID
    const userId = `EB${Math.floor(100000 + Math.random() * 900000)}`;

    // Insert user data into Supabase
    const { data, error } = await supabase
      .from(USERS_TABLE)
      .insert({
        user_id: userId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        aadhar: formData.aadhar,
        password: formData.password,
      })
      .select()
      .single();

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Store user data in localStorage for session
    localStorage.setItem("ebUser", JSON.stringify({
      userId: data.user_id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      aadhar: data.aadhar,
    }));

    toast.success(`Registration successful! Your User ID is ${userId}`);
    setIsSubmitting(false);
    navigate("/login", { state: { userId } });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-electric p-3 rounded-full shadow-glow">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Register for EB Billing</CardTitle>
          <CardDescription>Create your electricity billing account</CardDescription>
        </CardHeader>
        <CardContent>
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-electric">
                Continue to Aadhar Verification
              </Button>
            </form>
          )}

          {step === "aadhar" && (
            <form onSubmit={handleAadharVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number</Label>
                <Input
                  id="aadhar"
                  name="aadhar"
                  type="text"
                  maxLength={12}
                  value={formData.aadhar}
                  onChange={handleInputChange}
                  placeholder="Enter 12-digit Aadhar number"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  We'll verify your Aadhar for identity confirmation
                </p>
              </div>
              <Button type="submit" className="w-full bg-primary">
                Verify Aadhar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep("details")}
              >
                Back
              </Button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-700">Aadhar Verified Successfully</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-electric" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Complete Registration"}
              </Button>
            </form>
          )}

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
