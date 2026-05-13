import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Desktop Images
import hero1 from "../assets/slideronedesktopimg.webp";
import hero2 from "../assets/slidertwodesktopimg.webp";
import hero3 from "../assets/sliderthreedesktopimg.webp";

// Mobile Images (Add your mobile images here)
import hero1Mobile from "../assets/slideronedesktopimg.webp";
import hero2Mobile from "../assets/slidertwodesktopimg.webp";
import hero3Mobile from "../assets/sliderthreedesktopimg.webp";

const slides = [
  {
    desktopImage: hero1,
    mobileImage: hero1Mobile,
    title: "Precision Surgical Instruments",
    highlightWord: "Surgical",
    subtitle: "Premium quality instruments crafted for hospitals, clinics, and professionals worldwide.",
    button: "Explore Surgical",
  },
  {
    desktopImage: hero2,
    mobileImage: hero2Mobile,
    title: "Luxury Beauty Instruments",
    highlightWord: "Beauty",
    subtitle: "Elegant and durable beauty tools designed for salons, spas, and skincare experts.",
    button: "Explore Beauty",
  },
  {
    desktopImage: hero3,
    mobileImage: hero3Mobile,
    title: "Advanced Dental Instruments",
    highlightWord: "Dental",
    subtitle: "Trusted dental tools engineered for precision, hygiene, and modern treatment.",
    button: "Explore Dental",
  },
];

const TypingText = ({ texts, delay = 100 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (!isDeleting && currentText !== fullText) {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      } else if (isDeleting && currentText !== "") {
        setCurrentText(fullText.slice(0, currentText.length - 1));
      } else if (currentText === fullText && !isDeleting) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (currentText === "" && isDeleting) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, delay]);

  return (
    <span className="relative">
      {currentText}
      <span className="inline-block w-0.5 h-6 ml-1 bg-[#D4AF37] animate-pulse"></span>
    </span>
  );
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-162.5 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1400}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-screen min-h-162.5 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${isMobile ? slide.mobileImage : slide.desktopImage})`,
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-black/30"></div>

              {/* Gold Gradient Glow */}
              <div className="absolute inset-0 bg-linear-to-r from-[#0B0B0D]/80 via-transparent to-[#D4AF37]/5"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="inline-block text-[#D4AF37] text-sm sm:text-base uppercase tracking-[6px] font-bold mb-4 bg-linear-to-r from-[#D4AF37] to-[#FFE793] bg-clip-text">
                        Premium Instruments Collection
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="mt-2"
                    >
                      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.2] tracking-tight">
                        {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#FFE793] to-[#C9A227] bg-clip-text">
                          {slide.highlightWord}
                        </span>
                      </h1>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="mt-6"
                    >
                      <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                        <TypingText 
                          texts={[
                            "Premium quality instruments crafted for hospitals worldwide",
                            "Elegant beauty tools for salons and skincare experts", 
                            "Trusted dental tools for precision and modern treatment"
                          ]} 
                          delay={80}
                        />
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2 }}
                      className="mt-10 flex flex-col sm:flex-row gap-5"
                    >
                      <button  onClick={()=>navigate("/products")} className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 shadow-2xl">
                        <div className="absolute inset-0 bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227]"></div>
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <span className="relative z-10 text-black flex items-center gap-2">
                          {slide.button}
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                          </svg>
                        </span>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          position: absolute !important;
          bottom: 30px !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 20 !important;
          display: flex !important;
          justify-content: center !important;
          gap: 12px !important;
        }

        .swiper-pagination-bullet {
          width: 40px !important;
          height: 4px !important;
          background: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
          border-radius: 4px !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
        }

        .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #D4AF37, #FFE793) !important;
          width: 60px !important;
          opacity: 1 !important;
        }

        .swiper-pagination-bullet:hover {
          background: #D4AF37 !important;
          opacity: 0.8 !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;