import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react"; // Added Trash2 icon for clear all

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [popupMessage, setPopupMessage] = useState({ text: "", isVisible: false, type: "" });

  useEffect(() => {
    // Initial load of favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    // Add event listener for storage changes (e.g., from other tabs or components)
    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(updatedFavorites);
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleFavorite = (dress) => {
    const isFavorite = favorites.some((fav) => fav.id === dress.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== dress.id);
      setPopupMessage({ text: "Removed from Favorites!", isVisible: true, type: "remove" });
    } else {
      updatedFavorites = [...favorites, dress];
      setPopupMessage({ text: "Added to Favorites!", isVisible: true, type: "add" });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setTimeout(() => {
      setPopupMessage((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
    setPopupMessage({ text: "All Favorites Cleared!", isVisible: true, type: "remove" });
    setTimeout(() => {
      setPopupMessage((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const popupVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 pt-20 md:pt-24">
      <motion.div
        className="w-full max-w-[95%] md:max-w-[98%] mx-auto mb-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-blue-600">
          <Link to="/" className="hover:underline">Home</Link>
        </span>
        <span className="mx-2">/</span>
        <span>Favorites</span>
      </motion.div>

      <div className="w-full max-w-[95%] md:max-w-[98%] mx-auto flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl md:text-4xl font-['Brush_Script_MT'] text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          YOUR FAVORITES
        </motion.h1>
        {favorites.length > 0 && (
          <motion.button
            onClick={clearAllFavorites}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 size={20} />
          </motion.button>
        )}
      </div>

      {favorites.length === 0 ? (
        <motion.div
          className="text-center text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>You haven't added any favorites yet.</p>
          <Link to="/wedding-dresses/all" className="text-blue-600 hover:underline">Browse dresses</Link>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-[95%] md:max-w-[98%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={favorites.length} // Force re-render when favorites length changes
        >
          {favorites.map((dress) => (
            <motion.div 
              key={dress.id} 
              variants={itemVariants} 
              className="relative p-4"
            >
              <Link to={`/dress/${dress.id}`}>
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-64 md:h-80 object-cover mb-2 md:mb-4"
                />
              </Link>
              <h2 className="text-base md:text-lg font-semibold">{dress.name}</h2>
              <p className="text-gray-600 text-xs md:text-sm mb-2">{dress.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-sm md:text-base">{dress.price}</p>
                <motion.button
                  onClick={() => toggleFavorite(dress)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    size={20} 
                    className="fill-red-500 text-red-500"
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Popup Notification */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial="hidden"
        animate={popupMessage.isVisible ? "visible" : "hidden"}
        exit="exit"
        variants={popupVariants}
      >
        <div 
          className={`bg-white shadow-lg rounded-lg p-4 flex items-center gap-3 border-l-4 ${
            popupMessage.type === "add" ? "border-green-500" : "border-red-500"
          }`}
        >
          <Heart 
            size={20} 
            className={popupMessage.type === "add" ? "text-green-500" : "text-red-500"} 
          />
          <p className="text-sm md:text-base text-gray-800">{popupMessage.text}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Favorites;