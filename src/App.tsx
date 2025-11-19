import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PayBills from "./pages/PayBills";
import PastBills from "./pages/PastBills";
import BillingMath from "./pages/BillingMath";
import Readings from "./pages/Readings";
import Apply from "./pages/Apply";
import UpdateInfo from "./pages/UpdateInfo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pay-bills"
            element={
              <ProtectedRoute>
                <PayBills />
              </ProtectedRoute>
            }
          />
          <Route
            path="/past-bills"
            element={
              <ProtectedRoute>
                <PastBills />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing-math"
            element={
              <ProtectedRoute>
                <BillingMath />
              </ProtectedRoute>
            }
          />
          <Route
            path="/readings"
            element={
              <ProtectedRoute>
                <Readings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <Apply />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-info"
            element={
              <ProtectedRoute>
                <UpdateInfo />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
