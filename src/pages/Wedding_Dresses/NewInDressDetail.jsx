import { motion } from "framer-motion";
import { useParams, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import i2 from "../../assets/i2.jpg";
import i3 from "../../assets/i3.jpg";
import r1 from "../../assets/r1.jpg";
import r2 from "../../assets/r2.jpg";
import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";

function NewInDressDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { relatedImages = [], description = "" } = location.state || {};

  const dressData = {
    1: {
      name: "New Wedding Dress 1",
      price: "$499.99",
      description: "A stunning new addition with elegant lace and a flattering A-line silhouette.",
      images: [i2, i3, r1],
    },
    2: {
      name: "New Wedding Dress 2",
      price: "$599.99",
      description: "A modern princess-style dress with a satin finish and sweetheart neckline.",
      images: [r2, p1, i3],
    },
    3: {
      name: "New Wedding Dress 3",
      price: "$449.99",
      description: "A vintage-inspired chiffon dress with a scoop neckline and knee-length hem.",
      images: [p2, p3, i2],
    },
    4: {
      name: "New Wedding Dress 1",
      price: "$499.99",
      description: "A stunning new addition with elegant lace and a flattering A-line silhouette.",
      images: [i2, i3, r1],
    },
    5: {
      name: "New Wedding Dress 2",
      price: "$599.99",
      description: "A modern princess-style dress with a satin finish and sweetheart neckline.",
      images: [r2, p1, i3],
    },
    6: {
      name: "New Wedding Dress 3",
      price: "$449.99",
      description: "A vintage-inspired chiffon dress with a scoop neckline and knee-length hem.",
      images: [p2, p3, i2],
    },
    7: {
      name: "New Wedding Dress 1",
      price: "$499.99",
      description: "A stunning new addition with elegant lace and a flattering A-line silhouette.",
      images: [i2, i3, r1],
    },
    8: {
      name: "New Wedding Dress 2",
      price: "$599.99",
      description: "A modern princess-style dress with a satin finish and sweetheart neckline.",
      images: [r2, p1, i3],
    },
    9: {
      name: "New Wedding Dress 3",
      price: "$449.99",
      description: "A vintage-inspired chiffon dress with a scoop neckline and knee-length hem.",
      images: [p2, p3, i2],
    },
  };

  const dress =
    dressData[id] || {
      name: `New Wedding Dress ${id}`,
      price: "$499.99",
      description: "Default description for new wedding dress.",
      images: [i3],
    };
  const displayImages = relatedImages.length > 0 ? relatedImages : dress.images;
  const displayDescription = description || dress.description;

  const [mainImage, setMainImage] = useState(displayImages[0]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20 md:pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/wedding-dresses/new-in"
            className="text-blue-600 hover:underline"
          >
            New In Wedding Dresses
          </Link>
          <span className="mx-2">/</span>
          <span>{id}</span>
        </div>

        {/* Heading */}
        <motion.h1
          className="text-3xl md:text-4xl font-['Brush_Script_MT'] text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {dress.name}
        </motion.h1>

        {/* Image Layout */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Main Image */}
          <div className="w-full md:w-2/3">
            <img
              src={mainImage}
              alt={dress.name}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden">
            {displayImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${dress.name} ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${
                  mainImage === img ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="text-center md:text-left">
          <p className="text-gray-600 mb-4">{displayDescription}</p>
          <p className="text-xl font-semibold">{dress.price}</p>
        </div>
      </div>
    </div>
  );
}

export default NewInDressDetail;