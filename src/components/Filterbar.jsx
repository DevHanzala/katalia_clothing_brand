import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const FilterSidebar = ({ isOpen, onClose, onApplyFilters }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const filterOptions = {
    Style: [
      "Siren",
      "Boho",
      "Winter",
      "Simple",
      "Princess",
      "Elegant",
      "Modern",
      "Vintage",
      "Bohemian",
      "Romantic",
      "Classic",
      "Minimalist",
      "Glamorous",
    ],
    Sleeve: ["Long-Sleeve", "Half-sleeve", "Short", "Sleeveless", "Three-quarter"],
    Silhouette: ["A-line", "Mermaid", "Ball-Gown", "Sheath", "Trumpet", "Spanish"],
    Neckline: ["V-neck", "Sweetheart", "Scoop", "Halterneck", "Off-shoulder"],
    Length: ["Floor-length", "Tea-length", "Knee-length", "High-low"],
    Fabric: ["Lace", "Satin", "Chiffon", "Tulle", "Organza"],
    Special: ["Protection-Payment", "Civil-Marriage", "Curvy"],
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleFilterSelect = (category, option) => {
    setSelectedFilters((prev) => {
      const currentSelections = prev[category] || [];
      if (currentSelections.includes(option)) {
        return {
          ...prev,
          [category]: currentSelections.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentSelections, option],
        };
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    setOpenCategory(null);
  };

  const handleApplyFilters = () => {
    onApplyFilters(selectedFilters);
    onClose();
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 h-full w-72 md:w-96 bg-white shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      initial={{ x: -400 }} // Adjusted initial offset to match wider desktop width
      animate={{ x: isOpen ? 0 : -400 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Header with Close Button */}
        <div className="flex justify-between  items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button className="cursor-pointer" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(filterOptions).map(([category, options]) => (
            <div key={category} className="mb-4">
              <button
                className="w-full text-left font-semibold cursor-pointer py-2 hover:bg-gray-100 flex justify-between items-center"
                onClick={() => toggleCategory(category)}
              >
                {category}
                <ChevronDown
                  size={20}
                  className={`transition-transform ${openCategory === category ? "rotate-180" : ""}`}
                />
              </button>
              {openCategory === category && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      className={`px-2 py-1 text-xs cursor-pointer  ${
                        selectedFilters[category]?.includes(option)
                          ? "bg-gray-600 text-white"
                          : "bg-white text-gray-600"
                      }`}
                      onClick={() => handleFilterSelect(category, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button className="text-gray-600 px-4 py-2 hover:text-gray-800 cursor-pointer" onClick={handleClearFilters}>
            Clear
          </button>
          <button className="bg-black text-white px-6 py-2 rounded cursor-pointer" onClick={handleApplyFilters}>
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;