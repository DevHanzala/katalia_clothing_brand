// App.jsx
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Use path instead of src */}
      </Routes>
    </div>
  );
}

export default App;

