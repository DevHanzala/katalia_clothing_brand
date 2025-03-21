import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Filter, Heart } from "lucide-react";
import i2 from "../../assets/i2.jpg";
import i3 from "../../assets/i3.jpg";
import r1 from "../../assets/r1.jpg";
import r2 from "../../assets/r2.jpg";
import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import FilterSidebar from "../../components/Filterbar";

function NewIn() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [popupMessage, setPopupMessage] = useState({ text: "", isVisible: false, type: "" });

  const baseDressData = [
    {
      id: 1,
      name: "New Wedding Dress 1",
      price: "$499.99",
      image: i2,
      category: ["Half-sleeve", "Elegant", "A-line", "V-neck", "Floor-length", "Lace"],
      relatedImages: [i2, i3, r1],
      description: "A stunning new addition with elegant lace and a flattering A-line silhouette.",
    },
    {
      id: 2,
      name: "New Wedding Dress 2",
      price: "$599.99",
      image: r2,
      category: ["Princess", "Modern", "Sweetheart", "Tea-length", "Satin"],
      relatedImages: [r2, p1, i3],
      description: "A modern princess-style dress with a satin finish and sweetheart neckline.",
    },
    {
      id: 3,
      name: "New Wedding Dress 3",
      price: "$449.99",
      image: p2,
      category: ["A-line", "Vintage", "Scoop", "Knee-length", "Chiffon"],
      relatedImages: [p2, p3, i2],
      description: "A vintage-inspired chiffon dress with a scoop neckline and knee-length hem.",
    },
  ];

  const dressData = baseDressData.map((dress) => ({
    ...dress,
    id: dress.id + (currentPage - 1) * 3,
  }));

  const filteredDresses = Object.keys(appliedFilters).length === 0
    ? dressData
    : dressData.filter((dress) =>
        Object.entries(appliedFilters).every(([category, values]) =>
          values.length === 0 || values.some((value) => dress.category.includes(value))
        )
      );

  const visibleDresses = filteredDresses.slice(currentIndex, currentIndex + 3);

  useState(() => {
    // Load favorites from localStorage on mount
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (dress) => {
    const isFavorite = favorites.some((fav) => fav.id === dress.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== dress.id);
      setPopupMessage({ text: "Removed from Favorites!", isVisible: true, type: "remove" });
    } else {
      updatedFavorites = [...favorites, {
        id: dress.id,
        name: dress.name,
        price: dress.price,
        description: dress.description,
        image: dress.image
      }];
      setPopupMessage({ text: "Added to Favorites!", isVisible: true, type: "add" });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setTimeout(() => {
      setPopupMessage((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex + 3 < filteredDresses.length) setCurrentIndex(currentIndex + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentIndex(0);
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setCurrentIndex(0);
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
    <div className="min-h-screen bg-gray-100 p-6 pt-20 md:pt-28">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>New In Wedding Dresses</span>
      </div>

      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-4xl font-['Brush_Script_MT'] text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        New In Wedding Dresses
      </motion.h1>

      {/* Filter Sidebar Toggle and Recommended Dropdown */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 cursor-pointer"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter size={20} /> FILTER
          </button>
          <select className="px-4 py-2">
            <option>RECOMENDED</option>
            <option>Alphabetical</option>
            <option>New In</option>
          </select>
        </div>
        <div className="text-gray-600">
          {filteredDresses.length} {filteredDresses.length === 1 ? "item" : "items"}
        </div>
      </div>

      {/* Applied Filters */}
      {Object.keys(appliedFilters).length > 0 && (
        <div className="max-w-6xl mx-auto mb-4 flex flex-wrap gap-2">
          {Object.entries(appliedFilters).flatMap(([category, values]) =>
            values.map((value) => (
              <span
                key={`${category}-${value}`}
                className="px-2 py-1 bg-gray-300 text-gray-600 text-sm"
              >
                {category}: {value}
              </span>
            ))
          )}
        </div>
      )}

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
      />

      {/* Dresses Grid with Navigation */}
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {visibleDresses.map((dress) => (
            <motion.div
              key={dress.id}
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to={`/new-in-dress/${dress.id}`}
                state={{ relatedImages: dress.relatedImages, description: dress.description }}
              >
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-80 object-cover mb-4 cursor-pointer"
                />
              </Link>
              <h2 className="text-lg font-semibold">{dress.name}</h2>
              <p className="text-gray-600 mb-2">Newly arrived wedding dress</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">{dress.price}</p>
                <motion.button
                  onClick={() => toggleFavorite(dress)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    size={20}
                    className={favorites.some(fav => fav.id === dress.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredDresses.length > 3 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -left-12 transform -translate-y-1/2 p-2 bg-white shadow rounded-full"
              disabled={currentIndex === 0}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 -right-12 transform -translate-y-1/2 p-2 bg-white shadow rounded-full"
              disabled={currentIndex + 3 >= filteredDresses.length}
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Additional Images Section */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-1">
        {baseDressData.map((dress) => {
          const newId = dress.id + (currentPage - 1) * 3;
          return (
            <motion.div
              key={newId}
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to={`/new-in-dress/${newId}`}
                state={{ relatedImages: dress.relatedImages, description: dress.description }}
              >
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-80 object-cover mb-4 cursor-pointer"
                />
              </Link>
              <h2 className="text-lg font-semibold">{dress.name}</h2>
              <p className="text-gray-600 mb-2">Newly arrived wedding dress</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">{dress.price}</p>
                <motion.button
                  onClick={() => toggleFavorite({ ...dress, id: newId })}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    size={20}
                    className={favorites.some(fav => fav.id === newId) ? "fill-red-500 text-red-500" : "text-gray-600"}
                  />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8 border-t-1 border-b-1">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`px-4 py-2 ${currentPage === page ? "underline" : "hover:bg-gray-100"}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

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

export default NewIn;