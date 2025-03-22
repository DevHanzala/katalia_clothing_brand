import { motion } from "framer-motion";
import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Share2, Heart, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import i2 from "../../../assets/i2.jpg";
import i3 from "../../../assets/i3.jpg";
import r1 from "../../../assets/r1.jpg";
import r2 from "../../../assets/r2.jpg";
import p1 from "../../../assets/p1.jpg";
import p2 from "../../../assets/p2.jpg";
import p3 from "../../../assets/p3.jpg";

function CharacteristicsDetail() {
  const { id } = useParams();
  const dressId = parseInt(id, 10);
  const location = useLocation();
  const { relatedImages = [] } = location.state || {};
  const carouselRef = useRef(null);

  const dressData = {
    1: { id: 1, name: "Long Sleeve Dress 1", price: "$549.99", description: "Elegant long sleeve dress with velvet accents", image: i2, images: [i2, i3, r1], category: ["Long Sleeves", "Elegant", "Velvet"] },
    2: { id: 2, name: "Long Sleeve Dress 2", price: "$579.99", description: "Warm long sleeve dress with soft fabric", image: r1, images: [r1, i2, i3], category: ["Long Sleeves", "Warm", "Velvet"] },
    3: { id: 3, name: "Long Sleeve Dress 3", price: "$529.99", description: "Classic long sleeve dress with elegant design", image: i3, images: [i3, r1, i2], category: ["Long Sleeves", "Elegant"] },
    4: { id: 4, name: "Protection Dress 1", price: "$499.99", description: "Secure payment dress with modern design", image: r2, images: [r2, p1, i3], category: ["Protection Payment", "Secure", "Modern"] },
    5: { id: 5, name: "Protection Dress 2", price: "$539.99", description: "Elegant dress with secure payment features", image: p1, images: [p1, r2, i3], category: ["Protection Payment", "Elegant", "Secure"] },
    6: { id: 6, name: "Protection Dress 3", price: "$519.99", description: "Modern dress with protection payment options", image: i3, images: [i3, p1, r2], category: ["Protection Payment", "Modern"] },
    7: { id: 7, name: "Tulle Dress 1", price: "$489.99", description: "Light tulle dress with romantic flair", image: p2, images: [p2, p3, i2], category: ["Tulle", "Light", "Romantic"] },
    8: { id: 8, name: "Tulle Dress 2", price: "$559.99", description: "Layered tulle dress with soft design", image: p3, images: [p3, p2, i2], category: ["Tulle", "Layered", "Romantic"] },
    9: { id: 9, name: "Tulle Dress 3", price: "$509.99", description: "Classic tulle dress with light fabric", image: i2, images: [i2, p3, p2], category: ["Tulle", "Light"] },
    10: { id: 10, name: "Corset Dress 1", price: "$569.99", description: "Fitted corset dress with elegant design", image: r1, images: [r1, r2, p1], category: ["Corset", "Fitted", "Elegant"] },
    11: { id: 11, name: "Corset Dress 2", price: "$599.99", description: "Structured corset dress with bold style", image: r2, images: [r2, p1, r1], category: ["Corset", "Structured", "Elegant"] },
    12: { id: 12, name: "Corset Dress 3", price: "$549.99", description: "Classic corset dress with fitted silhouette", image: p1, images: [p1, r2, r1], category: ["Corset", "Fitted"] },
  };

  const defaultDress = {
    id: dressId,
    name: `Characteristic Dress ${dressId}`,
    price: "$499.99",
    description: "Default description for characteristic dress.",
    image: i3,
    images: [i3],
    category: ["Generic"],
  };

  const [currentDress, setCurrentDress] = useState(dressData[dressId] || defaultDress);
  const [displayImages, setDisplayImages] = useState(relatedImages.length > 0 ? relatedImages : currentDress.images || [i3]);
  const [mainImage, setMainImage] = useState(displayImages[0]);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [popupMessage, setPopupMessage] = useState({ text: "", isVisible: false, type: "" });

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy URL.");
    });
  };

  const toggleFavorite = () => {
    const isFavorite = favorites.some((fav) => fav.id === currentDress.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== currentDress.id);
      setPopupMessage({ text: "Removed from Favorites!", isVisible: true, type: "remove" });
    } else {
      updatedFavorites = [...favorites, {
        id: currentDress.id,
        name: currentDress.name,
        price: currentDress.price,
        description: currentDress.description,
        image: currentDress.image,
      }];
      setPopupMessage({ text: "Added to Favorites!", isVisible: true, type: "add" });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setTimeout(() => {
      setPopupMessage((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
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

  const popupVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 pt-20 md:pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/wedding-dresses/${currentDress.category[0].toLowerCase().replace(" ", "-")}`} className="text-blue-600 hover:underline">Wedding Dresses</Link>
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
          <div className="w-full md:w-6/12 order-1 md:order-2">
            <img
              src={mainImage}
              alt={currentDress.name}
              className="w-full h-64 md:h-[90vh] object-cover"
            />
          </div>

          {/* Mobile: Thumbnails Below Main Image */}
          <div className="w-full md:w-1/6 flex flex-row md:flex-col gap-2 md:gap-3 justify-center md:justify-start order-2 md:order-1">
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
          <div className="w-full md:w-5/12 flex flex-col gap-4 order-3">
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
              <motion.button
                onClick={toggleFavorite}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  size={20}
                  className={favorites.some((fav) => fav.id === currentDress.id) ? "fill-red-500 text-red-500" : ""}
                />
                Favorite
              </motion.button>
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

      {/* Custom Scrollbar Hiding */}
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

export default CharacteristicsDetail;