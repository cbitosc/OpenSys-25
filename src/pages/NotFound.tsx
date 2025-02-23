import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sora flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="inline-block mb-4">
          <AlertCircle className="w-16 h-16 text-[#FF0096] animate-pulse" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white to-[#E5DEFF] bg-clip-text text-transparent">
          404
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0 mx-auto" />
        
        <p className="text-xl md:text-2xl text-white/80">
          Oops! Page not found
        </p>
        
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF0096] text-white hover:bg-[#FF0096]/90 
            hover:scale-[1.02] transform-gpu active:scale-95 transition-all duration-300
            shadow-[0_0_15px_rgba(255,0,150,0.5)] hover:shadow-[0_0_20px_rgba(255,0,150,0.7)]"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;