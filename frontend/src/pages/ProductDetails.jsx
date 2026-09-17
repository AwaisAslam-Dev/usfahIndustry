import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Truck,
  RotateCcw,
  Shield,
  Award,
  MessageCircle,
  CheckCircle,
  Share2
} from "lucide-react";
import Items from "../components/Items";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";

const ProductDetails = () => {
  const { productid } = useParams();
  const { products } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Find the product by ID
  const product = products.find((p) => p.id === productid);

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  // WhatsApp contact inquiry
  const whatsappcontact = () => {
    if (!product) return;
    const ownerPhoneNumber = "923460424486";
    const message = `*Product Inquiry*%0A%0A*Product ID:* ${product.id}%0A*Product Name:* ${product.name}%0A*Category:* ${product.category}%0AHello Usfah Industry, I am interested in this instrument. Please provide pricing and catalog details.`;
    const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] flex items-center justify-center px-4 py-24">
        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 max-w-md">
          <h2 className="text-white text-2xl font-bold mb-3">Product Not Found</h2>
          <p className="text-gray-400 text-sm mb-6">The requested instrument ID does not exist in our catalog.</p>
          <Link
            to="/products"
            className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-sm uppercase tracking-wider inline-block"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Normalize product images
  const mainImageSrc = Array.isArray(product.image) ? product.image[0] : product.image;
  const productImages = [
    mainImageSrc,
    mainImageSrc,
    mainImageSrc,
    mainImageSrc
  ];

  const features = [
    { icon: Truck, title: "Global Export", text: "Fast worldwide shipping" },
    { icon: RotateCcw, title: "ISO Certified", text: "100% Quality Guaranteed" },
    { icon: Shield, title: "Autoclave Safe", text: "Corrosion Resistant Steel" },
    { icon: Award, title: "Precision Crafted", text: "Made in Sialkot, Pakistan" },
  ];

  const DOMAIN = "https://usfahindustry.com";
  const canonicalUrl = `${DOMAIN}/productdetails/${product.id}`;

  // Product JSON-LD Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": [mainImageSrc.startsWith("http") ? mainImageSrc : `${DOMAIN}${mainImageSrc}`],
    "description": product.description || `Export-quality ${product.name} manufactured by Usfah Industry.`,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Usfah Industry"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Usfah Industry"
      }
    }
  };

  return (
    <>
      <SEO
        title={`${product.name} (${product.id}) | Usfah Industry`}
        description={product.description || `Buy or order wholesale ${product.name} (${product.id}) manufactured from medical grade stainless steel by Usfah Industry.`}
        keywords={`${product.name}, ${product.category}, ${product.id}, surgical tools, Usfah Industry Sialkot`}
        canonical={canonicalUrl}
        ogType="product"
        ogImage={mainImageSrc}
        schemaData={productSchema}
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          
          <Breadcrumb
            items={[
              { name: 'Products', url: '/products' },
              { name: product.category, url: `/products?category=${encodeURIComponent(product.category)}` },
              { name: product.name }
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
            
            {/* Product Image Gallery */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl overflow-hidden border border-white/10 mb-4 aspect-square flex items-center justify-center p-6">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />

                {product.bestseller && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-lg bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black text-xs font-bold uppercase tracking-wider">
                      Bestseller
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-[#D4AF37] transition-all"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={20}
                    className={isLiked ? "fill-red-500 text-red-500" : "text-white"}
                  />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border p-2 bg-[#0F0F12] transition-all ${
                      selectedImage === idx
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details Info */}
            <motion.div
              className="lg:w-1/2 flex flex-col justify-between"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    ID: {product.id}
                  </span>
                </div>

                <h1 className="text-white text-2xl sm:text-4xl font-black mb-4 leading-tight">
                  {product.name}
                </h1>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  {product.description || `Professional grade ${product.name.toLowerCase()} manufactured using premium surgical stainless steel. Offers outstanding balance, tactile feedback, and resistance to repeated heat sterilization.`}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {features.map((feat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                        <feat.icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-white text-xs font-bold">{feat.title}</h4>
                        <p className="text-gray-400 text-[11px]">{feat.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order / Inquiry Buttons */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <button
                  onClick={whatsappcontact}
                  className="w-full py-4 rounded-xl bg-linear-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl"
                >
                  <MessageCircle size={22} />
                  <span>Inquire Price on WhatsApp</span>
                </button>

                <Link
                  to="/contact"
                  className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>Request Wholesale Quote</span>
                </Link>
              </div>

            </motion.div>

          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-12 border-t border-white/10">
              <h2 className="text-white text-2xl font-bold mb-6">Related {product.category}</h2>
              <Items
                products={relatedProducts}
                containerVariants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                itemVariants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              />
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ProductDetails;
