import React from 'react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const Disclaimer = () => {
  return (
    <>
      <SEO
        title="Medical & Product Disclaimer | Usfah Industry"
        description="Official product and medical disclaimer for Usfah Industry surgical, dental, and beauty instrument manufacturing."
        canonical="https://usfahindustry.com/disclaimer"
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-16 sm:pt-20 text-gray-300 leading-relaxed">
          
          <Breadcrumb items={[{ name: 'Disclaimer' }]} />

          <h1 className="text-white text-3xl sm:text-5xl font-black mb-6">
            Product & Legal <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">Disclaimer</span>
          </h1>

          <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl p-6 sm:p-10 border border-white/10 space-y-6">
            <p className="text-sm text-gray-400">Effective Date: January 1, 2026 | Last Updated: September 17, 2026</p>

            <h2 className="text-xl font-bold text-white">1. Professional Medical Use Disclaimer</h2>
            <p>
              The surgical, dental, and medical instruments presented on this website are intended exclusively for use by licensed medical professionals, qualified surgeons, dentists, and certified healthcare practitioners. 
            </p>

            <h2 className="text-xl font-bold text-white">2. Cleaning & Sterilization Requirements</h2>
            <p>
              All instruments supplied non-sterile must be cleaned, disinfected, and autoclaved according to certified healthcare facility protocols prior to clinical or surgical use.
            </p>

            <h2 className="text-xl font-bold text-white">3. Information Accuracy</h2>
            <p>
              While Usfah Industry strives to maintain accurate and up-to-date product specifications, variations in manual crafting or continuous design improvements may result in minor dimensional tolerances.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
