import { useState, useEffect } from "react";
import { Menu, X, MapPin, Heart, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,es,fr,de,zh", autoDisplay: false },
        "google_translate_element"
      );
    };
  }, []);

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = lang;
      selectField.dispatchEvent(new Event("change"));
    }
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { 
      x: 0, 
      transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.5 } 
    },
    exit: { x: "-100%", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const brandVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full p-3 md:p-4 flex justify-between items-center z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2 md:gap-0">
          <motion.button 
            onClick={() => setIsOpen(true)}
            className={`p-1 md:p-2 ${scrolled ? 'text-black' : 'text-white'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={20} className="md:size-6" />
          </motion.button>
          <motion.h1 
            className={`text-lg md:text-2xl font-bold font-serif ${scrolled ? 'text-black' : 'text-white'} md:absolute md:left-1/2 md:transform md:-translate-x-1/2`}
            variants={brandVariants}
            initial="initial"
            animate="animate"
          >
            Atelier-Katalia
          </motion.h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MapPin size={16} className={`md:size-6 ${scrolled ? 'text-black' : 'text-white'}`} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Heart size={16} className={`md:size-6 ${scrolled ? 'text-black' : 'text-white'}`} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <User size={16} className={`md:size-6 ${scrolled ? 'text-black' : 'text-white'}`} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Search size={16} className={`md:size-6 ${scrolled ? 'text-black' : 'text-white'}`} />
          </motion.div>
          <motion.select
            onChange={handleLanguageChange}
            className={`p-1 md:p-2 bg-transparent ${scrolled ? 'text-black border-black' : 'text-white border-white'} border rounded appearance-none text-xs md:text-base`}
            whileHover={{ scale: 1.05 }}
          >
            <option value="en" className="text-black">EN</option>
            <option value="es" className="text-black">ES</option>
            <option value="fr" className="text-black">FR</option>
            <option value="de" className="text-black">DE</option>
            <option value="zh" className="text-black">ZH</option>
          </motion.select>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white w-80 md:w-56 h-full p-6"
            >
              <motion.button 
                onClick={() => setIsOpen(false)}
                className="mb-6"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} className="md:size-6" />
              </motion.button>
              <motion.ul 
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.li variants={itemVariants}><a href="/" className="block text-base md:text-base">Home</a></motion.li>
                <motion.li variants={itemVariants}><a href="/about" className="block text-base md:text-base">About</a></motion.li>
                <motion.li variants={itemVariants}><a href="/services" className="block text-base md:text-base">Services</a></motion.li>
                <motion.li variants={itemVariants}><a href="/contact" className="block text-base md:text-base">Contact</a></motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="google_translate_element" className="hidden"></div>
    </>
  );
}

export default Navbar;