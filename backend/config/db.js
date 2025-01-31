// config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://manukrishna:00000000@cluster0.gcn5f.mongodb.net/food`);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
