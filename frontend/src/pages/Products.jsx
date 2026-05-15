import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Filter, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Items from "../components/Items";
import { ShopContext } from "../context/ShopContext";
import { Helmet } from "react-helmet-async";
const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12); // Default 12 products per page
  const { products } = useContext(ShopContext);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Categories based on surgical industry
  const categories = useMemo(() => [
    "Surgical Instruments",
    "Beauty Instruments",
    "Extracting Forceps",
    "Root Elevators",
    "Scaler",
  ], []);

  // Memoized filtered and sorted products
  const processedProducts = useMemo(() => {
    let processed = [...products];

    // Filter by categories
    if (selectedCategories.length > 0) {
      processed = processed.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Sort products
    if (sortType === "low-high") {
      processed.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      processed.sort((a, b) => b.price - a.price);
    } else if (sortType === "rating") {
      processed.sort((a, b) => b.rating - a.rating);
    } else if (sortType === "newest") {
      processed.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
    }

    return processed;
  }, [products, selectedCategories, sortType]);

  // Update filtered products when processed products change
  useEffect(() => {
    setFilteredProducts(processedProducts);
    setCurrentPage(1); // Reset to first page when filters change
  }, [processedProducts]);

  // Pagination logic
  const { currentProducts, totalPages, startIndex, endIndex } = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const current = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const total = Math.ceil(filteredProducts.length / productsPerPage);
    
    return {
      currentProducts: current,
      totalPages: total,
      startIndex: indexOfFirstProduct + 1,
      endIndex: Math.min(indexOfLastProduct, filteredProducts.length)
    };
  }, [filteredProducts, currentPage, productsPerPage]);

  // Handle page change
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle next/previous page
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  // Handle products per page change
  const handleProductsPerPageChange = useCallback((value) => {
    setProductsPerPage(value);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Handle category change with useCallback
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSortType("relevant");
    setCurrentPage(1);
  }, []);

  // Get active filters count
  const activeFiltersCount = selectedCategories.length;

  // Memoized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }), []);

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
  <>
  <Helmet>
  <title>Products - Usfah Industry</title>
  <meta
    name="description"
    content="Explore our products collection."
  />
</Helmet>
    <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D]">
      {/* Page Header */}
      <section className="relative py-12 md:py-16 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-50 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-block text-[#D4AF37] uppercase tracking-[4px] text-xs font-bold mb-2">
              Our Collection
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mt-2 leading-tight">
              Premium Surgical & Medical Instruments
            </h1>
            <p className="text-gray-400 mt-3 text-sm max-w-2xl mx-auto">
              Discover our wide range of professional surgical, dental, and
              beauty instruments crafted with precision and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <AnimatePresence mode="wait">
            {(showFilter || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`fixed lg:static top-0 left-0 h-full w-72 bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border-r border-white/10 p-5 z-50 overflow-y-auto ${
                  showFilter ? "block" : "hidden lg:block"
                }`}
              >
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <h3 className="text-white font-bold text-lg">Filters</h3>
                  <button
                    className="lg:hidden text-gray-400 hover:text-[#D4AF37] transition-colors"
                    onClick={() => setShowFilter(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Categories Filter */}
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-3 tracking-wider uppercase">
                      Categories
                    </h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="w-4 h-4 rounded border-white/20 bg-transparent checked:bg-[#D4AF37] checked:border-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0"
                          />
                          <span className="text-gray-400 text-sm group-hover:text-[#D4AF37] transition-colors">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                 

                  <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                  {/* Clear Filters Button */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full py-2 text-sm text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg hover:bg-[#D4AF37]/10 transition-colors mt-4"
                    >
                      Clear All Filters ({activeFiltersCount})
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Section */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-wrap justify-between items-center gap-3 mb-6 pb-4 border-b border-white/10">
              {/* Mobile Filter Button */}
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 text-white text-sm"
                onClick={() => setShowFilter(true)}
              >
                <Filter size={16} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-[#D4AF37] text-black rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Products Per Page Selector */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm hidden sm:inline">Show:</span>
                <select
                  value={productsPerPage}
                  onChange={(e) => handleProductsPerPageChange(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-[#D4AF37] transition-colors"
                >
                  <option  className="text-black" value={10}>10 per page</option>
                  <option  className="text-black" value={12}>12 per page</option>
                  <option  className="text-black" value={15}>15 per page</option>
                  <option  className="text-black" value={20}>20 per page</option>
                  <option  className="text-black" value={30}>30 per page</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-gray-400 text-sm">
              Showing {filteredProducts.length > 0 ? startIndex : 0} - {endIndex} of {filteredProducts.length} products
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <Items
                  products={currentProducts}
                  containerVariants={containerVariants}
                  itemVariants={itemVariants}
                />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12 pt-6 border-t border-white/10">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg border transition-all duration-300 ${
                        currentPage === 1
                          ? "border-white/10 text-gray-600 cursor-not-allowed"
                          : "border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      }`}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    {pageNumbers[0] > 1 && (
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className="px-3 py-1 rounded-lg border border-white/20 text-white text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                        >
                          1
                        </button>
                        {pageNumbers[0] > 2 && <span className="text-gray-500">...</span>}
                      </>
                    )}
                    
                    {pageNumbers.map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded-lg border transition-all duration-300 text-sm ${
                          currentPage === pageNum
                            ? "bg-[#D4AF37] border-[#D4AF37] text-black font-bold"
                            : "border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    
                    {pageNumbers[pageNumbers.length - 1] < totalPages && (
                      <>
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                          <span className="text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="px-3 py-1 rounded-lg border border-white/20 text-white text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg border transition-all duration-300 ${
                        currentPage === totalPages
                          ? "border-white/10 text-gray-600 cursor-not-allowed"
                          : "border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      }`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-sm">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 text-[#D4AF37] text-sm hover:underline transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setShowFilter(false)}
        />
      )}
    </div>
  </>
  );
};

export default Products;