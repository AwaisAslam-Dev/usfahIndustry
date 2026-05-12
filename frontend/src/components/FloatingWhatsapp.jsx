import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

const FloatingWhatsapp = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // WhatsApp number (replace with your actual number)
  const phoneNumber = "+923096581997"; // Replace with your WhatsApp number
  const message = "Hello! I want to contact you";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Show tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* WhatsApp Button - Always visible */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        <div
          className={`absolute bottom-16 right-0 mb-2 transition-all duration-300 ${
            showTooltip ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="relative bg-linear-to-r from-[#25D366] to-[#128C7E] rounded-2xl px-4 py-2 shadow-2xl">
            <p className="text-white text-sm whitespace-nowrap font-medium flex items-center gap-2">
              <FaWhatsapp className="w-4 h-4" />
              Chat with us on WhatsApp! 💬
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-4 w-3 h-3 bg-[#128C7E] rotate-45" />
          </div>
        </div>

        {/* Main Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: '0 10px 25px -5px rgba(37, 211, 102, 0.4), 0 8px 10px -6px rgba(37, 211, 102, 0.2)'
          }}
        >
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: '#25D366' }} />
          
          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-full animate-pulse opacity-50" style={{ backgroundColor: '#25D366' }} />
          
          {/* WhatsApp Icon from react-icons */}
          <FaWhatsapp className="w-8 h-8 text-white relative z-10" />
          
          {/* Hover Glow */}
          <div 
            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(circle, rgba(37,211,102,0.4) 0%, rgba(37,211,102,0) 70%)',
              transform: 'scale(1.5)'
            }}
          />
        </a>

        {/* Status Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsapp;