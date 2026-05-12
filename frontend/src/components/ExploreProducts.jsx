import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { ArrowRight, ArrowLeft, ArrowRight as ArrowRightIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import surgicalImg from "../assets/p1.jfif";
import beautyImg from "../assets/p2.jfif";
import dentalImg from "../assets/p3.jfif";

const products = [
  {
    title: "Surgical Instruments",
    subtitle: "Precision-crafted for medical excellence",
    image: surgicalImg,
    description: "High-precision instruments crafted for hospitals, clinics, and surgical professionals."
  },
  {
    title: "Beauty Instruments",
    subtitle: "Elegance meets performance",
    image: beautyImg,
    description: "Luxury beauty tools designed for salons, spas, and premium beauty specialists."
  },
  {
    title: "Dental Instruments",
    subtitle: "Engineered for perfection",
    image: dentalImg,
    description: "Modern dental instruments engineered for hygiene, durability, and accuracy."
  },
];

const ProductCard = ({ item, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden  bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 shadow-2xl"
      onClick={()=>navigate("/products")}
    >
      <div className="relative h-65 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute  bg-linear-to-t from-black via-black/30 to-transparent"></div>
        <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black text-xs font-bold tracking-wider shadow-lg">
          PREMIUM
        </div>
        <div className="absolute bottom-5 right-5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20">
          <span className="text-[#D4AF37] text-xs font-medium">{item.subtitle}</span>
        </div>
      </div>

      <div className="p-6 relative">
        <h3 className="text-white text-2xl font-bold leading-tight tracking-tight">
          {item.title}
        </h3>
        <p className="text-gray-400 mt-3 text-sm leading-relaxed">
          {item.description}
        </p>
        <button  className="mt-6 inline-flex items-center gap-2 text-[#D4AF37] font-semibold group/btn transition-all duration-300 hover:gap-3">
          <span>Explore Collection</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute inset-0  border-2 border-transparent group-hover:border-[#D4AF37]/30 transition-all duration-500"></div>
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#D4AF37]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </motion.div>
  );
};

const ExploreProducts = () => {
  const swiperRef = useRef(null);

  return (
    <section className="relative py-24 md:py-32 bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#D4AF37]/5 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block text-[#D4AF37] uppercase tracking-[6px] text-sm font-bold mb-3">
            Premium Collection
          </span>
          <h2 className="text-white text-5xl sm:text-6xl lg:text-7xl font-black mt-4 leading-[1.1] tracking-tight">
            Crafted for
            <span className="block text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">
              Global Excellence
            </span>
          </h2>
          <p className="text-gray-400 mt-6 text-base max-w-2xl mx-auto leading-relaxed">
            Discover premium surgical, beauty, and dental instruments engineered with precision and export-quality standards for global professionals.
          </p>
        </motion.div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} index={index} />
          ))}
        </div>

        <div className="lg:hidden relative">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 group"
              aria-label="Previous slide"
            >
              <ArrowLeft size={20} className="text-white group-hover:text-black transition-colors" />
            </button>
          </div>
          
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 group"
              aria-label="Next slide"
            >
              <ArrowRightIcon size={20} className="text-white group-hover:text-black transition-colors" />
            </button>
          </div>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination, Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            centeredSlides={true}
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
              640: {
                slidesPerView: 1.2,
                centeredSlides: true,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 24,
              },
            }}
            className="product-slider"
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="py-2">
                  <ProductCard item={item} index={index} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .product-slider {
          padding: 20px 0 40px 0;
        }
        
        .product-slider .swiper-pagination {
          position: relative;
          margin-top: 32px;
          bottom: 0;
        }
        
        .product-slider .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .product-slider .swiper-pagination-bullet-active {
          width: 28px;
          background: linear-gradient(135deg, #D4AF37, #C9A227);
          border-radius: 20px;
        }
        
        @media (max-width: 1023px) {
          .product-slider {
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default ExploreProducts;