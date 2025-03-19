import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const FilterSidebar = ({ isOpen, onClose, onApplyFilters }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const filterOptions = {
    Silhouette: ["A-line", "Mermaid", "Ball Gown", "Sheath", "Trumpet"],
    Sleeve: ["Long", "Short", "Sleeveless", "Three-quarter", "Half-sleeve"],
    Style: ["Princess", "Elegant", "Modern", "Vintage", "Bohemian"],
    Neckline: ["V-neck", "Sweetheart", "Scoop", "Halter", "Off-shoulder"],
    Length: ["Floor-length", "Tea-length", "Knee-length", "High-low"],
    Fabric: ["Lace", "Satin", "Chiffon", "Tulle", "Organza"],
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
      className={`fixed top-0 left-0 h-full w-64 md:w-80 bg-white shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(filterOptions).map(([category, options]) => (
            <div key={category} className="mb-4">
              <button
                className="w-full text-left font-semibold py-2 hover:bg-gray-100 flex justify-between items-center"
                onClick={() => toggleCategory(category)}
              >
                {category}
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    openCategory === category ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openCategory === category && (
                <div className="pl-4">
                  {options.map((option) => (
                    <button
                      key={option}
                      className={`block w-full text-left py-1 hover:bg-gray-100 ${
                        selectedFilters[category]?.includes(option)
                          ? "bg-blue-100 text-blue-600"
                          : ""
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
          <button
            className="text-gray-600 px-4 py-2 hover:text-gray-800"
            onClick={handleClearFilters}
          >
            Clear
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={handleApplyFilters}
          >
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;