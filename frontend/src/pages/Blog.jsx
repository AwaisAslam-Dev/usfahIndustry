import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { blogPosts } from '../data/blogData';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(blogPosts.map(post => post.category))];
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.keywords.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <SEO
        title="Blog & Insights | Medical & Surgical Instrument Guide | Usfah Industry"
        description="Read articles, sterilization guides, dental forceps anatomical matching tips, and surgical stainless steel metallurgy insights from Usfah Industry."
        keywords="surgical blog, dental instrument guide, stainless steel sterilization, medical tool manufacturing blog, Usfah Industry articles,surgical instruments blog,
surgical instruments,
surgical instrument manufacturer,
surgical instruments manufacturer Pakistan,
surgical instruments manufacturer Sialkot,
surgical instrument supplier,
surgical instruments supplier Pakistan,
surgical instruments exporter,
surgical instruments exporter Pakistan,
surgical instrument manufacturing,
surgical instrument manufacturing Pakistan,
surgical instruments Pakistan,
surgical instruments Sialkot,
medical instruments manufacturer,
medical instruments supplier,
surgical instrument industry,
surgical instrument information,
surgical instrument guide,
surgical instrument buying guide,
surgical instruments wholesale,
surgical instrument company,
surgical instruments types,
surgical instruments uses,
surgical instrument selection,
surgical instrument quality,
surgical instrument manufacturing process,
surgical instrument buyer guide,
surgical instrument supplier guide,
surgical instrument export,
surgical instruments for distributors"
        canonical="https://usfahindustry.com/blog"
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-16 sm:pt-20">
          
          <Breadcrumb items={[{ name: 'Blog', url: '/blog' }]} />

          {/* Header Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block text-[#D4AF37] uppercase tracking-[4px] text-xs font-bold mb-2">
              KNOWLEDGE & INDUSTRY INSIGHTS
            </span>
            <h1 className="text-white text-3xl sm:text-5xl font-black mt-2 leading-tight">
              Usfah Industry <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">Blog</span>
            </h1>
            <p className="text-gray-400 mt-4 text-base leading-relaxed">
              Expert guides on surgical stainless steel metallurgy, clinical forceps selection, salon hygiene standards, and instrument care.
            </p>
          </motion.div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-white/10">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm transition-all"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-black shadow-lg'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 max-w-2xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mx-auto mb-4 border border-[#D4AF37]/30">
                <BookOpen size={32} />
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Blog Articles Coming Soon</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                Our medical technical team is curating expert articles on instrument sterilization, stainless steel metallurgy, and surgical tool care. Stay tuned!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col group"
                >
                  {/* Article Thumbnail */}
                  <div className="relative aspect-16/9 overflow-hidden bg-black/60 p-2 flex items-center justify-center">
                    <img
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-lg bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta information */}
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-[#D4AF37]" />
                          {post.publishDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} className="text-[#D4AF37]" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-[#D4AF37]" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-white text-xl font-bold mb-3 group-hover:text-[#D4AF37] transition-colors leading-snug">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="px-4 py-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all group/link"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href={`https://wa.me/923460424486?text=Hello%20Usfah%20Industry,%20I%20saw%20your%20blog%20article%20'${encodeURIComponent(post.title)}'%20and%20want%20to%20inquire.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      >
                        <span>WhatsApp Quote</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Blog;
