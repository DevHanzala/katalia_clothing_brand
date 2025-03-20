import { motion } from "framer-motion";
import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Share2, Heart, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import i2 from "../../assets/i2.jpg";
import i3 from "../../assets/i3.jpg";
import r1 from "../../assets/r1.jpg";
import r2 from "../../assets/r2.jpg";
import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";

function DressDetail() {
  const { id } = useParams();
  const dressId = parseInt(id, 10);
  const location = useLocation();
  const { relatedImages = [] } = location.state || {};
  const carouselRef = useRef(null);

  const dressData = {
    1: {
      name: "Wedding Dress 1",
      price: "$499.99",
      description: "Detailed description of Wedding Dress 1.",
      images: [i2, i3, r1],
      category: ["Half-Sleeve", "Elegant", "A-Line", "V-neck", "Floor-length", "Lace", "Romantic", "Simple"],
    },
    2: {
      name: "Wedding Dress 2",
      price: "$599.99",
      description: "Detailed description of Wedding Dress 2.",
      images: [r2, p1, i3],
      category: ["Princess", "Modern", "Sweetheart", "Tea-length", "Satin", "Glamorous", "Curvy"],
    },
    3: {
      name: "Wedding Dress 3",
      price: "$449.99",
      description: "Detailed description of Wedding Dress 3.",
      images: [p2, p3, i2],
      category: ["A-Line", "Vintage", "Scoop", "Knee-length", "Chiffon", "Boho", "Winter"],
    },
    4: { name: "Wedding Dress 1", price: "$499.99", description: "Detailed description of Wedding Dress 1.", images: [i2, i3, r1], category: ["Half-Sleeve", "Elegant"] },
    5: { name: "Wedding Dress 2", price: "$599.99", description: "Detailed description of Wedding Dress 2.", images: [r2, p1, i3], category: ["Princess", "Modern"] },
    6: { name: "Wedding Dress 3", price: "$449.99", description: "Detailed description of Wedding Dress 3.", images: [p2, p3, i2], category: ["A-Line", "Vintage"] },
    7: { name: "Wedding Dress 1", price: "$499.99", description: "Detailed description of Wedding Dress 1.", images: [i2, i3, r1], category: ["Half-Sleeve", "Elegant"] },
    8: { name: "Wedding Dress 2", price: "$599.99", description: "Detailed description of Wedding Dress 2.", images: [r2, p1, i3], category: ["Princess", "Modern"] },
    9: { name: "Wedding Dress 3", price: "$449.99", description: "Detailed description of Wedding Dress 3.", images: [p2, p3, i2], category: ["A-Line", "Vintage"] },
  };

  const defaultDress = {
    name: `Wedding Dress ${dressId}`,
    price: "$499.99",
    description: "Default description.",
    images: [i3],
    category: ["Simple"],
  };

  const [currentDress, setCurrentDress] = useState(dressData[dressId] || defaultDress);
  const [displayImages, setDisplayImages] = useState(relatedImages.length > 0 ? relatedImages : currentDress.images || [i3]);
  const [mainImage, setMainImage] = useState(displayImages[0]);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  useEffect(() => {
    console.log("ID:", dressId, "Current Dress:", currentDress, "Display Images:", displayImages, "Main Image:", mainImage);
  }, [dressId, currentDress, displayImages, mainImage]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy URL.");
    });
  };

  const handleCarouselClick = (dressId) => {
    const newDress = dressData[parseInt(dressId, 10)] || defaultDress;
    setCurrentDress(newDress);
    setDisplayImages(newDress.images);
    setMainImage(newDress.images[0]);
  };

  const scrollCarouselLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollCarouselRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 pt-20 md:pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/wedding-dresses/all" className="text-blue-600 hover:underline">Wedding Dresses</Link>
          <span className="mx-2">/</span>
          <span>{dressId}</span>
        </div>

        {/* Heading */}
        <motion.h1
          className="text-2xl md:text-4xl font-['Brush_Script_MT'] text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {currentDress.name}
        </motion.h1>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-8">
          {/* Mobile: Main Image First */}
          <div className="w-full md:w-6/12 order-1 md:order-2"> {/* Main image in center on desktop */}
            <img
              src={mainImage}
              alt={currentDress.name}
              className="w-full h-64 md:h-[90vh] object-cover"
            />
          </div>

          {/* Mobile: Thumbnails Below Main Image */}
          <div className="w-full md:w-1/6 flex flex-row md:flex-col gap-2 md:gap-3 justify-center md:justify-start order-2 md:order-1"> {/* Thumbnails on left on desktop */}
            {displayImages.slice(0, 2).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${currentDress.name} ${index + 1}`}
                className={`w-20 h-20 md:w-24 md:h-36 object-cover cursor-pointer ${
                  mainImage === img ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          {/* Right Content */}
          <div className="w-full md:w-5/12 flex flex-col gap-4 order-3"> {/* Increased width on desktop */}
            <p className="text-xl font-semibold">{currentDress.price}</p>
            <div className="flex flex-wrap gap-2">
              {currentDress.category.map((cat) => (
                <span key={cat} className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                  {cat}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={handleShare} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Share2 size={20} /> Share
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-red-600">
                <Heart size={20} /> Favorite
              </button>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Book Appointment
            </button>

            {/* Product Description Dropdown */}
            <div>
              <button
                className="w-full flex justify-between items-center text-left font-semibold py-2 hover:bg-gray-100"
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              >
                Product Description
                {isDescriptionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {isDescriptionOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 text-sm mt-2"
                >
                  {currentDress.description}
                </motion.div>
              )}
            </div>

            {/* FAQ Dropdown */}
            <div>
              <button
                className="w-full flex justify-between items-center text-left font-semibold py-2 hover:bg-gray-100"
                onClick={() => setIsFaqOpen(!isFaqOpen)}
              >
                FAQs
                {isFaqOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {isFaqOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 text-sm mt-2"
                >
                  <p><strong>Q: What sizes are available?</strong><br />A: Sizes range from XS to XXL.</p>
                  <p><strong>Q: Can I return this dress?</strong><br />A: Yes, within 30 days with receipt.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* You May Also Like Carousel */}
        <div className="mt-8 relative">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">You May Also Like</h2>
          <div className="flex items-center">
            <button
              onClick={scrollCarouselLeft}
              className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 p-2"
            >
              <ChevronLeft size={40} />
            </button>
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-2 md:gap-4 scrollbar-hide w-full"
              style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
            >
              {Object.entries(dressData).map(([dressId, dress]) => (
                <motion.div
                  key={dressId}
                  className="flex-shrink-0 w-32 md:w-48 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleCarouselClick(dressId)}
                >
                  <img
                    src={dress.images[0]}
                    alt={dress.name}
                    className="w-full h-40 md:h-72 object-cover"
                  />
                  <p className="text-sm md:text-base mt-2">{dress.name}</p>
                  <p className="text-gray-600 text-sm">{dress.price}</p>
                </motion.div>
              ))}
            </div>
            <button
              onClick={scrollCarouselRight}
              className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        </div>
      </div>

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

export default DressDetail;