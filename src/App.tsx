import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./contexts/InventoryContext";

// Import your pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import CatchPokemonPage from "./pages/CatchPokemonPage";
import InventoryPage from "./pages/InventoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ChatbotPage from "./pages/ChatbotPage"; // Import the new ChatbotPage

=======
import CatchPokemonPage from "./pages/CatchPokemonPage"; // New Page
import InventoryPage from "./pages/InventoryPage";     // New Page
import LeaderboardPage from "./pages/LeaderboardPage"; 
>>>>>>> e6feaa7ee4c18a89ee1744b205143b95a8eb8536
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <InventoryProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catch" element={<CatchPokemonPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
<<<<<<< HEAD
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} /> {/* Pokemon Chatbot route */}
=======

            <Route path="/leaderboard" element={<LeaderboardPage />} />
            {/* Your catch-all route remains last */}
>>>>>>> e6feaa7ee4c18a89ee1744b205143b95a8eb8536
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </InventoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;