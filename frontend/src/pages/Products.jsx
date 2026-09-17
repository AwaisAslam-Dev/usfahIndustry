import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Filter, X, ChevronDown, ChevronLeft, ChevronRight, Search, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Items from "../components/Items";
import { ShopContext } from "../context/ShopContext";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";

const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("relevant");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const { products } = useContext(ShopContext);

  // Selected Categories filter state
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Medical & Surgical Industry Categories
  const categories = useMemo(() => [
    "Surgical Instruments",
    "Dental Instruments",
    "Beauty Instruments",
    "Extracting Forceps",
    "Root Elevators",
    "Scaler",
  ], []);

  // Filtered and Sorted Products
  const processedProducts = useMemo(() => {
    let processed = [...products];

    // Search query filter (matches name, category, or product ID)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      processed = processed.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          (product.id && product.id.toLowerCase().includes(q))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      processed = processed.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Sort products
    if (sortType === "name-asc") {
      processed.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "name-desc") {
      processed.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === "bestseller") {
      processed.sort((a, b) => (b.bestseller === a.bestseller ? 0 : b.bestseller ? 1 : -1));
    }

    return processed;
  }, [products, selectedCategories, searchQuery, sortType]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, searchQuery, sortType]);

  // Pagination calculations
  const { currentProducts, totalPages, startIndex, endIndex } = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const current = processedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const total = Math.ceil(processedProducts.length / productsPerPage) || 1;
    
    return {
      currentProducts: current,
      totalPages: total,
      startIndex: processedProducts.length === 0 ? 0 : indexOfFirstProduct + 1,
      endIndex: Math.min(indexOfLastProduct, processedProducts.length)
    };
  }, [processedProducts, currentPage, productsPerPage]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSearchQuery("");
    setSortType("relevant");
    setCurrentPage(1);
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }), []);

  // Products Catalog Schema
  const catalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Surgical, Dental & Beauty Instruments Catalog",
    "numberOfItems": processedProducts.length,
    "itemListElement": currentProducts.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://usfahindustry.com/productdetails/${item.id}`,
      "name": item.name
    }))
  };

  return (
    <>
      <SEO
        title="Products Catalog | Surgical, Dental & Beauty Instruments | Usfah Industry"
        description="Browse our complete catalog of surgical scissors, dissecting forceps, dental extracting forceps, root elevators, periodontal scalers, and beauty instruments."
        keywords="surgical instruments catalog, dental tools list, extracting forceps 150 151, root elevators, beauty cuticle nippers, Sialkot surgical instruments,advanced surgical products , latest dental products,beauty products,stylish scissors ,beauty instruments,surgical instruments,
surgical instruments manufacturer,
surgical instruments supplier,
surgical instruments supplier Pakistan,
surgical instruments manufacturer Pakistan,
surgical instruments manufacturer Sialkot,
surgical instruments exporter,
surgical instruments exporter Pakistan,
surgical instruments wholesale,
surgical instruments Pakistan,
surgical instruments Sialkot,
surgical instrument supplier,
surgical instrument manufacturer,
medical instruments manufacturer Pakistan,
medical instruments supplier,
surgical instrument products,
surgical medical instruments,
medical surgical instruments,
surgical instruments range,
surgical instrument products Pakistan"
        canonical="https://usfahindustry.com/products"
        schemaData={catalogSchema}
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          
          <Breadcrumb items={[{ name: 'Products Catalog', url: '/products' }]} />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-3xl sm:text-5xl font-black mb-3">
              Surgical and Dental <span className="text-transparent bg-linear-to-r from-[#D4AF37] via-[#E8C547] to-[#C9A227] bg-clip-text">Instruments Catalog</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Usfah Industry is a certified surgical instruments manufacturer in Sialkot Pakistan. Explore our export catalog of surgical tools, dental extracting forceps, root elevators, scalers, and beauty instruments crafted from medical stainless steel.
            </p>
          </div>

          {/* Search Bar & Filter Controls Bar */}
          <div className="bg-linear-to-r from-[#0F0F12] to-[#0A0A0D] p-4 rounded-2xl border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search by name, category, or ID (e.g., USF-SURG-001)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Filter Toggle Mobile */}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="md:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-semibold text-xs uppercase"
              >
                <Filter size={16} />
                <span>Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                <span className="hidden sm:inline">Sort By:</span>
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="bg-[#111115] text-white border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37] text-xs sm:text-sm"
                >
                  <option value="relevant">Featured / Relevant</option>
                  <option value="bestseller">Bestsellers First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Desktop Categories Sidebar */}
            <aside className={`md:block md:w-64 shrink-0 ${showFilter ? 'block' : 'hidden'}`}>
              <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] p-5 rounded-2xl border border-white/10 sticky top-24">
                
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    <Filter size={18} className="text-[#D4AF37]" />
                    <span>Filter Categories</span>
                  </h3>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      <RotateCcw size={12} />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {categories.map((cat) => {
                    const isChecked = selectedCategories.includes(cat);
                    const count = products.filter(p => p.category === cat).length;
                    return (
                      <label
                        key={cat}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                          isChecked ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30' : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCategoryChange(cat)}
                            className="w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm font-medium">{cat}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Products Main Grid */}
            <main className="flex-1">
              
              {/* Total found bar */}
              <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-gray-400">
                <span>
                  Showing <strong className="text-white">{startIndex} - {endIndex}</strong> of <strong className="text-white">{processedProducts.length}</strong> instruments
                </span>
                {selectedCategories.length > 0 && (
                  <span className="text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30 text-xs">
                    Filtered by {selectedCategories.length} category
                  </span>
                )}
              </div>

              {processedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                  <h3 className="text-white text-xl font-bold mb-2">No Instruments Match Your Criteria</h3>
                  <p className="text-gray-400 text-sm mb-6">Try clearing filters or changing your search phrase.</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  <Items
                    products={currentProducts}
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                  />

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#D4AF37]"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                            currentPage === page
                              ? 'bg-[#D4AF37] text-black shadow-lg scale-105'
                              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#D4AF37]"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>

          </div>
        </div>
      </div>
    </>
  );
};

export default Products;