import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Receipt } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const PastBills = () => {
  const paymentHistory = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
  const [expandedBill, setExpandedBill] = useState<string | null>(null);

  const downloadReceipt = (billNo: string) => {
    toast.success(`Receipt for ${billNo} downloaded`);
  };

  const allBills = [
    ...paymentHistory,
    {
      id: "3",
      billNo: "EB2023012",
      userId: "EB123456",
      connectionType: "Domestic",
      readingDate: "2023-12-15",
      units: 310,
      amount: 2200,
      status: "paid",
      paidDate: "2023-12-20",
    },
    {
      id: "4",
      billNo: "EB2023011",
      userId: "EB123456",
      connectionType: "Domestic",
      readingDate: "2023-11-15",
      units: 295,
      amount: 2100,
      status: "paid",
      paidDate: "2023-11-18",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Billing History</h1>
          <p className="text-muted-foreground">
            View all your past electricity bills and payment records
          </p>
        </div>

        {allBills.length === 0 ? (
          <Card className="shadow-card text-center py-12">
            <CardContent>
              <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Bill History</h3>
              <p className="text-muted-foreground">Your bill history will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {allBills.map((bill, index) => (
              <Card
                key={bill.id}
                className="shadow-card hover:shadow-glow transition-all duration-300 animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setExpandedBill(expandedBill === bill.id ? null : bill.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Bill #{bill.billNo}
                        <Badge
                          variant={bill.status === "paid" ? "default" : "destructive"}
                          className={bill.status === "paid" ? "bg-green-600" : ""}
                        >
                          {bill.status === "paid" ? "Paid" : "Unpaid"}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Reading Date: {new Date(bill.readingDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{bill.amount}</div>
                      {bill.status === "paid" && bill.paidDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Paid on {new Date(bill.paidDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

                  {expandedBill === bill.id && bill.status === "paid" && (
                    <div className="mt-4 pt-4 border-t animate-slide-up">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadReceipt(bill.billNo);
                        }}
                        variant="outline"
                        className="w-full gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Receipt
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastBills;
