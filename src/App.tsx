import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar";
import ListeGames from "./pages/Game/ListeGames";
import Game from "./pages/Game/Game";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<ListeGames />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
