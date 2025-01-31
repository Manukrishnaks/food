// controllers/foodController.js
import foodModel from "../models/foodModel.js";
import fs from "fs"
const addFood = async (req, res) => {
  try {
    const image_filename = req.file.filename; // Fixed template literal
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename // Use 'image' consistently
    });

    await food.save();
    res.json({ success: true, message: "Food added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food item" });
  }
};
// all food list
const listFood = async(req,res)=>{
  try {
    const foods =await foodModel.find({});
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}
//remove food item
const removeFood =async (req,res)=>{
 try {
    const food =await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
 } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
 }
}

export { addFood,listFood,removeFood };
