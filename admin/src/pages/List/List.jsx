import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch the list of food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food items.");
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast.error("An error occurred while fetching food items.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/food/remove/${foodId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list
      } else {
        toast.error("Failed to remove food item.");
      }
    } catch (error) {
      console.error(
        "Error removing food item:",
        error.response || error.message,
      );
      toast.error("An error occurred while removing the food item.");
    }
  };

  // Fetch the food list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p
              onClick={() =>
                removeFood(item._id)}
              className="cursor"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
