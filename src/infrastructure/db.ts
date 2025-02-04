import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;
    if (!connectionString) {
      throw new Error("No Conntection String Found");
    }
    await mongoose.connect(connectionString);
    console.log("Connected to the Database");
  } catch (error) {
    console.log(error);
    console.log("Error conneting to the Database");
  }
};
