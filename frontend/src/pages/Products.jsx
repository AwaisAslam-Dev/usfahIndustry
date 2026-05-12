import React, { useState, useEffect, useContext } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Items from '../components/Items';
import { ShopContext } from '../context/ShopContext';

const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState('relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);
const {products,priceRanges}  = useContext(ShopContext)
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  // Sample products data based on surgical industry
  
  // Filter options based on surgical industry
  const categories = ['Surgical Instruments', 'Dental Instruments', 'Beauty Instruments', 'Diagnostic Tools', 'Sterilization Equipment'];
  const brands = ['Premium Instruments', 'DentaPro', 'BeautyCraft', 'MediTech', 'SurgiCare'];
  
  const ratings = ['4 Stars & Up', '3 Stars & Up', '2 Stars & Up', '1 Star & Up'];

  // Update filtered products when filters change
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }
    
    // Filter by price range
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.value === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
    }
    
    // Filter by rating
    if (selectedRating) {
      const minRating = parseInt(selectedRating);
      filtered = filtered.filter(product => product.rating >= minRating);
    }
    
    // Sort products
    if (sortType === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortType === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'newest') {
      filtered.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategories, selectedBrands, selectedPriceRange, selectedRating, sortType]);

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Handle brand checkbox change
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRange('');
    setSelectedRating('');
    setSortType('relevant');
  };

  // Get active filters count
  const activeFiltersCount = selectedCategories.length + selectedBrands.length + (selectedPriceRange ? 1 : 0) + (selectedRating ? 1 : 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D]">
      
      {/* Page Header */}
      <section className="relative py-12 md:py-16 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150200px] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
        
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
              Discover our wide range of professional surgical, dental, and beauty instruments crafted with precision and excellence.
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
                  showFilter ? 'block' : 'hidden lg:block'
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
                        <label key={category} className="flex items-center gap-3 cursor-pointer group">
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

                  {/* Divider */}
                  <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                  {/* Price Range Filter */}
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-3 tracking-wider uppercase">
                      Price Range
                    </h4>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="priceRange"
                            checked={selectedPriceRange === range.value}
                            onChange={() => setSelectedPriceRange(range.value)}
                            className="w-4 h-4 border-white/20 bg-transparent checked:bg-[#D4AF37] checked:border-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0"
                          />
                          <span className="text-gray-400 text-sm group-hover:text-[#D4AF37] transition-colors">
                            {range.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
              
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

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs hidden sm:block">Sort by:</span>
                <div className="relative">
                  <select
                    className="appearance-none bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border border-white/10 rounded-lg px-4 py-2 text-white text-sm pr-8 cursor-pointer focus:outline-none focus:border-[#D4AF37] transition-colors"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option className='text-black' value="relevant">Relevant</option>
                    <option className='text-black' value="low-high">Price: Low to High</option>
                    <option className='text-black' value="high-low">Price: High to Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs">
                    {cat}
                    <button onClick={() => handleCategoryChange(cat)} className="ml-1 hover:text-white">&times;</button>
                  </span>
                ))}
                {selectedBrands.map(brand => (
                  <span key={brand} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs">
                    {brand}
                    <button onClick={() => handleBrandChange(brand)} className="ml-1 hover:text-white">&times;</button>
                  </span>
                ))}
                {selectedPriceRange && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs">
                    {priceRanges.find(r => r.value === selectedPriceRange)?.label}
                    <button onClick={() => setSelectedPriceRange('')} className="ml-1 hover:text-white">&times;</button>
                  </span>
                )}
                {selectedRating && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs">
                    {selectedRating} Stars & Up
                    <button onClick={() => setSelectedRating('')} className="ml-1 hover:text-white">&times;</button>
                  </span>
                )}
                <button onClick={clearFilters} className="text-gray-500 text-xs hover:text-[#D4AF37] transition-colors">
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <Items 
                products={filteredProducts}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />
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
  );
};

export default Products;