import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Receipt, Calculator, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("ebUser") || "{}");

  const stats = [
    {
      title: "Current Month Usage",
      value: "342 kWh",
      icon: Zap,
      color: "text-electric-blue",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Bills",
      value: "2",
      icon: Receipt,
      color: "text-electric-orange",
      bgColor: "bg-orange-50",
    },
    {
      title: "Last Payment",
      value: "₹2,450",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg. Daily Usage",
      value: "11.4 kWh",
      icon: TrendingUp,
      color: "text-electric-yellow",
      bgColor: "bg-yellow-50",
    },
  ];

  const quickActions = [
    { title: "Pay Bills", path: "/pay-bills", icon: Receipt, color: "bg-gradient-electric" },
    { title: "View Past Bills", path: "/past-bills", icon: Clock, color: "bg-primary" },
    { title: "Billing Calculator", path: "/billing-math", icon: Calculator, color: "bg-accent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.firstName || "User"}!
          </h1>
          <p className="text-muted-foreground">
            User ID: <span className="font-semibold">{user.userId}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="shadow-card hover:shadow-glow transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link key={action.path} to={action.path}>
              <Card
                className="shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <CardHeader>
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>Quick access to {action.title.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Open
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: "700ms" }}>
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Your electricity consumption trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2 p-4 bg-gradient-subtle rounded-lg">
              {[280, 310, 295, 342, 320, 350, 342].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-electric rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${(value / 400) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
