import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  Shield, 
  Minus, 
  Plus,
  CheckCircle,
  Share2,
  Award
} from 'lucide-react';
import Items from '../components/Items';

const ProductDetails = () => {
  const { productid } = useParams();
  const { products} = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  // Find the product
  const product = products.find(p => p.id === productid);
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products" className="text-[#D4AF37] hover:underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  // Generate all product images (main image + additional)
  const productImages = [
    product.image,
    product.image.replace('w=600&h=600', 'w=800&h=800'),
    product.image,
    product.image,
  ];

  const features = [
    { icon: Truck, title: 'Free Shipping', text: 'On orders over $50' },
    { icon: RotateCcw, title: '7 Days Return', text: 'Easy returns policy' },
    { icon: Shield, title: '2 Year Warranty', text: 'Quality guaranteed' },
    { icon: Award, title: 'Premium Quality', text: 'ISO certified' },
  ];

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D]">
      
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link to="/" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <Link to="/products" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Products</Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#D4AF37]">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Product Images */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="relative bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl overflow-hidden border border-white/10 mb-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
                
                {/* Bestseller Badge */}
                {product.isBestseller && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-lg bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black text-xs font-bold uppercase">
                      Bestseller
                    </span>
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-[#D4AF37] transition-all duration-300"
                >
                  <Heart 
                    size={20} 
                    className={isLiked ? "fill-red-500 text-red-500" : "text-white"}
                  />
                </button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx ? 'border-[#D4AF37]' : 'border-white/10 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category */}
              <div className="mb-2">
                <span className="text-[#D4AF37] text-sm tracking-wider uppercase font-semibold">
                  {product.category}
                </span>
              </div>
              
              {/* Product Name */}
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {product.name}
              </h1>
              
             
              
              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#D4AF37] font-bold text-3xl sm:text-4xl">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-500 text-xl line-through">${product.originalPrice}</span>
                    <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Experience precision and quality with our {product.name.toLowerCase()}. 
                Crafted from premium materials, this instrument is designed for professional use 
                in medical and beauty applications. Each piece undergoes rigorous quality control 
                to ensure optimal performance and durability.
              </p>
              
              {/* Key Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#D4AF37]" />
                  <span className="text-gray-300 text-sm">Premium stainless steel construction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#D4AF37]" />
                  <span className="text-gray-300 text-sm">Ergonomically designed for comfort</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#D4AF37]" />
                  <span className="text-gray-300 text-sm">Sterilizable and reusable</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#D4AF37]" />
                  <span className="text-gray-300 text-sm">ISO certified quality standards</span>
                </div>
              </div>
              
              
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button  className="flex-1 py-3 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-bold text-base flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300">
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
                
              
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <feature.icon size={20} className="text-[#D4AF37]" />
                    <div>
                      <p className="text-white text-xs font-semibold">{feature.title}</p>
                      <p className="text-gray-500 text-xs">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="inline-block text-[#D4AF37] uppercase tracking-[4px] text-xs font-bold mb-2">
                You May Also Like
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-black mt-2">
                Related Products
              </h2>
              <p className="text-gray-400 mt-2 text-sm max-w-2xl mx-auto">
                Customers who bought this also purchased these premium instruments
              </p>
            </motion.div>

            <Items 
              products={relatedProducts}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;