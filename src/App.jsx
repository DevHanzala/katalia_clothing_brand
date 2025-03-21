import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/raleway";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllWeddingDresses from './pages/Wedding_Dresses/AllWeddingDresses';
import NewIn from './pages/Wedding_Dresses/NewIn';
import DressDetail from './pages/Wedding_Dresses/DressDetail';
import NewInDressDetail from "./pages/Wedding_Dresses/NewInDressDetail";
import Favorites from "./pages/Favourites";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="App">
      <Navbar onSidebarToggle={handleSidebarToggle} />
      <Routes>
        <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} />} />
        <Route path="/wedding-dresses/all" element={<AllWeddingDresses />} />
        <Route path="/wedding-dresses/new-in" element={<NewIn />} />
        <Route path="/dress/:id" element={<DressDetail />} />
        <Route path="/new-in-dress/:id" element={<NewInDressDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;