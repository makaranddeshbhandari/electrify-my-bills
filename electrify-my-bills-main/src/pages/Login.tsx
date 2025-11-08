import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Zap } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [otpData, setOtpData] = useState({ userId: "", phone: "", otp: "" });
  const [passwordData, setPasswordData] = useState({ userId: "", password: "" });
  const [otpSent, setOtpSent] = useState(false);

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      // Simulate sending OTP
      if (!otpData.userId || !otpData.phone) {
        toast.error("Please enter User ID and Phone Number");
        return;
      }
      setOtpSent(true);
      toast.success("OTP sent to your phone!");
      return;
    }
    
    // Verify OTP (simplified)
    if (otpData.otp === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid OTP. Try 123456 for demo");
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("ebUser");
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (passwordData.userId === user.userId && passwordData.password === user.password) {
        localStorage.setItem("isAuthenticated", "true");
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } else {
      toast.error("User not found. Please register first.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-electric p-3 rounded-full shadow-glow animate-glow-pulse">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">EB Billing Login</CardTitle>
          <CardDescription>Access your electricity billing account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="otp" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="otp">Login with OTP</TabsTrigger>
              <TabsTrigger value="password">Login with Password</TabsTrigger>
            </TabsList>
            
            <TabsContent value="otp" className="space-y-4">
              <form onSubmit={handleOtpLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId-otp">User ID</Label>
                  <Input
                    id="userId-otp"
                    value={otpData.userId}
                    onChange={(e) => setOtpData({ ...otpData, userId: e.target.value })}
                    placeholder="EB123456"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    value={otpData.phone}
                    onChange={(e) => setOtpData({ ...otpData, phone: e.target.value })}
                    placeholder="Enter registered phone"
                    required
                  />
                </div>
                {otpSent && (
                  <div className="space-y-2 animate-slide-up">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      maxLength={6}
                      value={otpData.otp}
                      onChange={(e) => setOtpData({ ...otpData, otp: e.target.value })}
                      placeholder="Enter 6-digit OTP"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Demo: Use OTP <span className="font-semibold">123456</span>
                    </p>
                  </div>
                )}
                <Button type="submit" className="w-full bg-gradient-electric">
                  {otpSent ? "Verify OTP" : "Send OTP"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="password" className="space-y-4">
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId-password">User ID</Label>
                  <Input
                    id="userId-password"
                    value={passwordData.userId}
                    onChange={(e) => setPasswordData({ ...passwordData, userId: e.target.value })}
                    placeholder="EB123456"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={passwordData.password}
                    onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary">
                  Login
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Register now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
