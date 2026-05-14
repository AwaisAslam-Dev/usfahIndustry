import React, { useState, createContext, useEffect, useMemo } from "react";
import { Surgicalproducts } from "../assets/assets";
export const ShopContext = createContext(null);
const ShopContextProvider = ({ children }) => {
 const [products, setproducts] = useState(Surgicalproducts)


 
  let value = {
    products,
    
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
