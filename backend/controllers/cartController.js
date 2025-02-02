
import userModel from "../models/userModel.js";

//add items to user cart
const addToCart = async(req,res) =>{
 try {
  let userData = await userModel.findById(req.body.userId);
  let cartData =await userData.cartData;
  if(!cartData[req.body.itemId])
  {
    cartData[req.body.itemId] =1;
  }
  else{
    cartData[req.body.itemId] +=1;
  }
  await userModel.findByIdAndUpdate(req.body.userId,{cartData});
  res.json({success:true,message:"Added to cart"});
 } catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
  
 }
};
 
//remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;

    // Check if the item exists in the cart
    if (cartData[req.body.itemId]) {
      if (cartData[req.body.itemId] > 1) {
        cartData[req.body.itemId] -= 1; // Decrease quantity
      } else {
        delete cartData[req.body.itemId]; // Remove the item if quantity reaches 0
      }
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    // Update the user's cart data
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.json({ success: false, message: "Error removing item from cart" });
  }
};


//fetch user cart data
const getCart =async(req,res) =>{
 try {
  let userData = await userModel.findById(req.body.userId);
  let cartData = await userData.cartData;
   res.json({success:true,cartData})
 } catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
  
 }
}
export {addToCart,removeFromCart,getCart}