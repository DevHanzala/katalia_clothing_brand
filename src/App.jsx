import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/raleway";
import './App.css';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from './pages/Home';
import AllWeddingDresses from './pages/Wedding_Dresses/AllWeddingDresses';
import NewIn from './pages/Wedding_Dresses/NewIn';
import DressDetail from './pages/Wedding_Dresses/DressDetail';
import NewInDressDetail from "./pages/Wedding_Dresses/NewInDressDetail";
import Favorites from "./pages/Favourites";
import Siren from './pages/Wedding_Dresses/Silehoute/Siren';
import Princess from './pages/Wedding_Dresses/Silehoute/Princess';
import ALine from './pages/Wedding_Dresses/Silehoute/ALine';
import Curvy from './pages/Wedding_Dresses/Silehoute/Curvy';
import SilhouetteDetail from './pages/Wedding_Dresses/Silehoute/SilehouteDetail';
import Winter from './pages/Wedding_Dresses/Style/Winter';
import Boho from './pages/Wedding_Dresses/Style/Boho';
import CivilMarriage from './pages/Wedding_Dresses/Style/CivilMarriage';
import Simple from './pages/Wedding_Dresses/Style/Simple';
import StyleDetails from './pages/Wedding_Dresses/Style/StyleDetails';
import LongSleeves from "./pages/Wedding_Dresses/Characteristics/LongSleeves";
import ProtectionPayment from "./pages/Wedding_Dresses/Characteristics/ProtectionPayment";
import Tulle from "./pages/Wedding_Dresses/Characteristics/Tulle";
import Corset from "./pages/Wedding_Dresses/Characteristics/Corset";
import CharacteristicsDetail from "./pages/Wedding_Dresses/Characteristics/CharacteristicsDetail";
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

        <Route path="/wedding-dresses/siren" element={<Siren />} />
        <Route path="/wedding-dresses/princess" element={<Princess />} />
        <Route path="/wedding-dresses/a-line" element={<ALine />} />
        <Route path="/wedding-dresses/curvy" element={<Curvy />} />
        <Route path="/silhouette/:id" element={<SilhouetteDetail />} />

        <Route path="/wedding-dresses/winter-wedding-dress" element={<Winter />} />
        <Route path="/wedding-dresses/boho-wedding-dress" element={<Boho />} />
        <Route path="/wedding-dresses/civil-marriage" element={<CivilMarriage />} />
        <Route path="/wedding-dresses/simple" element={<Simple />} />
        <Route path="/style/:id" element={<StyleDetails />} />

        <Route path="/wedding-dresses/long-sleeves" element={<LongSleeves />} />
        <Route path="/wedding-dresses/protection-payment" element={<ProtectionPayment />} />
        <Route path="/wedding-dresses/tulle" element={<Tulle />} />
        <Route path="/wedding-dresses/corset" element={<Corset />} />
        <Route path="/style/:id" element={<CharacteristicsDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;