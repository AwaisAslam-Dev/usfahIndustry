import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import emailjs from "@emailjs/browser";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Wallet,
  Truck,
  Shield,
  Clock,
  ShoppingBag,
  Loader
} from "lucide-react";

const Checkout = () => {
  const { 
    subtotal, 
    email, 
    setemail, 
    phonenumber, 
    setphonenumber, 
    fullname, 
    setfullname, 
    address, 
    setaddress, 
    cartItems,
    deleteCart
  } = useContext(ShopContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const orderSummaryVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!fullname || !email || !phonenumber || !address) {
      alert("Please fill in all shipping information");
      return;
    }
    
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to cart before placing order.");
      return;
    }

    setIsLoading(true);

    try {
      const orderItems = cartItems
        .map(
          (item, index) =>
            `${index + 1}. ${item.name} | Qty: ${
              item.quantity
            } | Rs ${item.itemTotal}`
        )
        .join("\n");

      const templateParams = {
        fullname: fullname,
        email: email,
        phone: phonenumber,
        address: address,
        subtotal: subtotal,
        order_items: orderItems,
        total_items: cartItems.length,
      };

      await emailjs.send(
        "service_eusxbqj",     
        "template_1vdh9tk",  
        templateParams,
        "BjLU9qlXQbgRl1Mdn"   
      );

      // Clear form fields
      setfullname("");
      setemail("");
      setphonenumber("");
      setaddress("");
      
      // Clear cart
      if (deleteCart) {
        deleteCart();
      }
      
      setOrderPlaced(true);
      alert("Order placed successfully! A confirmation has been sent.");
      
    } catch (error) {
      console.log(error);
      alert("Failed to send order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <ShoppingBag size={48} className="text-green-500" />
          </div>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">Order Placed Successfully!</h2>
          <p className="text-gray-400 mb-6">Thank you for your purchase. A confirmation has been sent to {email}</p>
          <a 
            href="/products" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-semibold hover:gap-3 transition-all duration-300"
          >
            Continue Shopping
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D]">
      {/* Page Header */}
      <section className="relative py-12 md:py-16 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-50 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block text-[#D4AF37] uppercase tracking-[4px] text-xs font-bold mb-2">
              Secure Checkout
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mt-2 leading-tight">
              Complete Your Order
            </h1>
            <p className="text-gray-400 mt-3 text-sm max-w-2xl mx-auto">
              Fill in your details to complete your purchase
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT - Shipping Information */}
          <motion.div
            className="lg:w-2/3"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 p-6 md:p-8">
              <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
                <User size={24} className="text-[#D4AF37]" />
                Shipping Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-semibold">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="text"
                      value={fullname || ''}
                      onChange={(e) => setfullname(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-semibold">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="email"
                      value={email || ''}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-semibold">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="tel"
                      value={phonenumber || ''}
                      onChange={(e) => setphonenumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-semibold">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="text"
                      value={address || ''}
                      onChange={(e) => setaddress(e.target.value)}
                      placeholder="Enter your complete address"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              

              {/* Delivery Info */}
              <div className="mt-8 p-4 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                <div className="flex items-center gap-3 mb-3">
                  <Truck size={18} className="text-[#D4AF37]" />
                  <span className="text-white text-sm font-semibold">
                    Delivery Information
                  </span>
                </div>
                <p className="text-gray-400 text-xs">
                  Estimated delivery: 3-5 business days. Free shipping on orders over $200.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT - Order Summary */}
          <motion.div
            className="lg:w-1/3"
            variants={orderSummaryVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 p-6 md:p-8 sticky top-24">
              <h2 className="text-white text-xl font-bold mb-5 flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#D4AF37]" />
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-white/10">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Subtotal</span>
                  <span className="text-white text-sm font-semibold">
                    ${subtotal?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Shipping</span>
                  <span className="text-green-500 text-sm font-semibold">
                     FREE
                  </span>
                </div>
                
                <div className="flex justify-between pt-3 mt-2 border-t border-white/10">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-[#D4AF37] font-bold text-xl">
                    ${subtotal?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>


              {/* Place Order Button with Loading State */}
              <div className="space-y-3 mt-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                    !isLoading
                      ? 'bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black hover:gap-3'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      Place Order
                    </>
                  )}
                </button>
              </div>

              {/* Secure Info */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-4 text-gray-500 text-xs">
                  <div className="flex items-center gap-1">
                    <Shield size={12} />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>24/7 Support</span>
                  </div>
                </div>
                <p className="text-gray-600 text-xs text-center mt-3">
                  By placing an order, you agree to our Terms and Conditions
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;