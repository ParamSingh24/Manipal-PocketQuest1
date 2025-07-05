import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./contexts/InventoryContext"; // Import the provider

// Import your pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CatchPokemonPage from "./pages/CatchPokemonPage"; // New Page
import InventoryPage from "./pages/InventoryPage";     // New Page
<<<<<<< HEAD
import ChallengesPage from "./pages/ChallengesPage";   // New Page

=======
import LeaderboardPage from "./pages/LeaderboardPage"; 
>>>>>>> e6feaa7ee4c18a89ee1744b205143b95a8eb8536
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* 👇 Wrap everything with InventoryProvider */}
      <InventoryProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* ✨ ADDED ROUTES FOR THE GAME ✨ */}
            <Route path="/catch" element={<CatchPokemonPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />

            <Route path="/leaderboard" element={<LeaderboardPage />} />
            {/* Your catch-all route remains last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </InventoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;