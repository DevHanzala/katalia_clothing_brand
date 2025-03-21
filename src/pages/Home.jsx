import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Heart, X } from "lucide-react";
import v1 from '../assets/v1.mp4';
import v2 from '../assets/v2.mp4';
import i2 from '../assets/i2.jpg';
import i3 from '../assets/i3.jpg';
import r1 from '../assets/r1.jpg';
import r2 from '../assets/r2.jpg';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import casualWomen from '../assets/i2.jpg';
import weddingWomen from '../assets/p3.jpg';

function Home() {
  const mainCarouselItems = [
    { type: "video", src: v1, text: "Welcome to Atelier-Katalia\nExperience luxury like never before\nCrafted with passion", buttonText: "Explore Now" },
    { type: "image", src: i2, text: "Discover Our Collection\nTimeless designs await you\nPerfect for every occasion", buttonText: "Shop Now" },
    { type: "image", src: i3, text: "New Arrivals\nFresh styles just dropped\nBe the first to own", buttonText: "View More" },
    { type: "image", src: p2, text: "Elegant Styles\nPerfect for any event\nTimeless beauty", buttonText: "Explore More" },
    { type: "video", src: v2, text: "Men's Luxury Unveiled\nSophisticated style for gentlemen\nTimeless elegance", buttonText: "Discover Menswear" },
  ];

  const eventCarouselItems = [
    { src: i3, text: "Fashion Show 2025", date: "20/3/25 - 25/3/25" },
    { src: r1, text: "Art Gallery Opening", date: "15/4/25 - 20/4/25" },
    { src: p2, text: "Wine Tasting Evening", date: "10/5/25 - 12/5/25" },
    { src: i3, text: "Designer Meet & Greet", date: "25/6/25 - 27/6/25" },
    { src: r2, text: "Spring Collection Launch", date: "5/7/25 - 10/7/25" },
    { src: i2, text: "Charity Auction Night", date: "15/8/25 - 16/8/25" },
    { src: p3, text: "Summer Pop-up Event", date: "20/9/25 - 25/9/25" },
  ];

  const braideCarouselItems = [
    { src: p1, brand: "Bride 1" },
    { src: i3, brand: "Bride 2" },
    { src: r1, brand: "Bride 3" },
    { src: p2, brand: "Bride 4" },
    { src: r2, brand: "Bride 5" },
  ];

  const [mainIndex, setMainIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrideIndex, setSelectedBrideIndex] = useState(0);
  const eventCarouselRef = useRef(null);
  const braideCarouselRef = useRef(null);
  const dragConstraintsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % mainCarouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mainCarouselItems.length]);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1.5, ease: "easeInOut" }
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

  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: "-100vh",
      transition: { duration: 0.3 }
    }
  };

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

  const openModal = (index) => {
    setSelectedBrideIndex(index);
    setIsModalOpen(true);
  };

  const nextBride = () => {
    setSelectedBrideIndex((prev) => 
      (prev + 1) % braideCarouselItems.length
    );
  };

  const prevBride = () => {
    setSelectedBrideIndex((prev) => 
      (prev - 1 + braideCarouselItems.length) % braideCarouselItems.length
    );
  };

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="w-full md:h-[93vh] h-[85vh] overflow-hidden relative" ref={dragConstraintsRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={mainIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
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
                className="text-xl md:text-2xl md:font-bold font-semibold mb-6 text-center whitespace-pre-line"
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
                className="px-6 md:py-3 py-2 bg-white cursor-pointer text-black rounded font-semibold"
              >
                {mainCarouselItems[mainIndex].buttonText}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute md:bottom-12 bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
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

      {/* Side-by-Side Images */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2 h-[80vh] md:h-[90vh] relative">
          <img src={casualWomen} alt="Casual Women" className="w-full h-full object-cover" />
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-center mb-4">Women’s Casual Dress<br />Effortless Style</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black rounded"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 h-[80vh] md:h-[90vh] relative">
          <img src={weddingWomen} alt="Wedding Women" className="w-full h-full object-cover" />
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-center mb-4">Women’s Wedding Dress<br />Timeless Elegance</p>
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
                className="flex-shrink-0 w-64 md:w-80 snap-center mx-[1.5px]"
              >
                <img src={item.src} alt={`Event ${index}`} className="w-full md:h-[75vh] h-[50vh] object-cover" />
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

      {/* AtelierKataliaBride Section */}
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
                className="flex-shrink-0 w-56 md:w-80 snap-center mx-[1.5px] relative cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img src={item.src} alt={`Braide ${index}`} className="w-full md:h-[75vh] h-[65vh] object-cover" />
                <motion.div
                  className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white"
                  initial="hidden"
                  whileHover="visible"
                  variants={overlayVariants}
                >
                  <motion.p 
                    className="text-xl font-semibold"
                    variants={childVariants}
                  >
                    {item.brand}
                  </motion.p>
                  <motion.div 
                    className="flex gap-4 mt-4"
                    variants={childVariants}
                  >
                    <Instagram size={24} />
                    <Heart size={24} />
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex md:items-center items-start justify-center p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-2/3">
                  <img
                    src={braideCarouselItems[selectedBrideIndex].src}
                    alt={braideCarouselItems[selectedBrideIndex].brand}
                    className="w-full md:h-[70vh] h-[40vh] object-cover"
                  />
                </div>
                <div className="md:w-1/4   flex flex-col gap-4">
                  <div>
                    <img
                      src={braideCarouselItems[(selectedBrideIndex + 1) % braideCarouselItems.length].src}
                      alt="Next bride"
                      className="md:w-full mx-auto md:h-44 h-24 object-cover"
                    />
                    <p className="md:mt-1 text-sm text-center md:text-left">
                      {braideCarouselItems[(selectedBrideIndex + 1) % braideCarouselItems.length].brand}
                    </p>
                  </div>
                  <div>
                    <h3 className="md:text-xl md:font-semibold">
                      {braideCarouselItems[selectedBrideIndex].brand}
                    </h3>
                    <p className="text-gray-600 md:text-[11px] text-[9px] md:mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex gap-4 md:mt-2 mt-1">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Instagram size={24} className="cursor-pointer hover:scale-110" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={prevBride}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-4xl"
              >
                ←
              </button>
              <button
                onClick={nextBride}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-4xl"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Book Appointment Section */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-2 md:py-1 z-50 w-full"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-center">
          <p className="text-sm font-medium hidden md:block">
            Looking for a wedding dress or guest look? We have it!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-4 md:px-6 py-2 bg-black text-white rounded text-sm md:text-base font-semibold whitespace-nowrap"
          >
            + Book Your Appointment
          </motion.button>
        </div>
      </motion.div>

      <div className="h-20 md:h-24"></div>
    </div>
  );
}

export default Home;