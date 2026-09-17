import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  MessageCircle, 
  Download, 
  List, 
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { blogPosts } from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  const DOMAIN = 'https://usfahindustry.com';
  const canonicalUrl = `${DOMAIN}/blog/${post.slug}`;

  // Table of Contents Items
  const tocItems = [
    { id: 'what-are-surgical-scissors', label: 'What Are Surgical Scissors?' },
    { id: 'parts-of-a-surgical-scissor', label: 'Parts of a Surgical Scissor' },
    { id: 'straight-vs-curved', label: 'Straight vs Curved Scissors' },
    { id: 'blunt-vs-sharp', label: 'Blunt vs Sharp Tips' },
    { id: 'main-types-of-scissors', label: 'Main Types of Scissors' },
    { id: 'materials-and-care', label: 'Materials & Stainless Steel' },
    { id: 'care-and-sterilization', label: 'Care, Cleaning & Sterilization' },
    { id: 'conclusion', label: 'Conclusion' }
  ];

  // Quick Featured Instruments Widget Data
  const featuredProducts = [
    { id: 'USF-SURG-001', name: 'Surgical Scissors (Ref 786)', cat: 'Surgical Instruments' },
    { id: 'USF-SURG-002', name: 'Operating Scissors (Ref 787)', cat: 'Surgical Instruments' },
    { id: 'USF-SURG-003', name: 'Dissecting Scissors (Ref 791)', cat: 'Surgical Instruments' }
  ];

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "image": `${DOMAIN}${post.image}`,
    "datePublished": post.publishDate,
    "dateModified": post.updatedDate || post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Usfah Industry",
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/android-chrome-192x192.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={`${post.metaTitle || post.title}`}
        description={post.metaDescription || post.excerpt}
        keywords={post.keywords}
        canonical={canonicalUrl}
        ogType="article"
        ogImage={post.image}
        schemaData={articleSchema}
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          
          <Breadcrumb
            items={[
              { name: 'Blog', url: '/blog' },
              { name: post.title }
            ]}
          />

          {/* 2-Column Main Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Main Content Column (Left / Center) */}
            <main className="lg:w-2/3 flex-1">
              
              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <Clock size={13} className="text-[#D4AF37]" />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="text-white text-3xl sm:text-5xl font-black leading-tight mb-6 tracking-tight">
                  {post.title}
                </h1>

                {/* Author & Published Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-linear-to-r from-[#0F0F12] to-[#0A0A0D] border border-white/10 text-xs sm:text-sm text-gray-400">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                        <User size={16} />
                      </div>
                      <span className="text-white font-semibold">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={15} className="text-[#D4AF37]" />
                      <span>{post.publishDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all text-xs font-bold border border-[#D4AF37]/30"
                  >
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                </div>
              </motion.header>

              {/* Featured Image (Fix Image Hiding: Clean Aspect Ratio & Full Visibility) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden mb-10 border border-white/10 bg-black/60 p-2 shadow-2xl aspect-16/9 flex items-center justify-center"
              >
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  className="w-full h-full object-contain rounded-xl"
                />
              </motion.div>

              {/* Main Article Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl p-6 sm:p-10 border border-white/10 text-gray-300 leading-relaxed shadow-xl"
              >
                <div
                  className="space-y-6 text-gray-300"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Author Bio Card */}
                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Award size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">{post.author}</h4>
                    <p className="text-gray-400 text-xs mt-1">Medical & Surgical Instrument Quality Specialists at Usfah Industry Sialkot, Pakistan.</p>
                  </div>
                </div>
              </motion.div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-white text-xl font-bold mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedPosts.map((rPost) => (
                      <Link
                        key={rPost.id}
                        to={`/blog/${rPost.slug}`}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <span className="text-xs text-[#D4AF37] font-semibold uppercase">{rPost.category}</span>
                          <h4 className="text-white font-bold text-base mt-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                            {rPost.title}
                          </h4>
                        </div>
                        <span className="text-xs text-gray-500 mt-4 flex items-center gap-1">
                          <Clock size={12} />
                          {rPost.readTime}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Blog Button */}
              <div className="mt-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-sm font-semibold"
                >
                  <ArrowLeft size={16} />
                  <span>Back to all blog articles</span>
                </Link>
              </div>

            </main>

            {/* Right Sticky Sidebar (Fills Left/Right Spaces & Boosts Conversion) */}
            <aside className="lg:w-1/3 shrink-0 space-y-6">
              <div className="sticky top-24 space-y-6">
                
                {/* 1. WhatsApp Instant Inquiry CTA Widget */}
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#128C7E]/20 via-[#0F0F12] to-[#0A0A0D] border border-[#25D366]/40 shadow-2xl relative overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-4">
                    <FaWhatsapp size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Need Wholesale Surgical Scissors?</h3>
                  <p className="text-gray-400 text-xs mb-5 leading-relaxed">
                    Chat directly with Usfah Industry export specialists for pricing, bulk orders, and custom OEM branding.
                  </p>
                  <a
                    href="https://wa.me/923460424486?text=Hello%20Usfah%20Industry,%20I%20am%20reading%20the%20Surgical%20Scissors%20Guide%20and%20would%20like%20a%20wholesale%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-102"
                  >
                    <FaWhatsapp size={18} />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>

                {/* 2. Download PDF Catalogue CTA Widget */}
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#D4AF37]/15 via-[#0F0F12] to-[#0A0A0D] border border-[#D4AF37]/40 shadow-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                    <Download size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">2026 PDF Catalogue</h3>
                  <p className="text-gray-400 text-xs mb-5 leading-relaxed">
                    Download our complete surgical, dental, and beauty instruments catalog in PDF format.
                  </p>
                  <Link
                    to="/catalogue"
                    className="w-full py-3.5 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-102"
                  >
                    <Download size={16} />
                    <span>Download Catalog PDF</span>
                  </Link>
                </div>

                {/* 3. Table of Contents Widget */}
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 shadow-xl">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                    <List size={16} className="text-[#D4AF37]" />
                    <span>Table of Contents</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-gray-400">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 truncate"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></span>
                          <span>{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Featured Instruments Quick View Widget */}
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 shadow-xl">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                    <ShoppingBag size={16} className="text-[#D4AF37]" />
                    <span>Featured Instruments</span>
                  </h3>
                  <div className="space-y-3">
                    {featuredProducts.map((fp) => (
                      <Link
                        key={fp.id}
                        to={`/productdetails/${fp.id}`}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all block group"
                      >
                        <span className="text-[10px] text-[#D4AF37] font-semibold block uppercase">{fp.cat}</span>
                        <h4 className="text-white text-xs font-bold group-hover:text-[#D4AF37] transition-colors mt-0.5">
                          {fp.name}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
