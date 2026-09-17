import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const faqsData = [
  {
    question: "What instruments does Usfah Industry specialize in?",
    answer: "Usfah Industry specializes in manufacturing export-quality Surgical Instruments, Dental Tools (Extracting Forceps, Root Elevators, Scalers), and Luxury Beauty & Manicure Tools crafted from medical-grade stainless steel."
  },
  {
    question: "What stainless steel grades are used in manufacturing?",
    answer: "We utilize high-grade AISI 410, 420, and 440 martensitic stainless steels for sharp cutting edges, and AISI 304 / 316 austenitic steels for maximum corrosion resistance under autoclave sterilization."
  },
  {
    question: "Do you offer custom OEM/ODM branding and private labeling?",
    answer: "Yes, we provide full OEM/ODM manufacturing services, laser logo marking, custom packaging, and technical specifications tailored for international distributors and hospital buyers."
  },
  {
    question: "What quality certifications do Usfah Industry instruments hold?",
    answer: "Our manufacturing facility in Sialkot operates under strict ISO 13485 quality management systems, CE compliance, and international healthcare regulatory standards."
  },
  {
    question: "How can I request wholesale pricing or a PDF product catalog?",
    answer: "You can download our PDF catalog directly from the Catalogue page or contact our export sales team via our Contact page or WhatsApp at +92 346 0424486."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#D4AF37] uppercase tracking-[4px] text-xs font-bold mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-black mt-1 leading-tight">
            Got Questions? We Have <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">Answers</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about our surgical manufacturing, steel grades, custom orders, and export standards.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/40"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white font-bold text-base sm:text-lg focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-[#D4AF37] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#D4AF37] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-gray-300 text-sm leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
