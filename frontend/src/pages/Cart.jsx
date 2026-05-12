import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  RotateCcw,
  Shield,
  Tag,
  CreditCard,
  Lock,
} from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    deleteCart,
    subtotal,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(10);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Cart empty state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#0F0F12] to-[#0A0A0D] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <ShoppingBag size={48} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 mb-6 max-w-md">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-semibold hover:gap-3 transition-all duration-300"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
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
              Your Cart
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mt-2 leading-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-400 mt-3 text-sm max-w-2xl mx-auto">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 overflow-hidden">
              {/* Cart Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-gray-400 text-sm font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-white/10">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.cartId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 md:p-5"
                  >
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-4">
                      {/* Product Info */}
                      <div className="flex gap-4 md:col-span-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-linear-to-br from-gray-900 to-black overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-sm md:text-base mb-1 hover:text-[#D4AF37] transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-xs mb-2">
                            {item.category}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="flex items-center gap-1 text-red-400 hover:text-red-500 text-xs transition-colors"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="text-gray-400 text-sm md:hidden">
                          Price:
                        </span>
                        <span className="text-white font-semibold">
                          ${item.originalPrice}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="text-gray-400 text-sm md:hidden">
                          Quantity:
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.cartId)}
                            className="w-7 h-7 rounded-lg bg-[#0B0B0D] border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-white font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.cartId)}
                            className="w-7 h-7 rounded-lg bg-[#0B0B0D] border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="text-gray-400 text-sm md:hidden">
                          Total:
                        </span>
                        <span className="text-[#D4AF37] font-bold">
                          ${item.itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <button
                    onClick={deleteCart}
                    className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-300 text-sm"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/products"
                    className="px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 text-sm text-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-linear-to-br from-[#0F0F12] to-[#0A0A0D] rounded-2xl border border-white/10 p-5 md:p-6 sticky top-24"
            >
              <h2 className="text-white text-xl font-bold mb-4">
                Order Summary
              </h2>

              {/* Totals */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Subtotal</span>
                  <span className="text-white text-sm">
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Shipping</span>
                  <span className="text-white text-sm">Free</span>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-[#D4AF37] font-bold text-xl">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-3 mb-4 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black font-bold text-base flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300"
              >
                <CreditCard size={18} />
                Proceed to Checkout
              </button>

              {/* Secure Payment Note */}
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                <Lock size={14} />
                <span>Secure Payment Guaranteed</span>
              </div>

              {/* Shipping Info */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-[#D4AF37]" />
                  <span className="text-gray-500 text-xs">
                    Free shipping on orders over $200
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-[#D4AF37]" />
                  <span className="text-gray-500 text-xs">
                    Easy 7-day returns
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[#D4AF37]" />
                  <span className="text-gray-500 text-xs">
                    2-year warranty on all products
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
