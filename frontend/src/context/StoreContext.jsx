import { createContext,useEffect,useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext();

/* const StoreContextProvider=(props)=>{ */

    export const StoreContextProvider = ({ children }) => {
      const[cartItems,setCartItems]=useState({});
  const [foodList, setFoodList] = useState(food_list);
  const addToCart=(itemId)=>{
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) ;
    }

  }
 const removeFromCart = (itemId) => {
  setCartItems((prev) => {
    const updatedCart = { ...prev };

    if (updatedCart[itemId] > 1) {
      // just decrease by 1
      updatedCart[itemId] -= 1;
    } else {
      // if it's 1 or less, remove the item completely
      delete updatedCart[itemId];
    }

    return updatedCart;
  });
};
//export const StoreContext = createContext({});
useEffect(()=>{
  console.log(cartItems)
},[cartItems])
  const value = {
    foodList,
    setFoodList,
    cartItems,
  setCartItems,
addToCart,
removeFromCart  };
         
        return(
           < StoreContext.Provider value={value}>
            {children}
           </StoreContext.Provider>
        )
}

/* 
import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);

  const value = {
    foodList,
    setFoodList,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
 */
