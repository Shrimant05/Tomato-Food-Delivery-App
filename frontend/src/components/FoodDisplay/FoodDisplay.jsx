/* import { React, useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = () => {
  const foodList = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((item, index) => {
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;  */
// ...existing code...
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = ({category}) => {
  const { foodList = [] } = useContext(StoreContext);

  // Prevent crashes while data is loading
  if (!Array.isArray(foodList)) {
    return <p>Loading food items...</p>;
  }
const filtered = foodList.filter(
    (item) => category === "All" || item.category === category
  );


  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <FoodItem
              key={item._id ?? index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No food items available.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
// ...existing code...