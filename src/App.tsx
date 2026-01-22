import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const DEHACK = lazy(() => import("./pages/DEHACK"));
const BedrockPage = lazy(() => import("./pages/BedrockPage"));
const Tickets = lazy(() => import("./pages/Tickets"));
const AboutEWeek = lazy(() => import("./pages/AboutEWeek"));
const TrailerTheater = lazy(() => import("./components/TrailerTheater"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/dehack" element={<PageTransition><DEHACK /></PageTransition>} />
        <Route path="/bedrock" element={<PageTransition><BedrockPage /></PageTransition>} />
        <Route path="/tickets" element={<PageTransition><Tickets /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutEWeek /></PageTransition>} />
        <Route path="/trailer" element={<PageTransition><TrailerTheater /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-primary font-mono">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <div className="animate-pulse tracking-[0.3em] text-xs">ENCRYPTING DATA...</div>
            </div>
          }>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
