import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Filter, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import i2 from "../../../assets/i2.jpg";
import i3 from "../../../assets/i3.jpg";
import r1 from "../../../assets/r1.jpg";
import FilterSidebar from "../../../components/Filterbar";

function Siren() {
  // State management
  const [activeFilter, setActiveFilter] = useState("Siren");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [popupMessage, setPopupMessage] = useState({ text: "", isVisible: false, type: "" });
  const filterRef = useRef(null);

  // Filter options
  const filters = ["Siren", "Elegant", "Modern", "Lace"];

  // Base dress data for Siren category
  const baseDressData = [
    {
      id: 1,
      name: "Siren Dress 1",
      price: "$499.99",
      image: i2,
      description: "Elegant siren dress with a modern twist",
      category: ["Siren", "Elegant", "Lace"],
      relatedImages: [i2, i3, r1],
    },
    {
      id: 2,
      name: "Siren Dress 2",
      price: "$599.99",
      image: r1,
      description: "Stunning siren dress with intricate details",
      category: ["Siren", "Modern", "Lace"],
      relatedImages: [r1, i2, i3],
    },
    {
      id: 3,
      name: "Siren Dress 3",
      price: "$449.99",
      image: i3,
      description: "Classic siren dress with a sleek silhouette",
      category: ["Siren", "Elegant"],
      relatedImages: [i3, r1, i2],
    },
  ];

  // Pagination logic
  const dressData = baseDressData.map((dress) => ({
    ...dress,
    id: dress.id + (currentPage - 1) * 3,
  }));

  // Filtering logic
  const filteredDresses = (() => {
    let result = dressData;
    if (activeFilter !== "Siren") {
      result = result.filter((dress) => dress.category.includes(activeFilter));
    }
    if (Object.keys(appliedFilters).length > 0) {
      result = result.filter((dress) =>
        Object.entries(appliedFilters).every(([category, values]) =>
          values.length === 0 || values.some((value) => dress.category.includes(value))
        )
      );
    }
    return result;
  })();

  const visibleDresses = filteredDresses.slice(currentIndex, currentIndex + 3);

  // Navigation handlers
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

  const scrollFiltersLeft = () => {
    if (filterRef.current) filterRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollFiltersRight = () => {
    if (filterRef.current) filterRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  // Favorite toggle logic with localStorage
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
        image: dress.image,
        description: dress.description,
      }];
      setPopupMessage({ text: "Added to Favorites!", isVisible: true, type: "add" });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setTimeout(() => {
      setPopupMessage((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
  };

  // Animation variants
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 pt-20 md:pt-24">
      {/* Breadcrumb */}
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
        <span className="text-blue-600">
          <Link to="/wedding-dresses/siren" className="hover:underline">Wedding Dresses</Link>
        </span>
        <span className="mx-2">/</span>
        <span>Siren</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-2xl md:text-4xl font-['Brush_Script_MT'] text-center mb-6 md:mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        SIREN DRESSES
      </motion.h1>

      {/* Filters Row */}
      <div className="w-full max-w-[95%] md:max-w-[98%] mx-auto mb-6 md:mb-8 relative">
        <div className="flex items-center gap-2 justify-between">
          <div
            ref={filterRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full"
            style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
          >
            {filters.map((filter, index) => (
              <motion.button
                key={index}
                className={`flex-shrink-0 px-2 py-1 mx-1 cursor-pointer text-xs md:text-base ${
                  activeFilter === filter ? "bg-gray-300 text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentIndex(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={scrollFiltersLeft} className="p-2 cursor-pointer">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollFiltersRight} className="p-2 cursor-pointer">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Sidebar Toggle */}
      <motion.div
        className="w-full max-w-[95%] md:max-w-[98%] mx-auto mb-6 md:mb-5 flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 cursor-pointer font-semibold text-sm md:text-base"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter size={20} /> FILTER
          </button>
          <select className="px-4 py-2 text-sm md:text-base font-semibold">
            <option>RECOMMENDED</option>
            <option>Alphabetical</option>
            <option>New In</option>
          </select>
        </div>
        <div className="text-gray-600 text-sm md:text-base">
          {filteredDresses.length} {filteredDresses.length === 1 ? "item" : "items"}
        </div>
      </motion.div>

      {/* Filter Sidebar Component */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
      />

      {/* Dresses Grid */}
      <motion.div
        className="w-full max-w-[95%] md:max-w-[98%] mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          {visibleDresses.map((dress) => (
            <motion.div key={dress.id} variants={itemVariants} className="relative">
              <Link to={`/silhouette/${dress.id}`} state={{ relatedImages: dress.relatedImages }}>
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-64 md:h-80 object-cover mb-2 md:mb-4 cursor-pointer"
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
                    className={favorites.some((fav) => fav.id === dress.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
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
              className="absolute top-1/2 -left-8 md:-left-12 transform -translate-y-1/2 p-2 bg-white shadow rounded-full hidden md:block"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 -right-8 md:-right-12 transform -translate-y-1/2 p-2 bg-white shadow rounded-full hidden md:block"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </motion.div>

      {/* Pagination */}
      <motion.div
        className="flex justify-center border-t border-b p-1 gap-4 mt-6 md:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {[1, 2, 3].map((page) => (
          <motion.button
            key={page}
            className={`px-3 md:px-4 py-1 md:py-2 cursor-pointer text-sm md:text-base ${
              currentPage === page ? "underline" : "hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(page)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {page}
          </motion.button>
        ))}
      </motion.div>

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

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Siren;