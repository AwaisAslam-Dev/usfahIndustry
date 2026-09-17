import React from 'react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const TermsConditions = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions | Usfah Industry"
        description="Review the official Terms & Conditions governing the use of Usfah Industry website, product orders, OEM/ODM manufacturing, and intellectual property."
        canonical="https://usfahindustry.com/terms-and-conditions"
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-16 sm:pt-20 text-gray-300 leading-relaxed">
          
          <Breadcrumb items={[{ name: 'Terms & Conditions' }]} />

          <h1 className="text-white text-3xl sm:text-5xl font-black mb-6">
            Terms & <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">Conditions</span>
          </h1>

          <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl p-6 sm:p-10 border border-white/10 space-y-6">
            <p className="text-sm text-gray-400">Effective Date: January 1, 2026 | Last Updated: September 17, 2026</p>

            <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using usfahindustry.com, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use this website.
            </p>

            <h2 className="text-xl font-bold text-white">2. Product Specifications & Custom Orders</h2>
            <p>
              Usfah Industry specializes in manufacturing surgical, dental, and beauty instruments. Product descriptions, technical dimensions, and images are provided for reference. Custom OEM/ODM orders are subject to written purchase agreement specifications.
            </p>

            <h2 className="text-xl font-bold text-white">3. Intellectual Property Rights</h2>
            <p>
              All original content, branding, logos, graphics, catalog layouts, and code on this site are the exclusive intellectual property of Usfah Industry and protected under applicable copyright laws.
            </p>

            <h2 className="text-xl font-bold text-white">4. Limitation of Liability</h2>
            <p>
              Usfah Industry shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or website services.
            </p>

            <h2 className="text-xl font-bold text-white">5. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of Pakistan, without regard to conflict of law principles.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
