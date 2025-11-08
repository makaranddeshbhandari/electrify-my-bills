import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Receipt, Calculator, Shield, Clock, CheckCircle2 } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Receipt,
      title: "Easy Bill Payments",
      description: "Pay your electricity bills securely with just a few clicks",
    },
    {
      icon: Calculator,
      title: "Bill Calculator",
      description: "Estimate your bills before they arrive with our smart calculator",
    },
    {
      icon: Clock,
      title: "Payment History",
      description: "Track all your past payments and download receipts anytime",
    },
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "Aadhar-verified accounts with secure authentication",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-electric bg-clip-text text-transparent">
            EB Billing System
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Manage your electricity bills effortlessly. Pay online, track consumption, and stay in control of your energy usage.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-electric text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="shadow-card hover:shadow-glow transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="bg-gradient-subtle w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Why Choose Our EB Billing System?</CardTitle>
            <CardDescription>Everything you need to manage your electricity bills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Quick & Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Fast payments with bank-level security and Aadhar verification
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-electric-blue" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Instant bill notifications and payment confirmations
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="h-8 w-8 text-electric-orange" />
                </div>
                <h3 className="font-semibold mb-2">Complete History</h3>
                <p className="text-sm text-muted-foreground">
                  Access all your bills and receipts in one place
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
