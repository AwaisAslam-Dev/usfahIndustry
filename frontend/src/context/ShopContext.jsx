import React, { useState, createContext } from "react";
import { Surgicalproducts } from "../assets/assets";
export const ShopContext = createContext(null);
const ShopContextProvider = ({ children }) => {
 const [products] = useState(Surgicalproducts)


 
  let value = {
    products,
    
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
