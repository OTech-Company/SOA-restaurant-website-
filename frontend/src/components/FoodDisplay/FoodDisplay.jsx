import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";

const FoodDisplay = ({ category }) => {
  const [food_list, setFoodList] = useState([]);
  useEffect(() => {
    const getMealsInCategory = async () => {
      const data = await axios.get(
        `http://localhost:3000/food/bycategory/${category}`,
      );
      setFoodList(data.data);
    };
    getMealsInCategory();
  }, []);
  return (
    <div className="food-display" id="food-display">
      <h2 className="h2we">Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
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
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
