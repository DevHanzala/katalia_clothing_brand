import React, { useState, useEffect } from 'react';
import { X, Globe, ChevronRight, Instagram, Facebook, Youtube, Pin } from 'lucide-react'; // Replaced Pinterest with Pin
import { motion, AnimatePresence } from 'framer-motion';
import i3 from '../assets/i3.jpg'; // Assuming this image exists

const Footer = () => {
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [translateReady, setTranslateReady] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  // Load Google Translate script
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

    return () => {
      const script = document.querySelector(`script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]`);
      if (script) document.body.removeChild(script);
    };
  }, []);

  // Handle language change
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
          }
        }, 1000);
      }
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  return (
    <footer className="bg-black text-white py-10 px-5 w-full">
      {/* Top Section */}
      <div className="mx-auto flex flex-col md:flex-row justify-between flex-wrap md:mb-10 md:gap-6 gap-2">
        {/* Left Headings */}
        <div className="text-center mx-auto md:text-left md:flex md:mb-0 mb-2 md:gap-3">
          <h2 className="text-sm md:text-4xl subheading">Enter The World of</h2>
          <h2 className="text-xl brandname md:text-4xl underline">ATELIER KATALIA</h2>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-around gap-6">
          {/* Column 1: Newsletter */}
          <div className="">
            <p className="md:text-lg md:mb-4 subheading text-center md:text-left">SUBSCRIBE TO THE NEWSLETTER</p>
            <div className="flex justify-center md:justify-start md:gap-6 gap-2">
              <label className="block mb-2 cursor-pointer">
                <input type="checkbox" className="md:mr-2" /> For the Men
              </label>
              <label className="block mb-2 cursor-pointer">
                <input type="checkbox" className="md:mr-2" /> For the Women
              </label>
            </div>
          </div>
          {/* Column 3: Social Links */}
          <div className="">
            <p className="md:text-lg mb-2 text-center subheading md:text-left">FOLLOW US</p>
            <div className="flex justify-center text-sm md:text-xl flex-wrap gap-2 items-center md:items-start">
              <a href="#" className="mb-1 hover:underline flex items-center gap-1">
                <Instagram size={16} className="md:size-3" /> Instagram
              </a>
              <a href="#" className="mb-1 hover:underline flex items-center gap-1">
                <Facebook size={16} className="md:size-3" /> Facebook
              </a>
              <a href="#" className="mb-1 hover:underline flex items-center gap-1">
                <Youtube size={16} className="md:size-3" /> TikTok
              </a>
              <a href="#" className="mb-1 hover:underline flex items-center gap-1">
                <Youtube size={16} className="md:size-3" /> YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mx-auto text-center md:mb-4 mb-2">
        <div className="flex flex-row justify-between flex-wrap md:gap-6 text-center md:text-left">
          <a href="#" className="flex-1 min-w-[150px] mb-2 hover:underline">Link 1</a>
          <a href="#" className="flex-1 min-w-[150px] mb-2 hover:underline">Link 2</a>
          <a href="#" className="flex-1 min-w-[150px] mb-2 hover:underline">Link 3</a>
          <div className="flex-1 min-w-[150px]">
            <p className="cursor-pointer subheading md:text-lg text-sm">CHANGE COUNTRY</p>
            <p
              onClick={() => setIsLangModalOpen(true)}
              className="cursor-pointer hover:underline md:text-xl text-sm flex items-center justify-center md:justify-start gap-1"
            >
              <Globe size={16} className="md:size-5" /> English <ChevronRight size={16} className="md:size-5" />
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mb-2 md:text-xl text-sm">
        <p className="">Copyright © 2025 ATELIER KATALIA</p>
        <p className="text-sm">All Rights Reserved</p>
      </div>

      {/* Brand Section */}
      <div className="h-[20vh] flex items-center justify-center border-t md:m-3 border-gray-700">
        <h1 className="text-[33px] brandname md:text-9xl tracking-wide hover:text-gray-300 cursor-pointer transition-colors">
          ATELIER KATALIA
        </h1>
      </div>

      {/* Language Modal */}
      <AnimatePresence>
        {isLangModalOpen && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          >
            <div className="bg-white w-full h-full flex flex-col md:flex-row relative">
              <motion.button
                onClick={() => setIsLangModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-white rounded-full p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
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
                <motion.select
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="w-full max-w-xs p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white mb-6"
                  defaultValue="en"
                  whileHover={{ scale: 1.02 }}
                >
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
                <motion.button
                  onClick={handleLanguageChange}
                  className="w-full max-w-xs bg-black text-white py-3 rounded-md hover:bg-gray-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>
    </footer>
  );
};

export default Footer;