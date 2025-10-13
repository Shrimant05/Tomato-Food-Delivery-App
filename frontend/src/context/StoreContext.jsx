import { createContext,useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext();

/* const StoreContextProvider=(props)=>{ */

    export const StoreContextProvider = ({ children }) => {
  const [foodList, setFoodList] = useState(food_list);

  const value = {
    foodList,
    setFoodList,
  };
         
        return(
           < StoreContext.Provider value={value}>
            {children}
           </StoreContext.Provider>
        )
}
export default StoreContextProvider;
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
