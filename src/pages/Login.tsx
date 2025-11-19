import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Zap } from "lucide-react";
import { supabase, USERS_TABLE } from "@/lib/supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const recentlyRegisteredId = (location.state as { userId?: string } | null)?.userId;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const identifier = formData.identifier.trim();

    // Query Supabase - login by email or user_id
    const { data: user, error } = await supabase
      .from(USERS_TABLE)
      .select("user_id, first_name, last_name, email, phone, aadhar, password")
      .or(`email.eq."${identifier}",user_id.eq."${identifier}"`)
      .maybeSingle();

    if (error) {
      toast.error(error.message || "Unable to sign in right now.");
      setIsLoading(false);
      return;
    }

    if (!user || user.password !== formData.password) {
      toast.error("Invalid credentials");
      setIsLoading(false);
      return;
    }

    // Store authentication and user data
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("ebUserId", user.user_id);
    localStorage.setItem("ebUser", JSON.stringify({
      userId: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      aadhar: user.aadhar,
    }));

    toast.success("Login successful!");
    setIsLoading(false);
    navigate("/dashboard");
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
          {recentlyRegisteredId && (
            <div className="mb-4 rounded-md border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
              Registration complete! Your User ID is <span className="font-semibold">{recentlyRegisteredId}</span>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">User ID or Email</Label>
              <Input
                id="identifier"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                placeholder="EB123456 or user@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

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
