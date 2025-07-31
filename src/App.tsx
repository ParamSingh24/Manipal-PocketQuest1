import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./contexts/InventoryContext";
import { AuthProvider } from "./contexts/AuthContext";
import WebsiteNarrator from "./components/WebsiteNarrator";

// Import your pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CatchPokemonPage from "./pages/CatchPokemonPage";
import InventoryPage from "./pages/InventoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoadingScreen from "./pages/LoadingScreen";
import ChatbotPage from "./pages/ChatbotPage"; // Import the new ChatbotPage
import ChallengesPage from "./pages/ChallengesPage";   // New Page
import SavePlanetPage from "./pages/SavePlanetPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <InventoryProvider>
          <Toaster />
          <Sonner />
          <WebsiteNarrator />
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
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/loading" element={<LoadingScreen/>} />
              <Route path="/chatbot" element={<ChatbotPage />} /> {/* Pokemon Chatbot route */}
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/save-planet" element={<SavePlanetPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </InventoryProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;