import { useState, useEffect } from "react";
import { X, MapPin, Heart, User, Search, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import i1 from '../assets/i1.jpg';
import i2 from '../assets/i2.jpg';
import i3 from '../assets/i3.jpg';

function Navbar({ onSidebarToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [translateReady, setTranslateReady] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [showWeddingSubmenu, setShowWeddingSubmenu] = useState(false);
  const [showSilhouetteSubmenu, setShowSilhouetteSubmenu] = useState(false);
  const [showStyleSubmenu, setShowStyleSubmenu] = useState(false);
  const [showCharacteristicsSubmenu, setShowCharacteristicsSubmenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const location = useLocation();

  // Function to update favorites count from localStorage
  const updateFavoritesCount = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritesCount(favorites.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadGoogleTranslate = () => {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onload = () => setTranslateReady(true);
      script.onerror = () => console.error("Failed to load Google Translate script");
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false, layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      );
    };

    if (!window.google || !window.google.translate) loadGoogleTranslate();
    else {
      setTranslateReady(true);
      window.googleTranslateElementInit();
    }

    // Initial load of favorites
    updateFavoritesCount();

    // Listen for storage changes (e.g., from other tabs or manual updates)
    const handleStorageChange = () => updateFavoritesCount();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      const script = document.querySelector(`script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]`);
      if (script) document.body.removeChild(script);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (onSidebarToggle) onSidebarToggle(isOpen);
  }, [isOpen, onSidebarToggle]);

  const handleLanguageChange = () => {
    if (!translateReady) {
      console.error("Google Translate not ready yet. Please wait...");
      return;
    }
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = selectedLang;
      selectField.dispatchEvent(new Event("change"));
      setIsLangModalOpen(false);
      setIsOpen(false);
    } else {
      console.error("Google Translate combo box not found. Retrying...");
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false, layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          "google_translate_element"
        );
        setTimeout(() => {
          const retrySelect = document.querySelector(".goog-te-combo");
          if (retrySelect) {
            retrySelect.value = selectedLang;
            retrySelect.dispatchEvent(new Event("change"));
            setIsLangModalOpen(false);
            setIsOpen(false);
          }
        }, 1000);
      }
    }
  };

  const toggleMenu = (menuName) => {
    console.log("Toggling menu:", menuName);
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: "-100%", transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut", 
        when: "beforeChildren", 
        staggerChildren: 0.1 
      } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      y: -10, 
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const topBarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const topBarItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const isHome = location.pathname === "/";

  const menuItems = [
    {
      name: "WEDDING DRESSES",
      subItems: [
        ["All Wedding Dresses", "New In", "Siren", "Princess", "A-Line", "Curvy"],
        ["Winter", "Boho", "Civil Marriage", "Simple"],
        ["Long Sleeves", "Protection Payment", "Tulle", "Corset"]
      ],
      images: [i1, i2]
    },
    { name: "CEREMONIAL DRESS", subItems: ["Formal Gowns", "Evening Wear"], images: [i2, i3] },
    { name: "GUEST DRESS", subItems: ["Party Dresses", "Casual Chic"], images: [i3, i1] },
    { name: "INSIDE KATALIA", subItems: ["Our Story", "Design Process"], images: [i1, i3] },
    { name: "EVENTS", subItems: ["Upcoming Shows", "Past Events"], images: [i2, i1] },
  ];

  return (
    <>
      {/* Top Bar */}
      <motion.div 
        className="fixed top-0 left-0 w-full bg-black text-white z-50 p-1" 
        variants={topBarVariants} 
        initial="hidden" 
        animate="visible"
      >
        <div className="flex justify-evenly md:justify-start">
          {['Contact', 'Support', 'FAQ', 'Shop'].map((item) => (
            <motion.button 
              key={item} 
              variants={topBarItemVariants} 
              className="text-sm md:text-base hover:text-gray-300 px-2" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Navbar */}
      <motion.nav 
        className={`fixed top-[28px] md:top-[32px] left-0 w-full p-3 md:p-2 flex justify-between items-center z-50 transition-all duration-300 ${
          activeMenu || (!isHome || scrolled) ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        animate={{
          backgroundColor: activeMenu ? '#ffffff' : (isHome && !scrolled ? 'transparent' : '#ffffff'),
          transition: { duration: 0.3 }
        }}
      >
        <div className="flex items-center order-1">
          <motion.button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden flex items-center" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <div className={`flex flex-col gap-1 ${activeMenu || (!isHome || scrolled) ? 'text-black' : 'text-white'}`}>
              <span className="w-4 h-[2px] bg-current"></span>
              <span className="w-4 h-[2px] bg-current"></span>
            </div>
          </motion.button>

          <h1 
            className={`brandname text-lg md:text-2xl font-['Brush_Script_MT'] ml-2 md:ml-0 ${
              activeMenu || (!isHome || scrolled) ? 'text-black' : 'text-white'
            }`}
          >
            ATELIER-KATALIA
          </h1>

          <div className="hidden md:flex items-center gap-6 ml-6">
            {menuItems.map((item) => (
              <motion.div 
                key={item.name} 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <button 
                  onClick={() => toggleMenu(item.name)}
                  className={`text-sm subheading cursor-pointer ${activeMenu || (!isHome || scrolled) ? 'text-black' : 'text-white'} ${activeMenu === item.name ? 'underline' : ''}`}
                >
                  {item.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-4 order-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MapPin size={16} className={`md:size-5 ${activeMenu || (!isHome || scrolled) ? 'text-black/80' : 'text-white/80'}`} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/favorites" className="relative">
              <Heart 
                size={16} 
                className={`md:size-5 ${favoritesCount > 0 ? 'fill-black text-black' : ''} ${activeMenu || (!isHome || scrolled) ? 'text-black/80' : 'text-white/80'}`} 
              />
              {favoritesCount > 0 && (
                <sup className="absolute -top-2 -right-2 text-xs text-black font-semibold">
                  {favoritesCount}
                </sup>
              )}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <User size={16} className={`md:size-5 ${activeMenu || (!isHome || scrolled) ? 'text-black/80' : 'text-white/80'}`} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Search size={16} className={`md:size-5 ${activeMenu || (!isHome || scrolled) ? 'text-black/80' : 'text-white/80'}`} />
          </motion.div>
        </div>
      </motion.nav>

      {/* Desktop Dropdown Menu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div 
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden md:block border-t-1 fixed top-[70px] left-0 w-full bg-white shadow-lg z-[60] px-6 py-2 my-2"
          >
            {menuItems.map((item) => (
              activeMenu === item.name && (
                <motion.div 
                  key={item.name} 
                  className="flex"
                  variants={dropdownItemVariants}
                >
                  <motion.div 
                    className="w-[40%] flex gap-[1.5px] relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="relative w-1/2">
                      <img src={item.images[0]} alt={`${item.name} 1`} className="w-full h-72 object-fill" />
                      {item.name === "WEDDING DRESSES" && (
                        <Link
                          to="/wedding-dresses/all"
                          className="absolute bottom-4 left-18 bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 cursor-pointer"
                          onClick={() => setActiveMenu(null)}
                        >
                          View All
                        </Link>
                      )}
                    </div>
                    <div className="relative w-1/2">
                      <img src={item.images[1]} alt={`${item.name} 2`} className="w-full h-72 object-fill" />
                      {item.name === "WEDDING DRESSES" && (
                        <Link
                          to="/wedding-dresses/new-in"
                          className="absolute bottom-4 left-18 bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 cursor-pointer"
                          onClick={() => setActiveMenu(null)}
                        >
                          New In
                        </Link>
                      )}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="w-[60%] flex pl-6 gap-24"
                    variants={dropdownItemVariants}
                  >
                    {/* First Column: Silhouette */}
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold subheading text-gray-700 mb-2">SILHOUETTE</h3>
                      {item.name === "WEDDING DRESSES" && item.subItems[0].slice(2).map((subItem) => (
                        <motion.div
                          key={subItem}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link 
                            to={
                              subItem === "Siren" ? "/wedding-dresses/siren" :
                              subItem === "Princess" ? "/wedding-dresses/princess" :
                              subItem === "A-Line" ? "/wedding-dresses/a-line" :
                              subItem === "Curvy" ? "/wedding-dresses/curvy" :
                              `/${item.name.toLowerCase().replace(" ", "-")}/${subItem.toLowerCase().replace(" ", "-")}`
                            } 
                            className="text-sm text-black hover:underline cursor-pointer mb-2"
                            onClick={() => setActiveMenu(null)}
                          >
                            {subItem}
                          </Link>
                        </motion.div>
                      ))}
                      {item.name !== "WEDDING DRESSES" && item.subItems.map((subItem) => (
                        <motion.div
                          key={subItem}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link 
                            to={`/${item.name.toLowerCase().replace(" ", "-")}/${subItem.toLowerCase().replace(" ", "-")}`} 
                            className="text-base text-black hover:underline cursor-pointer mb-2"
                            onClick={() => setActiveMenu(null)}
                          >
                            {subItem}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    {/* Second Column: Style */}
                    {item.name === "WEDDING DRESSES" && (
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold subheading text-gray-700 mb-2">STYLE</h3>
                        {item.subItems[1].map((subItem) => (
                          <motion.div
                            key={subItem}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link 
                              to={
                                subItem === "Winter" ? "/wedding-dresses/winter-wedding-dress" :
                                subItem === "Boho" ? "/wedding-dresses/boho-wedding-dress" :
                                subItem === "Civil Marriage" ? "/wedding-dresses/civil-marriage" :
                                subItem === "Simple" ? "/wedding-dresses/simple" :
                                `/${item.name.toLowerCase().replace(" ", "-")}/${subItem.toLowerCase().replace(" ", "-")}`
                              } 
                              className="text-sm text-black hover:underline cursor-pointer mb-2"
                              onClick={() => setActiveMenu(null)}
                            >
                              {subItem}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {/* Third Column: Characteristics */}
                    {item.name === "WEDDING DRESSES" && (
                      <div className="flex flex-col">
                        <h3 className="text-sm subheading font-semibold text-gray-700 mb-2">CHARACTERISTICS</h3>
                        {item.subItems[2].map((subItem) => (
                          <motion.div
                            key={subItem}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link 
                              to={
                                subItem === "Long Sleeves" ? "/wedding-dresses/long-sleeves" :
                                subItem === "Protection Payment" ? "/wedding-dresses/protection-payment" :
                                subItem === "Tulle" ? "/wedding-dresses/tulle" :
                                subItem === "Corset" ? "/wedding-dresses/corset" :
                                `/${item.name.toLowerCase().replace(" ", "-")}/${subItem.toLowerCase().replace(" ", "-")}`
                              } 
                              className="text-sm text-black hover:underline cursor-pointer mb-2"
                              onClick={() => setActiveMenu(null)}
                            >
                              {subItem}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="md:hidden fixed inset-0 bg-black/50 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div variants={sidebarVariants} initial="hidden" animate="visible" exit="exit" className="bg-white w-80 h-full p-6 flex flex-col">
              <motion.button onClick={() => setIsOpen(false)} className="mb-6 self-end" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <X size={24} />
              </motion.button>

              {!showWeddingSubmenu ? (
                <motion.ul className="space-y-6">
                  <motion.li>
                    <button onClick={() => setShowWeddingSubmenu(true)} className="text-base hover:text-gray-600 flex items-center justify-between w-full">
                      WEDDING DRESSES <span>></span>
                    </button>
                  </motion.li>
                </motion.ul>
              ) : (
                <motion.div className="space-y-6">
                  <motion.button onClick={() => setShowWeddingSubmenu(false)} className="flex items-center text-base hover:text-gray-600">
                    <ChevronLeft size={20} /> WEDDING DRESSES
                  </motion.button>
                  <motion.ul className="space-y-3">
                    <motion.li><Link to="/wedding-dresses/all" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>All Wedding Dresses</Link></motion.li>
                    <motion.li><Link to="/wedding-dresses/new-in" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>New In</Link></motion.li>
                    <motion.li>
                      <button 
                        onClick={() => setShowSilhouetteSubmenu(!showSilhouetteSubmenu)} 
                        className="text-base hover:text-gray-600 flex items-center justify-between w-full"
                      >
                        SILHOUETTE <span>{showSilhouetteSubmenu ? '<' : '>'}</span>
                      </button>
                      {showSilhouetteSubmenu && (
                        <motion.ul className="mt-1 pl-4 space-y-2">
                          <motion.li><Link to="/wedding-dresses/siren" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Siren</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/princess" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Princess</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/a-line" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>A-Line</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/curvy" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Curvy</Link></motion.li>
                        </motion.ul>
                      )}
                    </motion.li>
                    <motion.li>
                      <button 
                        onClick={() => setShowStyleSubmenu(!showStyleSubmenu)} 
                        className="text-base hover:text-gray-600 flex items-center justify-between w-full"
                      >
                        STYLE <span>{showStyleSubmenu ? '<' : '>'}</span>
                      </button>
                      {showStyleSubmenu && (
                        <motion.ul className="mt-1 pl-4 space-y-2">
                          <motion.li><Link to="/wedding-dresses/winter-wedding-dress" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Winter</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/boho-wedding-dress" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Boho</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/civil-marriage" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Civil Marriage</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/simple" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Simple</Link></motion.li>
                        </motion.ul>
                      )}
                    </motion.li>
                    <motion.li>
                      <button 
                        onClick={() => setShowCharacteristicsSubmenu(!showCharacteristicsSubmenu)} 
                        className="text-base hover:text-gray-600 flex items-center justify-between w-full"
                      >
                        CHARACTERISTICS <span>{showCharacteristicsSubmenu ? '<' : '>'}</span>
                      </button>
                      {showCharacteristicsSubmenu && (
                        <motion.ul className="mt-1 pl-4 space-y-2">
                          <motion.li><Link to="/wedding-dresses/long-sleeves" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Long Sleeves</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/protection-payment" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Protection Payment</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/tulle" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Tulle</Link></motion.li>
                          <motion.li><Link to="/wedding-dresses/corset" className="block text-base hover:text-gray-600" onClick={() => setIsOpen(false)}>Corset</Link></motion.li>
                        </motion.ul>
                      )}
                    </motion.li>
                  </motion.ul>
                </motion.div>
              )}

              <motion.button onClick={() => setIsLangModalOpen(true)} className="flex items-center justify-between w-full p-2 border-t mt-4 hover:bg-gray-100" whileHover={{ scale: 1.02 }}>
                <span>English</span>
                <span>→</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Modal */}
      <AnimatePresence>
        {isLangModalOpen && (
          <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-white w-full h-full flex flex-col md:flex-row relative">
              <motion.button onClick={() => setIsLangModalOpen(false)} className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-white rounded-full p-1" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <X size={24} className="text-gray-600" />
              </motion.button>
              <div className="w-full md:w-1/2 h-1/2 md:h-full">
                <img src={i3} alt="Language selection" className="object-cover w-full h-full" />
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-8 flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-white">
                <h1 className="text-3xl md:text-4xl font-['Brush_Script_MT'] text-gray-800 mb-4">
                  KATALIA
                </h1>
                <p className="text-base md:text-lg text-gray-600 mb-6 text-center">Choose location for better readability</p>
                <motion.select onChange={(e) => setSelectedLang(e.target.value)} className="w-full max-w-xs p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white mb-6" defaultValue="en" whileHover={{ scale: 1.02 }}>
                  {[
                    { code: "en", name: "English" },
                    { code: "es", name: "Spanish" },
                    { code: "fr", name: "French" },
                    { code: "de", name: "German" },
                    { code: "zh", name: "Chinese" },
                    { code: "it", name: "Italian" },
                    { code: "pt", name: "Portuguese" },
                    { code: "ru", name: "Russian" },
                    { code: "ja", name: "Japanese" },
                    { code: "ar", name: "Arabic" }
                  ].map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </motion.select>
                <motion.button onClick={handleLanguageChange} className="w-full max-w-xs bg-black text-white py-3 rounded-md hover:bg-gray-800" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="google_translate_element" className="hidden"></div>
    </>
  );
}

export default Navbar;