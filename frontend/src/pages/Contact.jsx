import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { 
  FaFacebookF,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      id: 1,
      icon: Phone,
      title: 'Call or WhatsApp',
      details: ['+92 346 0424486', '+92 300 0000000'],
      action: 'tel:+923460424486',
      color: '#25D366'
    },
    {
      id: 2,
      icon: Mail,
      title: 'Email Sales & Support',
      details: ['ali.ghouri770@gmail.com', 'info@usfahindustry.com'],
      action: 'mailto:ali.ghouri770@gmail.com',
      color: '#D4AF37'
    },
    {
      id: 3,
      icon: MapPin,
      title: 'Manufacturing Facility',
      details: ['Ugoki Road, Sialkot', 'Punjab 51310', 'Pakistan'],
      color: '#D4AF37'
    },
    {
      id: 4,
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Saturday: 8:00 AM - 7:00 PM', 'Sunday: Closed'],
      color: '#D4AF37'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 800);
  };

  // Contact Page FAQ Schema
  const contactFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What instruments does Usfah Industry manufacture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Usfah Industry manufactures ISO-certified surgical instruments, dental tools, extracting forceps, root elevators, periodontal scalers, and luxury beauty tools."
        }
      },
      {
        "@type": "Question",
        "name": "How can I request a custom OEM order catalog?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact us via our website contact form with the subject 'Wholesale & OEM Inquiry' or email ali.ghouri770@gmail.com directly."
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Contact Us | Usfah Industry - Surgical & Dental Tools Manufacturer"
        description="Get in touch with Usfah Industry in Sialkot, Pakistan for wholesale surgical instrument quotes, OEM/ODM dental tools manufacturing, and product inquiries."
        keywords="contact Usfah Industry, surgical instruments manufacturer Sialkot, wholesale dental tools, contact surgical supplier,surgical instruments manufacturer Pakistan,
surgical instruments supplier Pakistan,
surgical instruments manufacturer Sialkot,
surgical instrument manufacturer,
surgical instrument supplier,
surgical instruments exporter Pakistan,
surgical instruments exporter,
surgical instruments Pakistan,
surgical instruments Sialkot,
medical instruments manufacturer Pakistan,
medical instruments supplier Pakistan,
surgical instrument company Pakistan,
surgical instrument factory Pakistan,
surgical instruments wholesale,
surgical instruments supplier Sialkot,
surgical instrument manufacturer Sialkot Pakistan,
contact surgical instruments manufacturer,
contact surgical instrument supplier,
surgical instruments quote,
surgical instruments wholesale inquiry,
surgical instruments supplier inquiry,
surgical instruments manufacturer contact,
request surgical instruments quote,
surgical instrument quotation,
surgical instruments for distributors,
surgical instruments for international buyers"
        canonical="https://usfahindustry.com/contact"
        schemaData={contactFaqSchema}
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D]">
        
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
            <Breadcrumb items={[{ name: 'Contact Us' }]} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block text-[#D4AF37] uppercase tracking-[4px] text-xs font-bold mb-2">
                CONTACT SURGICAL INSTRUMENTS MANUFACTURER
              </span>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mt-1 leading-tight">
                Connect With <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">Usfah Industry</span>
              </h1>
              <p className="text-gray-400 mt-4 text-sm max-w-2xl mx-auto leading-relaxed">
                Contact Usfah Industry, a trusted surgical instruments supplier and medical tools manufacturer in Sialkot Pakistan. Get in touch for wholesale quotations, custom manufacturing specs, or product inquiries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] p-6 rounded-2xl border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4">
                  <info.icon size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{info.title}</h3>
                {info.details.map((line, i) => (
                  <p key={i} className="text-gray-400 text-xs sm:text-sm">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            
            {/* Contact Form */}
            <motion.div 
              className="lg:w-1/2 bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] p-6 sm:p-8 rounded-2xl border border-white/10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white text-2xl font-bold mb-2 flex items-center gap-2">
                <MessageSquare size={22} className="text-[#D4AF37]" />
                Send Us a Message
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mb-6">
                Fill out the form below and our export specialists will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-center">
                  <CheckCircle size={48} className="text-[#D4AF37] mx-auto mb-3" />
                  <h3 className="text-white text-xl font-bold mb-1">Message Sent Successfully!</h3>
                  <p className="text-gray-300 text-sm">Thank you for reaching out to Usfah Industry. We will review your inquiry and get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-lg bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-300 font-semibold mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 font-semibold mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-300 font-semibold mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 300 1234567"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 font-semibold mb-1">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111115] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] text-sm"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Wholesale & OEM Catalog">Wholesale & OEM Catalog</option>
                        <option value="Surgical Instruments Order">Surgical Instruments Order</option>
                        <option value="Dental Instruments Order">Dental Instruments Order</option>
                        <option value="Beauty Instruments Order">Beauty Instruments Order</option>
                        <option value="Custom Manufacturing Spec">Custom Manufacturing Spec</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 font-semibold mb-1">Message Details *</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please specify instrument names, quantities, or technical requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50"
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map & Social */}
            <motion.div 
              className="lg:w-1/2 flex flex-col gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 p-5 flex-1 flex flex-col">
                <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-[#D4AF37]" />
                  Facility Location - Sialkot, Pakistan
                </h3>
                <div className="rounded-xl overflow-hidden flex-1 min-h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108252.62888295844!2d74.47568555!3d32.49245195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eea23f208170b%3A0x868352b2bc82fb5a!2sSialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Sialkot Usfah Industry Location"
                    className="w-full h-full min-h-[300px]"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;