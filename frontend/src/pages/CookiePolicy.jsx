import React from 'react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const CookiePolicy = () => {
  return (
    <>
      <SEO
        title="Cookie Policy | Usfah Industry"
        description="Learn how Usfah Industry uses cookies and tracking technologies to ensure site performance and enhance user experience."
        canonical="https://usfahindustry.com/cookie-policy"
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-16 sm:pt-20 text-gray-300 leading-relaxed">
          
          <Breadcrumb items={[{ name: 'Cookie Policy' }]} />

          <h1 className="text-white text-3xl sm:text-5xl font-black mb-6">
            Cookie <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">Policy</span>
          </h1>

          <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl p-6 sm:p-10 border border-white/10 space-y-6">
            <p className="text-sm text-gray-400">Effective Date: January 1, 2026 | Last Updated: September 17, 2026</p>

            <h2 className="text-xl font-bold text-white">1. What Are Cookies</h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you visit our website. They help us make the website function correctly and analyze web traffic.
            </p>

            <h2 className="text-xl font-bold text-white">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic website navigation, form submission, and security features.</li>
              <li><strong>Analytical Cookies:</strong> Help us measure visitor traffic and aggregate user interactions anonymously.</li>
            </ul>

            <h2 className="text-xl font-bold text-white">3. Managing Your Cookie Preferences</h2>
            <p>
              You can choose to disable or selectively turn off cookies in your browser settings. Note that disabling essential cookies may impact website functionality.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
