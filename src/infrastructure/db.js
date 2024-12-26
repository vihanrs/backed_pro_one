import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;
    await mongoose.connect(connectionString);
    console.log("Connected to the Database");
  } catch (error) {
    console.log(error);
    console.log("Error conneting to the Database");
  }
};
