import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, User, Clock, ArrowLeft, Share2, Download,
  List, ShoppingBag, Award, ChevronDown, ChevronUp, Phone, BookOpen, HelpCircle
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { blogPosts } from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tocOpen, setTocOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const faqs = [
    {
      question: "What is the main difference between Mayo and Metzenbaum scissors?",
      answer: "Mayo scissors are heavy-duty cutting instruments with thick blades used for dissecting dense fascia, muscle, and cutting heavy sutures. Metzenbaum scissors feature long slender shanks with fine, delicate blades designed specifically for soft tissue dissection."
    },
    {
      question: "What do gold-plated handles on surgical scissors signify?",
      answer: "Gold-plated finger rings indicate that the scissors feature Tungsten Carbide (TC) inserts vacuum-brazed onto the cutting edges, maintaining razor-sharp edges up to 5 times longer than standard stainless steel."
    },
    {
      question: "Which stainless steel grades are used for manufacturing medical scissors?",
      answer: "Professional surgical scissors are manufactured from martensitic stainless steel grades AISI 410, 420, and 440 (ISO 7153-1 standard), heat-treated to 50 to 56 HRC Rockwell hardness for sharpness retention and corrosion resistance."
    },
    {
      question: "Why are curved surgical scissors preferred over straight scissors in surgery?",
      answer: "Curved blades keep the cutting tips visible above the surgeon's hand while maneuvering inside deep anatomical cavities, following natural tissue contours without obstructing line of sight."
    },
    {
      question: "Are Usfah Industry surgical instruments certified for US and EU markets?",
      answer: "Yes, all surgical tools manufactured by Usfah Industry adhere to ISO 13485 quality management systems and ISO 7153-1 material compliance, making them suitable for hospital supply chains in the US, Europe, and globally."
    }
  ];

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleArticleClick = (e) => {
    // Allow native browser new tab behavior when Ctrl, Cmd, Shift, or Middle click is used
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }

    const anchor = e.target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (!post) return <Navigate to="/404" replace />;

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const DOMAIN = 'https://usfahindustry.com';
  const canonicalUrl = `${DOMAIN}/blog/${post.slug}`;

  const activeFaqs = post.faqs && post.faqs.length > 0 ? post.faqs : faqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": activeFaqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.metaDescription || post.excerpt,
      "image": `${DOMAIN}${post.image}`,
      "datePublished": post.publishDate,
      "dateModified": post.updatedDate || post.publishDate,
      "author": { "@type": "Person", "name": post.author },
      "publisher": {
        "@type": "Organization",
        "name": "Usfah Industry",
        "logo": { "@type": "ImageObject", "url": `${DOMAIN}/android-chrome-192x192.png` }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
    },
    faqSchema
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.excerpt, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  const WHATSAPP_LINK = "https://wa.me/923460424486?text=Hello%20Usfah%20Industry,%20I%20am%20reading%20the%20Surgical%20Scissors%20Guide%20and%20would%20like%20a%20wholesale%20quote.";

  return (
    <>
      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        keywords={post.keywords}
        canonical={canonicalUrl}
        ogType="article"
        ogImage={post.image}
        schemaData={schemaData}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C9A227] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="min-h-screen bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-36 pb-24 lg:pb-12">

          <Breadcrumb items={[{ name: 'Blog', url: '/blog' }, { name: post.title }]} />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-6">

            {/* ============ MAIN ARTICLE CONTENT ============ */}
            <main className="lg:w-2/3 flex-1 min-w-0">

              {/* Header - Clean Editorial Style */}
              <motion.header
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                {/* Category + Read time */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                {/* Title - Mobile Scaled */}
                <h1 className="text-white text-xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 tracking-tight">
                  {post.title}
                </h1>

                {/* Author bar */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-white text-xs sm:text-sm font-medium">{post.author}</p>
                      <p className="text-gray-500 text-[11px] flex items-center gap-1">
                        <Calendar size={10} /> {post.publishDate}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleShare}
                    aria-label="Share article"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-xs font-medium border border-white/10"
                  >
                    <Share2 size={12} />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </motion.header>

              {/* Main Featured Header Image (Image #1 of 2 total) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden mb-8 border border-white/10 shadow-lg"
              >
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto max-h-56 sm:max-h-80 object-cover"
                />
              </motion.div>

              {/* Article Content - Open Layout, NO inner box border */}
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={handleArticleClick}
                className="
                  blog-content-wrapper
                  text-gray-300
                  text-sm sm:text-base
                  leading-relaxed
                  space-y-4

                  [&_h2]:text-[#D4AF37] [&_h2]:text-lg sm:[&_h2]:text-xl md:[&_h2]:text-2xl
                  [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3
                  [&_h2]:scroll-mt-24 [&_h2]:leading-snug

                  [&_h3]:text-white [&_h3]:text-base sm:[&_h3]:text-lg
                  [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2
                  [&_h3]:scroll-mt-24

                  [&_p]:text-gray-300 [&_p]:text-sm sm:[&_p]:text-[15px]
                  [&_p]:leading-[1.8] [&_p]:mb-4

                  [&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:pl-5
                  [&_ul]:list-disc [&_ul]:marker:text-[#D4AF37]

                  [&_li]:text-gray-300 [&_li]:text-sm sm:[&_li]:text-[15px]
                  [&_li]:leading-[1.7]

                  [&_strong]:text-white [&_strong]:font-semibold
                  [&_a]:text-[#D4AF37] [&_a]:underline [&_a]:underline-offset-2
                  hover:[&_a]:text-[#C9A227]

                  [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:h-auto
                  [&_img]:max-h-72 [&_img]:object-contain [&_img]:bg-black/40
                  [&_img]:border [&_img]:border-white/10 [&_img]:p-2

                  /* Table styling - scrollable, sleek, compact on mobile */
                  [&_.table-container]:overflow-x-auto [&_.table-container]:my-6
                  [&_.table-container]:rounded-xl [&_.table-container]:border [&_.table-container]:border-white/10
                  [&_.table-container]:bg-white/[0.02]
                  [&_table]:w-full [&_table]:text-xs sm:[&_table]:text-sm [&_table]:text-left
                  [&_table]:border-collapse
                  [&_thead]:bg-white/5
                  [&_th]:text-[#D4AF37] [&_th]:font-semibold [&_th]:p-2.5 sm:[&_th]:p-3
                  [&_th]:border-b [&_th]:border-white/10 [&_th]:whitespace-nowrap
                  [&_td]:text-gray-300 [&_td]:p-2.5 sm:[&_td]:p-3 [&_td]:border-b [&_td]:border-white/5
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Interactive Collapsible FAQs Accordion */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <h2 className="text-white text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <HelpCircle size={20} className="text-[#D4AF37]" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div className="space-y-3">
                  {activeFaqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className={`rounded-xl border transition-all overflow-hidden ${
                          isOpen
                            ? 'bg-[#D4AF37]/10 border-[#D4AF37]/40 shadow-lg'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-4 text-left flex items-center justify-between gap-3 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                        >
                          <span className="leading-snug">{faq.question}</span>
                          <span className="p-1 rounded-lg bg-white/5 text-[#D4AF37] shrink-0">
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-3">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Author Bio - Minimal */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Award size={16} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs sm:text-sm">{post.author}</h4>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                    Surgical Instrument Specialists at Usfah Industry, Sialkot, Pakistan.
                  </p>
                </div>
              </div>

              {/* Single Combined CTA Box (WhatsApp + Catalogue in 1 Box) */}
              <div className="mt-8 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#121216] to-[#0A0A0D] border border-white/10 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider block mb-0.5">Wholesale & Export Inquiry</span>
                    <h4 className="text-white font-bold text-sm sm:text-base">Get Wholesale Quotes or Download Catalogue</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Contact our sales team on WhatsApp or download our 2026 catalogue.</p>
                  </div>
                  <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap"
                    >
                      <FaWhatsapp size={15} /> WhatsApp
                    </a>
                    <Link
                      to="/catalogue"
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#C9A227] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap"
                    >
                      <Download size={14} /> Catalogue
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-white text-base font-bold mb-4">Related Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {relatedPosts.map((rPost) => (
                      <Link
                        key={rPost.id}
                        to={`/blog/${rPost.slug}`}
                        className="group p-3 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#D4AF37] transition-all flex items-center gap-3"
                      >
                        {rPost.image && (
                          <img
                            src={rPost.image}
                            alt={rPost.imageAlt || rPost.title}
                            className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0 group-hover:border-[#D4AF37]/50 transition-colors"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-[#D4AF37] font-semibold uppercase block">{rPost.category}</span>
                          <h4 className="text-white font-semibold text-xs sm:text-sm mt-0.5 group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                            {rPost.title}
                          </h4>
                          <span className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                            <Clock size={10} /> {rPost.readTime}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back link */}
              <div className="mt-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-xs font-medium"
                >
                  <ArrowLeft size={14} />
                  Back to all articles
                </Link>
              </div>
            </main>

            {/* ============ DESKTOP SIDEBAR - EXCLUSIVELY RELATED ARTICLES ============ */}
            <aside className="hidden lg:block lg:w-1/3 shrink-0">
              <div className="sticky top-28 space-y-6">

                {/* Related Articles Widget Only */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121216] to-[#0A0A0D] border border-white/10 shadow-xl">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                    <BookOpen size={16} className="text-[#D4AF37]" /> Related Articles
                  </h3>
                  {relatedPosts.length > 0 ? (
                    <div className="space-y-4">
                      {relatedPosts.map((rPost) => (
                        <Link
                          key={rPost.id}
                          to={`/blog/${rPost.slug}`}
                          className="flex items-center gap-3 group py-2.5 border-b border-white/5 last:border-0"
                        >
                          {rPost.image && (
                            <img
                              src={rPost.image}
                              alt={rPost.imageAlt || rPost.title}
                              className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0 group-hover:border-[#D4AF37]/50 transition-colors"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider block">{rPost.category}</span>
                            <h4 className="text-white text-xs sm:text-sm font-semibold group-hover:text-[#D4AF37] transition-colors mt-0.5 leading-snug line-clamp-2">
                              {rPost.title}
                            </h4>
                            <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                              <Clock size={11} /> {rPost.readTime}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-xs italic">No related articles yet.</p>
                  )}
                </div>

              </div>
            </aside>

          </div>
        </div>

        {/* ============ MOBILE STICKY BOTTOM BAR (Unified 2-Button Box) ============ */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0D]/95 backdrop-blur-md border-t border-white/10 px-3 py-2 flex items-center gap-2">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#25D366] text-white font-bold text-xs uppercase tracking-wide active:scale-95 transition-transform"
          >
            <FaWhatsapp size={14} /> WhatsApp Quote
          </a>
          <Link
            to="/catalogue"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wide active:scale-95 transition-transform"
          >
            <Download size={13} /> View Catalogue
          </Link>
        </div>

      </div>
    </>
  );
};

export default BlogPost;