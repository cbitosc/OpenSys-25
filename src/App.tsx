import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MazeriftRegistration from "./pages/MazeRift";
import DecipherRegistration from "./pages/Decipher";
import OdysseyRegistration from "./pages/Odyssey";

// Scroll restoration component
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" 
    });
  }, [location.pathname]); 

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop /> {/* Add the scroll restoration component */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register/mazerift" element={<MazeriftRegistration />} />
          <Route path="/register/decipher" element={<DecipherRegistration />} />
          <Route path="/register/odyssey" element={<OdysseyRegistration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;