import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext();

/* const StoreContextProvider=(props)=>{ */

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  //const [foodList, setFoodList] = useState(food_list);
  const [food_list,setFood_list]=useState([]);
  const addToCart = async (itemId) => {
    setCartItems((prev = {}) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: { token },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev = {}) => {
      if (!prev[itemId]) return prev;
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const loadCartData = async (authToken = token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token: authToken } }
      );
      // API returns data under `data`, so fall back to empty object to keep cart usable
      setCartItems(response?.data?.data || {});
    } catch (error) {
      console.error("Failed to load cart", error);
      setCartItems({});
    }
  };
  //export const StoreContext = createContext({});
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  useEffect(() => {
    
    async function loadData(){
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  },[])
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
  const url="http://localhost:4000";
  const [token,setToken]=useState("");
  const fetchFoodList=async()=>{
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("API Response:", response.data);
      setFood_list(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  }
  const value = {
    foodList: food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

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
