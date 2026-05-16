import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Items = ({ products, containerVariants, itemVariants }) => {
  const [likedProducts, setLikedProducts] = React.useState({});
  const toggleLike = (productId, e) => {
    e.preventDefault();
    setLikedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          className="group"
        >
          <Link to={`/productdetails/${product.id}`} className="block">
            <div className="relative bg-linear-to-brrom-[#0F0F12] to-[#0A0A0D] overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-[#D4AF37]/40">
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-linear-to-br from-gray-900 to-black">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  
                  {product.isBestseller && (
                    <span className="px-2 py-1 rounded-md bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black text-xs font-bold uppercase">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Wishlist Button - Increased size for desktop */}
                <button
                  onClick={(e) => toggleLike(product.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-[#D4AF37] transition-all duration-300"
                >
                  <Heart 
                    size={22} 
                    className={likedProducts[product.id] ? "fill-red-500 text-red-500" : "text-white"}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-5">
                {/* Category - Increased text size for desktop */}
                <div className="mb-1">
                  <span className="text-[10px] md:text-xs text-[#D4AF37] tracking-wider uppercase font-semibold">
                    {product.category}
                  </span>
                </div>
                
                {/* Product Name - Increased text size for desktop */}
                <h3 className="text-white font-bold text-sm md:text-lg mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                  {product.name}
                </h3>
               
                <button className="w-full py-2 md:py-3 rounded-lg bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300">
                  <Eye size={18} className="md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Quick View</span>
                  <span className="inline sm:hidden">View</span>
                </button>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Items;