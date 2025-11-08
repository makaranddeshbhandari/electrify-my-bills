import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity } from "lucide-react";

const Readings = () => {
  const readings = [
    { date: "2024-02-15", reading: 15430, units: 385 },
    { date: "2024-01-15", reading: 15045, units: 342 },
    { date: "2023-12-15", reading: 14703, units: 310 },
    { date: "2023-11-15", reading: 14393, units: 295 },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Meter Readings</h1>
          <p className="text-muted-foreground">View your electricity meter reading history</p>
        </div>

        <div className="space-y-4">
          {readings.map((reading, index) => (
            <Card
              key={reading.date}
              className="shadow-card hover:shadow-glow transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-electric-blue" />
                  {new Date(reading.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardTitle>
                <CardDescription>Reading Date: {new Date(reading.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-subtle p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Meter Reading</p>
                    <p className="text-2xl font-bold text-primary">{reading.reading}</p>
                  </div>
                  <div className="bg-gradient-subtle p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Units Consumed</p>
                    <p className="text-2xl font-bold text-electric-orange">{reading.units} kWh</p>
                  </div>
                  <div className="bg-gradient-subtle p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Previous Reading</p>
                    <p className="text-2xl font-bold">{reading.reading - reading.units}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Readings;
