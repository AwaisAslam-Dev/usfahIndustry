import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, BookOpen, Mail, AlertTriangle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Usfah Industry"
        description="The page you are looking for does not exist or has been moved. Explore our surgical, dental, and beauty instruments catalog."
        canonical="https://usfahindustry.com/404"
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] flex items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center justify-center p-6 rounded-full bg-linear-to-br from-[#1A1A1D] to-[#0F0F12] border border-[#D4AF37]/30 shadow-2xl"
          >
            <AlertTriangle size={64} className="text-[#D4AF37]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-7xl sm:text-9xl font-black text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text tracking-widest mb-4"
          >
            404
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-4xl font-bold text-white mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Sorry, the page you are looking for doesn't exist, was removed, or had its name changed. 
            Navigate back home or check out our popular pages below.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10"
          >
            <Link
              to="/"
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white transition-all duration-300 flex flex-col items-center gap-2 group"
            >
              <Home size={24} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Home</span>
            </Link>

            <Link
              to="/products"
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white transition-all duration-300 flex flex-col items-center gap-2 group"
            >
              <ShoppingBag size={24} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Products</span>
            </Link>

            <Link
              to="/blog"
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white transition-all duration-300 flex flex-col items-center gap-2 group"
            >
              <BookOpen size={24} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Blog</span>
            </Link>

            <Link
              to="/contact"
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white transition-all duration-300 flex flex-col items-center gap-2 group"
            >
              <Mail size={24} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Contact</span>
            </Link>
          </motion.div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-bold hover:scale-105 transition-all shadow-xl"
          >
            <ArrowLeft size={18} />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
