import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const List = ({url}) => {
  const [list,setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching the list");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Unable to fetch the food list.");
    }
  };
  
   const removeFood = async (foodId) =>{
     const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
     await fetchList();
     if(response.data.success){
       toast.success(response.data.message)
     }
     else{
      toast.error("Error")
     }
   }
   useEffect(()=>{
    fetchList();
   },[])
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length === 0 ? (
  <p>No food items available.</p>
) : (
  list.map((item, index) => {
    return (
      <div key={item.id} className='list-table-format'>
        <img src={`${url}/images/` + item.image} alt="" />
        <p>{item.name}</p>
        <p>{item.category}</p>
        <p>${item.price}</p>
        <p  onClick ={()=>removeFood(item._id)} className='cursor'>X</p>
      </div>
    );
  })
)}

      </div>
    </div>
  )
}

export default List
