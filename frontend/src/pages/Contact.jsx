import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle
} from 'lucide-react';
import { 
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPinterestP
} from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      id: 1,
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (212) 456-7890', '+1 (212) 456-7891'],
      action: 'tel:+12124567890',
      color: '#25D366'
    },
    {
      id: 2,
      icon: Mail,
      title: 'Email Us',
      details: ['sales@premiuminstruments.com', 'support@premiuminstruments.com'],
      action: 'mailto:support@premiuminstruments.com',
      color: '#D4AF37'
    },
    {
      id: 3,
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Medical District', 'New York, NY 10001', 'United States'],
      color: '#D4AF37'
    },
    {
      id: 4,
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm', 'Sunday: Closed'],
      color: '#D4AF37'
    }
  ];

  const socialLinks = [
    { icon: FaWhatsapp, name: 'WhatsApp', color: '#25D366', link: 'https://wa.me/12124567890' },
    { icon: FaFacebookF, name: 'Facebook', color: '#1877F2', link: 'https://facebook.com' },
    { icon: FaTwitter, name: 'Twitter', color: '#1DA1F2', link: 'https://twitter.com' },
    { icon: FaLinkedinIn, name: 'LinkedIn', color: '#0077B5', link: 'https://linkedin.com' },
    { icon: FaInstagram, name: 'Instagram', color: '#E4405F', link: 'https://instagram.com' },
    { icon: FaYoutube, name: 'YouTube', color: '#FF0000', link: 'https://youtube.com' },
    { icon: FaPinterestP, name: 'Pinterest', color: '#BD081C', link: 'https://pinterest.com' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D]">
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#D4AF37]/5 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-[#D4AF37] uppercase tracking-[4px] text-xs font-bold mb-2">
              GET IN TOUCH
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mt-3 leading-[1.2] tracking-tight">
              Let's Start a
              <span className="block text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">
                Conversation
              </span>
            </h1>
            <p className="text-gray-400 mt-4 text-sm max-w-2xl mx-auto leading-relaxed">
              Have questions about our products or need assistance? Our team is here to help you. 
              Reach out to us through any channel below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          

          {/* Map and Social Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Map */}
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 p-4 md:p-5">
                <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-[#D4AF37]" />
                  Find Us Here
                </h3>
                <div className="rounded-xl overflow-hidden h-87.5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bbddbc5%3A0xbb806d58b33bf77e!2sMedical%20District%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1643832742191!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="Office Location"
                  />
                </div>
              </div>
            </motion.div>

            {/* Social Links & Quick Contact */}
            <motion.div 
              className="lg:w-1/3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 p-6">
                <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle size={18} className="text-[#D4AF37]" />
                  Connect With Us
                </h3>
                
                {/* Quick Contact Numbers */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B0B0D] border border-white/10">
                    <Phone size={18} className="text-[#D4AF37]" />
                    <div>
                      <p className="text-gray-400 text-xs">Call us directly</p>
                      <a href="tel:+12124567890" className="text-white text-sm font-semibold hover:text-[#D4AF37] transition-colors">
                        +1 (212) 456-7890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B0B0D] border border-white/10">
                    <Mail size={18} className="text-[#D4AF37]" />
                    <div>
                      <p className="text-gray-400 text-xs">Email us</p>
                      <a href="mailto:support@premiuminstruments.com" className="text-white text-sm font-semibold hover:text-[#D4AF37] transition-colors">
                        support@premiuminstruments.com
                      </a>
                    </div>
                  </div>
                </div>

               
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;