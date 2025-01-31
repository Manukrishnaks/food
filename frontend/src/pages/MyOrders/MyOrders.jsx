import React, { useEffect, useState, useContext } from "react";
import "./MyOrders.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]); // Ensuring default value is an array

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            if (response.data && Array.isArray(response.data.data)) {
                setData(response.data.data);
            } else {
                setData([]); // Ensuring data is always an array
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setData([]); // Ensuring no crash in case of error
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p> // Display a message when no data is available
                )}
            </div>
        </div>
    );
};

export default MyOrders;
