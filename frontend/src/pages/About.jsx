import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Globe, 
  Shield, 
  CheckCircle,
  TrendingUp,
  Heart,
  Target
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const About = () => {
    const navigate = useNavigate();
  
  const stats = [
    { id: 1, icon: Globe, value: '50+', label: 'Countries Served' },
    { id: 2, icon: Users, value: '10,000+', label: 'Happy Customers' },
    { id: 3, icon: Award, value: '15+', label: 'Years of Excellence' },
    { id: 4, icon: Shield, value: '100%', label: 'Quality Assurance' },
  ];

  const values = [
    {
      id: 1,
      icon: Target,
      title: 'Precision First',
      description: 'Every instrument is crafted with meticulous attention to detail and accuracy.'
    },
    {
      id: 2,
      icon: Heart,
      title: 'Customer Centric',
      description: 'Your satisfaction drives everything we do. We put our customers first.'
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Continuous Innovation',
      description: 'We constantly evolve our products to meet modern medical standards.'
    },
    {
      id: 4,
      icon: Shield,
      title: 'Uncompromising Quality',
      description: 'Only the finest materials and strictest quality controls make the cut.'
    }
  ];

  const certifications = [
    'ISO 13485 Certified',
    'CE Mark Certified',
    'FDA Approved',
    'Quality Management System',
    'Sterilization Certified',
    'Medical Device Regulation'
  ];

  return (
    <>
    <Helmet>
  <title>About Us - Usfah Industry</title>
  <meta
    name="description"
    content="Learn more about our company and products."
  />
</Helmet>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#D4AF37]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block text-[#D4AF37] uppercase tracking-[6px] text-sm font-bold mb-3">
              Our Story
            </span>
            <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-black mt-4 leading-[1.2] tracking-tight">
              Crafting Excellence in
              <span className="block text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">
                Medical Instruments
              </span>
            </h1>
            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
              For over a decade, we've been at the forefront of surgical, beauty, and dental instrument manufacturing, 
              delivering precision tools that healthcare professionals trust worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-[#D4AF37]/10 mb-4">
                  <stat.icon size={32} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 md:py-32 bg-linear-to-brrom-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                <Target size={32} className="text-[#D4AF37]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To empower healthcare and beauty professionals worldwide with precision-crafted instruments 
                that deliver exceptional performance, reliability, and value. We're committed to advancing 
                medical excellence through innovation and uncompromising quality standards.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                <Globe size={32} className="text-[#D4AF37]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                To be the global benchmark for premium medical and beauty instruments, recognized for our 
                unwavering commitment to quality, innovation, and customer satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-24 bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block text-[#D4AF37] uppercase tracking-[6px] text-sm font-bold mb-3">
              Our Core Values
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-400 text-lg">
              These principles guide everything we do, from design to delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-linear-to-br from-[#0B0B0D] to-[#0A0A0D] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-[#D4AF37]/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon size={28} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-16 bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Certifications & Standards</h2>
            <p className="text-gray-400">Recognized worldwide for quality and excellence</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold"
              >
                <CheckCircle size={14} />
                <span>{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-linear-to-r from-[#D4AF37] to-[#C9A227] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Ready to Experience Excellence?
            </h2>
            <p className="text-black/70 text-lg mb-8">
              Join thousands of satisfied professionals who trust our instruments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={()=>navigate("/products")}  className="px-8 py-3 rounded-xl bg-black text-white font-bold hover:scale-105 transition-all duration-300">
                Explore Products
              </button>
              <button onClick={()=>navigate("/contact")}  className="px-8 py-3 rounded-xl border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all duration-300">
                Contact Us Today
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;