import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Zap } from "lucide-react";

const BillingMath = () => {
  const [units, setUnits] = useState<number>(0);

  const calculateBill = (units: number): number => {
    let total = 0;
    
    // Tiered pricing structure (example rates)
    if (units <= 100) {
      total = units * 3.5;
    } else if (units <= 200) {
      total = 100 * 3.5 + (units - 100) * 4.5;
    } else if (units <= 400) {
      total = 100 * 3.5 + 100 * 4.5 + (units - 200) * 6.0;
    } else {
      total = 100 * 3.5 + 100 * 4.5 + 200 * 6.0 + (units - 400) * 8.0;
    }
    
    // Add fixed charges
    const fixedCharges = 50;
    total += fixedCharges;
    
    return Math.round(total);
  };

  const bill = calculateBill(units);
  const avgRate = units > 0 ? (bill / units).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Billing Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your electricity bill based on units consumed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Enter Consumption
              </CardTitle>
              <CardDescription>Input the number of units (kWh) consumed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="units">Units Consumed (kWh)</Label>
                <Input
                  id="units"
                  type="number"
                  min="0"
                  value={units || ""}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  placeholder="Enter units"
                  className="text-lg"
                />
              </div>

              <div className="bg-gradient-subtle p-6 rounded-lg space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Estimated Bill Amount</p>
                  <div className="text-4xl font-bold text-primary bg-gradient-electric bg-clip-text text-transparent">
                    ₹{bill}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Units</p>
                    <p className="text-lg font-semibold">{units} kWh</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Avg Rate</p>
                    <p className="text-lg font-semibold">₹{avgRate}/kWh</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-electric-yellow" />
                Rate Structure
              </CardTitle>
              <CardDescription>Tiered pricing for domestic connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-subtle rounded-lg">
                  <span className="font-medium">0 - 100 kWh</span>
                  <span className="text-primary font-semibold">₹3.50/kWh</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-subtle rounded-lg">
                  <span className="font-medium">101 - 200 kWh</span>
                  <span className="text-primary font-semibold">₹4.50/kWh</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-subtle rounded-lg">
                  <span className="font-medium">201 - 400 kWh</span>
                  <span className="text-primary font-semibold">₹6.00/kWh</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-subtle rounded-lg">
                  <span className="font-medium">Above 400 kWh</span>
                  <span className="text-primary font-semibold">₹8.00/kWh</span>
                </div>
                <div className="flex justify-between items-center p-3 border-t border-border mt-4">
                  <span className="font-medium">Fixed Charges</span>
                  <span className="text-primary font-semibold">₹50.00</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> The final bill includes fixed charges and applicable taxes.
                  Rates may vary based on your connection type and location.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingMath;
