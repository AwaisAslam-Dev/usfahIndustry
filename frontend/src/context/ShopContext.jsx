import React, { useState, createContext, useEffect, useMemo } from "react";
export const ShopContext = createContext(null);
const ShopContextProvider = ({ children }) => {
 
  const products = [
    {
      id: "ab",
      name: "Premium Surgical Scissors",
      category: "Surgical Instruments",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1581594549595-35f6edc3b4a9?w=600&h=600&fit=crop",
      isBestseller: true,
    },
    {
      id: "abc",
      name: "Dental Examination Kit",
      category: "Dental Instruments",
      price: 149.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37c1d?w=600&h=600&fit=crop",
      isBestseller: true,
    },
    {
      id: "abcd",
      name: "Professional Beauty Tweezers",
      category: "Beauty Instruments",
      price: 34.99,
      originalPrice: 54.99,
      image:
        "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=600&h=600&fit=crop",
      isBestseller: true,
    },
    {
      id: "abcde",
      name: "Surgical Forceps Set",
      category: "Surgical Instruments",
      price: 199.99,
      originalPrice: 299.99,
      image:
        "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&h=600&fit=crop",
      isBestseller: true,
    },
    {
      id: "abcdef",
      name: "Dental Scaler Set",
      category: "Dental Instruments",
      price: 79.99,
      originalPrice: 119.99,
      image:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a4?w=600&h=600&fit=crop",
      isBestseller: false,
    },
    {
      id: "abcdefg",
      name: "Manicure & Pedicure Kit",
      category: "Beauty Instruments",
      price: 59.99,
      originalPrice: 89.99,
      image:
        "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600&h=600&fit=crop",
      isBestseller: true,
    },
    {
      id: "abcdefgh",
      name: "Orthopedic Surgical Kit",
      category: "Surgical Instruments",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1581594549595-35f6edc3b4a9?w=600&h=600&fit=crop",
      isBestseller: false,
    },
    {
      id: "abcdefghi",
      name: "Dental Hygiene Kit",
      category: "Dental Instruments",
      price: 49.99,
      originalPrice: 79.99,
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37c1d?w=600&h=600&fit=crop",
      isBestseller: false,
    },
    {
      id: "abcdefghij",
      name: "Professional Scissors Set",
      category: "Beauty Instruments",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=600&h=600&fit=crop",
      isBestseller: true,
    },
  ];

 
  let value = {
    products,
    
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
