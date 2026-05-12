import React, { useState, createContext, useEffect, useMemo } from "react";
export const ShopContext = createContext(null);
const ShopContextProvider = ({ children }) => {
  const [email, setemail] = useState('')
  const [fullname, setfullname] = useState("")
  const [phonenumber, setphonenumber] = useState("")
  const [address, setaddress] = useState("")
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

  const priceRanges = [
    { label: "Under $50", value: "under-50", min: 0, max: 50 },
    { label: "$50 - $100", value: "50-100", min: 50, max: 100 },
    { label: "$100 - $200", value: "100-200", min: 100, max: 200 },
    { label: "$200 - $500", value: "200-500", min: 200, max: 500 },
    { label: "$500+", value: "500-plus", min: 500, max: 10000 },
  ];
  const [cart, setcart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartData")) || [];
    } catch (error) {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (productId, Quantity) => {
    const verifyProduct = products.find((i) => i.id === productId);
    setcart((prev) => {
      const existproduct = prev.find((i) => i.productId === verifyProduct.id);
      if (existproduct) {
        return prev.map((i) => {
          return i.productId === productId
            ? { ...i, Quantity: i.Quantity + Quantity }
            : i;
        });
      }

      return [...prev, { productId: productId, Quantity: Quantity }];
    });
  };

  const cartItems = useMemo(() => {
    return cart.map((item) => {
      const product = products.find((i) => i.id === item.productId);

      if (!product) return null;
      if (product) {
        return {
          ...product,
          cartId: item.productId,
          quantity: item.Quantity,
          price:product.originalPrice,
          itemTotal: product.originalPrice * item.Quantity,
        };
      }
    });
  }, [cart, products]);

  const increaseQuantity = (cartId) => {
    setcart((prev) => {
      return prev.map((i) => {
        return i.productId === cartId ? { ...i, Quantity: i.Quantity + 1 } : i;
      });
    });
  };

  const decreaseQuantity = (cartId) => {
    setcart((prev) => {
      return prev
        .map((i) => {
          return i.productId === cartId
            ? { ...i, Quantity: i.Quantity - 1 }
            : i;
        })
        .filter((i) => i.Quantity > 0);
    });
  };

  const removeFromCart = (cartId) => {
    return setcart((prev) => prev.filter((i) => i.productId !== cartId));
  };

const deleteCart = ()=>{
  setcart([]);
}

const subtotal = useMemo(()=>{
 return cartItems.reduce((sum,item)=>{
return sum + (item.originalPrice * item.quantity)
},0)
},[cartItems])

const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.Quantity, 0);
  }, [cart]);


  let value = {
    products,
    priceRanges,
    addToCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    deleteCart,
    subtotal,
    totalCartItems,
    email,
    setemail,
    phonenumber,
    setphonenumber,
    fullname,
    setfullname,
    address,
    setaddress
    
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
