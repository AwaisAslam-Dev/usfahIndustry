import React from 'react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Usfah Industry"
        description="Read the Privacy Policy of Usfah Industry. Learn how we collect, protect, and process user data in accordance with international privacy laws."
        canonical="https://usfahindustry.com/privacy-policy"
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-16 sm:pt-20 text-gray-300 leading-relaxed">
          
          <Breadcrumb items={[{ name: 'Privacy Policy' }]} />

          <h1 className="text-white text-3xl sm:text-5xl font-black mb-6">
            Privacy <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">Policy</span>
          </h1>

          <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl p-6 sm:p-10 border border-white/10 space-y-6">
            <p className="text-sm text-gray-400">Effective Date: January 1, 2026 | Last Updated: September 17, 2026</p>

            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>
              Usfah Industry ("we", "our", or "us") respects your privacy and is committed to protecting the personal data of our website visitors, clients, and partners. This Privacy Policy details how we collect, use, disclose, and safeguard your information when you visit usfahindustry.com.
            </p>

            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when inquiring about products, submitting contact forms, or requesting wholesale quotes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact details: Name, business email, telephone number, mailing address, and country.</li>
              <li>Product Inquiry Data: Specifications, instrument customization requests, and message subject.</li>
              <li>Technical Log Data: IP address, browser type, operating system, and pages visited via standard analytical cookies.</li>
            </ul>

            <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
            <p>Your information is processed strictly for legitimate business purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to inquiries and process surgical/dental/beauty product catalog orders.</li>
              <li>To improve website performance, security, and user experience.</li>
              <li>To send essential order updates, technical specifications, and legal notices.</li>
            </ul>

            <h2 className="text-xl font-bold text-white">4. Data Security</h2>
            <p>
              We implement industry-standard administrative, technical, and physical security measures (including SSL/TLS encryption) to protect your personal information against unauthorized access, loss, or alteration.
            </p>

            <h2 className="text-xl font-bold text-white">5. Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact us at <a href="mailto:ali.ghouri770@gmail.com" className="text-[#D4AF37] hover:underline">ali.ghouri770@gmail.com</a> or call +92 346 0424486.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
