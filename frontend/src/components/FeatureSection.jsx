import React from 'react';
import { motion } from 'framer-motion';

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      icon: '📦',
      title: 'Free Shipping Worldwide',
      description: 'Enjoy fast, free delivery on every order across the globe. No minimum purchase required.',
    },
    {
      id: 2,
      icon: '↩️',
      title: 'Easy 7 Days Return',
      description: 'Change your mind? No worries. Return any item within 7 days for a full refund.',
    },
    {
      id: 3,
      icon: '💬',
      title: '24/7 Expert Support',
      description: 'Our dedicated team is here for you around the clock. Get professional help anytime.',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D]">
      {/* Only top decorative line - bottom line removed */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-rrom-transparent via-[#D4AF37]/20 to-transparent" />

      {/* Section Header - Simplified */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Why Choose Us
          </h2>
          
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Experience the best in class service and quality with every purchase.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={itemVariants}
            className="group"
          >
            {/* Simple Card */}
            <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 rounded-lg p-6 h-full flex flex-col items-center text-center hover:border-[#D4AF37]/30 transition-all duration-300">
              
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                <span className="text-2xl">{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureSection;