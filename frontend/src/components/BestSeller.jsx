import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight as ArrowRightIcon, Heart, Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Items from "./Items";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ShopContext } from "../context/ShopContext";

const BestSeller = () => {
  const swiperRef = useRef(null);
  
  // Safely get context with error handling
  let products = [];
  try {
    const context = useContext(ShopContext);
    products = context?.products || [];
  } catch (error) {
    console.error("Error accessing ShopContext:", error);
    products = [];
  }
  
  // Filter products where isBestseller is true
  const bestsellerProducts = products.filter(product => product?.bestseller === true);

  // Animation variants for Items component
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // If no bestseller products, don't render
  if (!bestsellerProducts || bestsellerProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 md:py-20 bg-linear-to-b from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-[#D4AF37]/5 blur-[100px] rounded-full"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-75 h-75 bg-[#D4AF37]/5 blur-[80px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <span className="inline-block text-[#D4AF37] uppercase tracking-[4px] text-xs font-bold mb-2">
            Best Selling Products
          </span>
          
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mt-3 leading-tight text-center">
            Our <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">
              Bestsellers
            </span>
          </h2>
          
          <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto leading-relaxed text-center">
            Discover our most sought-after instruments trusted by medical and beauty professionals worldwide.
          </p>
        </motion.div>

        {/* Desktop Grid - Using Items component */}
        <div className="hidden lg:block">
          <Items 
            products={bestsellerProducts}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </div>

        {/* Mobile Slider - For smaller screens */}
        <div className="lg:hidden relative px-4">
          {/* Custom Navigation Buttons */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 group"
              aria-label="Previous slide"
            >
              <ArrowLeft size={16} className="text-white group-hover:text-black transition-colors" />
            </button>
          </div>
          
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 group"
              aria-label="Next slide"
            >
              <ArrowRightIcon size={16} className="text-white group-hover:text-black transition-colors" />
            </button>
          </div>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination, Autoplay, Navigation]}
            slidesPerView={2}
            spaceBetween={12}
            centeredSlides={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            loop={false}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 15,
              },
            }}
            className="bestseller-slider"
          >
            {bestsellerProducts.map((product, index) => (
              <SwiperSlide key={product.id || index}>
                <div className="py-2">
                  {/* Mini card for mobile slider */}
                  <div className="group relative overflow-hidden bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-xl border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300">
                    <Link to={`/productdetails/${product.id}`} className="block">
                      <div className="relative aspect-square overflow-hidden bg-linear-to-br from-gray-900 to-black">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex gap-1">
                          {product.isNew && (
                            <span className="px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[8px] font-bold uppercase">
                              New
                            </span>
                          )}
                          {product.isBestseller && (
                            <span className="px-1.5 py-0.5 rounded-md bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black text-[8px] font-bold uppercase">
                              Best
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-[#D4AF37] transition-all duration-300"
                        >
                          <Heart size={12} className="text-white" />
                        </button>
                      </div>

                      <div className="p-2">
                        <div className="mb-0.5">
                          <span className="text-[8px] text-[#D4AF37] tracking-wider uppercase font-semibold">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-xs mb-0.5 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-[#D4AF37] font-bold text-xs">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-gray-500 text-[8px] line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <button className="w-full py-1 rounded-lg bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-semibold text-[10px] flex items-center justify-center gap-1">
                          <Eye size={10} />
                          View
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-10">
          <Link to="/products">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-semibold text-base hover:gap-3 transition-all duration-300">
              View All Products
              <ArrowRightIcon size={18} />
            </button>
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .bestseller-slider {
          padding: 10px 0 35px 0;
        }
        
        .bestseller-slider .swiper-pagination {
          position: relative;
          margin-top: 20px;
          bottom: 0;
        }
        
        .bestseller-slider .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .bestseller-slider .swiper-pagination-bullet-active {
          width: 20px;
          background: linear-gradient(135deg, #D4AF37, #C9A227);
          border-radius: 20px;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 1023px) {
          .bestseller-slider {
            padding-left: 8px;
            padding-right: 8px;
          }
        }
      `}</style>
    </section>
  );
};

export default BestSeller;``