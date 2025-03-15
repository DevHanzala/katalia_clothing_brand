// pages/Home.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Heart } from "lucide-react";
import v1 from '../assets/v1.mp4';
import i1 from '../assets/i1.jpg';
import i2 from '../assets/i2.jpg';
import i3 from '../assets/i3.jpg';

function Home() {
  // Main Carousel
  const mainCarouselItems = [
    {
      type: "video",
      src: v1,
      text: "Welcome to Atelier-Katalia\nExperience luxury like never before\nCrafted with passion",
      buttonText: "Explore Now",
    },
    {
      type: "image",
      src: i2,
      text: "Discover Our Collection\nTimeless designs await you\nPerfect for every occasion",
      buttonText: "Shop Now",
    },
    {
      type: "image",
      src: i3,
      text: "New Arrivals\nFresh styles just dropped\nBe the first to own",
      buttonText: "View More",
    },
    {
      type: "image",
      src: i1,
      text: "Special Offers\nExclusive deals for you\nLimited time only",
      buttonText: "Get Deals",
    },
  ];

  // Events Carousel with dummy dates
  const eventCarouselItems = [
    { src: i3, text: "Fashion Show 2025", date: "20/3/25 - 25/3/25" },
    { src: i1, text: "Art Gallery Opening", date: "15/4/25 - 20/4/25" },
    { src: i2, text: "Wine Tasting Evening", date: "10/5/25 - 12/5/25" },
    { src: i3, text: "Designer Meet & Greet", date: "25/6/25 - 27/6/25" },
    { src: i1, text: "Spring Collection Launch", date: "5/7/25 - 10/7/25" },
    { src: i2, text: "Charity Auction Night", date: "15/8/25 - 16/8/25" },
    { src: i3, text: "Summer Pop-up Event", date: "20/9/25 - 25/9/25" },
  ];

  // AtelierKataliaBraide Carousel
  const braideCarouselItems = [
    { src: i2, brand: "Braide 1" },
    { src: i3, brand: "Braide 2" },
    { src: i1, brand: "Braide 3" },
    { src: i2, brand: "Braide 4" },
    { src: i3, brand: "Braide 5" },
  ];

  const [mainIndex, setMainIndex] = useState(0);
  const eventCarouselRef = useRef(null);
  const braideCarouselRef = useRef(null);

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.5 }
    }
  };

  const eventItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const braideItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Scroll functions for arrows
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="w-full md:h-screen h-[85vh] overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={mainIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {mainCarouselItems[mainIndex].type === "video" ? (
              <video
                src={mainCarouselItems[mainIndex].src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={mainCarouselItems[mainIndex].src}
                alt={`Slide ${mainIndex}`}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center flex-col text-white bg-black/20">
              <motion.p
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-xl md:text-3xl md:font-bold font-semibold mb-6 text-center whitespace-pre-line"
              >
                {mainCarouselItems[mainIndex].text}
              </motion.p>
              <motion.button
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:py-3 py-2 bg-white text-black rounded font-semibold"
              >
                {mainCarouselItems[mainIndex].buttonText}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {mainCarouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setMainIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                mainIndex === index ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side-by-side Images */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2 h-[70vh] md:h-[90vh] relative">
          <img src={i3} alt="Section 1" className="w-full h-full object-cover" />
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-center mb-4">Exclusive Designs<br />Crafted with Care</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black rounded"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 h-[70vh] md:h-[90vh] relative">
          <img src={i1} alt="Section 2" className="w-full h-full object-cover" />
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-center mb-4">Limited Editions<br />Grab Yours Now</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black rounded"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Events Section */}
      <div className="md:py-8 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.button 
              onClick={() => scrollLeft(eventCarouselRef)} 
              className="text-4xl font-bold cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.button>
            <motion.h2 
              className="text-2xl text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              EVENTS
            </motion.h2>
            <motion.button 
              onClick={() => scrollRight(eventCarouselRef)} 
              className="text-4xl font-bold cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.button>
          </div>
          <div 
            ref={eventCarouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory"
            style={{ 
              scrollBehavior: 'smooth', 
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              overflowX: 'scroll'
            }}
          >
            {eventCarouselItems.map((item, index) => (
              <motion.div
                key={index}
                variants={eventItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex-shrink-0 w-72 md:w-80 snap-center mx-1"
              >
                <img src={item.src} alt={`Event ${index}`} className="w-full md:h-[75vh] h-[60vh] object-cover rounded-lg" />
                <motion.p 
                  variants={childVariants}
                  className="md:mt-1 text-sm text-gray-600 text-center"
                >
                  {item.date}
                </motion.p>
                <motion.p 
                  variants={childVariants}
                  className="md:mt-2 text-lg font-semibold text-center"
                >
                  {item.text}
                </motion.p>
              
                <motion.button
                  variants={childVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 mx-auto block px-4 py-2 border text-black rounded"
                >
                  JOIN EVENT
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* AtelierKataliaBraide Section */}
      <div className="md:py-8 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <motion.button 
              onClick={() => scrollLeft(braideCarouselRef)} 
              className="text-4xl font-bold cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.button>
            <motion.h2 
              className="md:text-2xl text-xl text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              #AtelierKataliaBride
            </motion.h2>
            <motion.button 
              onClick={() => scrollRight(braideCarouselRef)} 
              className="text-4xl font-bold cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.button>
          </div>
          <motion.p 
            className="text-center md:mb-4 mb-2 md:text-lg text-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover our exclusive bride collection crafted with elegance
          </motion.p>
          <div 
            ref={braideCarouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory"
            style={{ 
              scrollBehavior: 'smooth', 
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              overflowX: 'scroll'
            }}
          >
            {braideCarouselItems.map((item, index) => (
              <motion.div
                key={index}
                variants={braideItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex-shrink-0 w-72 md:w-80 snap-center mx-1 relative"
              >
                <img src={item.src} alt={`Braide ${index}`} className="w-full md:h-[75vh] h-[60vh] object-cover rounded-lg" />
                <motion.div
                  className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white"
                  initial="hidden"
                  whileHover="visible"
                  variants={overlayVariants}
                >
                  <motion.p 
                    className="text-xl font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {item.brand}
                  </motion.p>
                  <motion.div 
                    className="flex gap-4 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Instagram size={24} />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Heart size={24} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      <div className="py-6 md:py-4">
<motion.div
  className="max-w-full mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 text-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <p className="text-sm md:text-lg font-medium">Looking for a wedding dress or guest look? We have it!</p>
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-4 md:px-6 py-2 bg-black text-white rounded text-sm md:text-base font-semibold whitespace-nowrap"
  >
    + Book Your Appointment
  </motion.button>
</motion.div>
</div>
</div>
  );
}

export default Home;