import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Receipt, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Bill {
  id: string;
  billNo: string;
  userId: string;
  connectionType: string;
  readingDate: string;
  units: number;
  amount: number;
  status: "unpaid" | "paid";
}

const PayBills = () => {
  const user = JSON.parse(localStorage.getItem("ebUser") || "{}");
  const [bills, setBills] = useState<Bill[]>([
    {
      id: "1",
      billNo: "EB2024001",
      userId: user.userId || "EB123456",
      connectionType: "Domestic",
      readingDate: "2024-01-15",
      units: 342,
      amount: 2450,
      status: "unpaid",
    },
    {
      id: "2",
      billNo: "EB2024002",
      userId: user.userId || "EB123456",
      connectionType: "Domestic",
      readingDate: "2024-02-15",
      units: 385,
      amount: 2780,
      status: "unpaid",
    },
  ]);

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handlePayNow = (bill: Bill) => {
    setSelectedBill(bill);
    setShowPaymentDialog(true);
  };

  const handlePayment = () => {
    if (selectedBill) {
      // Simulate payment success
      setBills(bills.map(b => 
        b.id === selectedBill.id ? { ...b, status: "paid" as const } : b
      ));
      
      // Store in payment history
      const history = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
      history.push({
        ...selectedBill,
        status: "paid",
        paidDate: new Date().toISOString(),
      });
      localStorage.setItem("paymentHistory", JSON.stringify(history));
      
      toast.success("Payment successful!");
      setShowPaymentDialog(false);
      setSelectedBill(null);
    }
  };

  const downloadReceipt = (bill: Bill) => {
    toast.success("Receipt downloaded successfully");
  };

  const unpaidBills = bills.filter(b => b.status === "unpaid");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Pay Your Bills</h1>
          <p className="text-muted-foreground">
            {unpaidBills.length} unpaid bill{unpaidBills.length !== 1 ? 's' : ''} pending
          </p>
        </div>

        {unpaidBills.length === 0 ? (
          <Card className="shadow-card text-center py-12">
            <CardContent>
              <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Pending Bills</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {unpaidBills.map((bill, index) => (
              <Card
                key={bill.id}
                className="shadow-card hover:shadow-glow transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Bill #{bill.billNo}
                        <Badge variant="destructive">Unpaid</Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Reading Date: {new Date(bill.readingDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{bill.amount}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">User ID</p>
                      <p className="font-semibold">{bill.userId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Connection Type</p>
                      <p className="font-semibold">{bill.connectionType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Units Consumed</p>
                      <p className="font-semibold">{bill.units} kWh</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rate</p>
                      <p className="font-semibold">₹{(bill.amount / bill.units).toFixed(2)}/kWh</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handlePayNow(bill)}
                    className="w-full bg-gradient-electric"
                  >
                    Pay Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Review your bill details before proceeding to payment
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="bg-gradient-subtle p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bill Number:</span>
                  <span className="font-semibold">{selectedBill.billNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Units Consumed:</span>
                  <span className="font-semibold">{selectedBill.units} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reading Date:</span>
                  <span className="font-semibold">
                    {new Date(selectedBill.readingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold text-primary">₹{selectedBill.amount}</span>
                </div>
              </div>
              <Button
                onClick={handlePayment}
                className="w-full bg-gradient-electric"
              >
                Click Here to Pay
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayBills;
