import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
//login user
const loginUser =async (req,res) =>{
 const {email,password}=req.body;
 try {
    const user =await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"User Doesn't exist"})
    }

    const isMatch =await bcrypt.compare(password,user.password);
    if (!isMatch) {
        return res.json({success:false,message:"Invalid credentials"})
    }
    const token=createToken(user._id);
    res.json({success:true,token})
 } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
 }
 try {
    
 } catch (error) {
    
 }
}
// Helper function to create a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
  };
  
  // Register User
  const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
  
    try {
      // Check if all required fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide name, email, and password.",
        });
      }
  
      // Check if user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "User already exists.",
        });
      }
  
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email.",
        });
      }
  
      // Validate password strength
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        });
      }
  
      // Hash the user's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save user to database
      const user = await newUser.save();
  
      // Create a token
      const token = createToken(user._id);
  
      // Respond with success and token
      res.status(201).json({
        success: true,
        message: "User registered successfully.",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred during registration.",
      });
    }
  };

export{loginUser,registerUser}