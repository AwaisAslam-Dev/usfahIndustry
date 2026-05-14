import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { 
  FaInstagram,
  FaFacebookF,
} from 'react-icons/fa';
import logo from '../assets/navbarlogo.png';

const Footer = () => {
  return (
    <footer className="relative bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] border-t border-white/10 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-[#D4AF37]/5 blur-[100px] rounded-full"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"60\" height=\"60\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 60 0 L 0 0 0 60\" fill=\"none\" stroke=\"%23ffffff\" stroke-width=\"0.5\" stroke-opacity=\"0.03\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" fill=\"url(%23grid)\"/%3E%3C/svg%3E')"
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-white/10 pb-8 md:pb-10">
          
          {/* Logo and Description */}
          <div className="md:max-w-md">
            <NavLink to="/" className="inline-block">
              <img
                src={logo}
                alt="Logo"
                className="w-32 sm:w-36 md:w-40 object-contain hover:scale-105 transition duration-300"
              />
            </NavLink>
            <p className="mt-5 text-gray-400 text-sm leading-relaxed">
              Premium quality surgical, beauty, and dental instruments crafted with precision and excellence. 
              Trusted by medical and beauty professionals worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="https://www.facebook.com/share/1ENJsxDC4L/?mibextid=wwXIfr" 
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              
              <a 
                href="https://www.instagram.com/usfah_industry?igsh=MW5maGQ5NW9wOGQ0aA%3D%3D&utm_source=qr" 
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
             
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-[#D4AF37] to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  Contact Us
                </NavLink>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-[#D4AF37] to-transparent"></span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-[#D4AF37]" />
                <span>+92 346 0424486</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-[#D4AF37]" />
                <span>ali.ghouri770@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-[#D4AF37]" />
                <span>Punjab, Sialkot, Ugoki Road</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-6 md:py-8 text-center">
          <p className="text-gray-500 text-xs md:text-sm">
            Copyright © 2026 Premium Instruments. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-xs md:text-sm mt-2">
            Powered by <span className="text-[#D4AF37] font-semibold">Awais</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;