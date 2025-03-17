import mongoose from "mongoose";

export const connectDB= async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/Auth-app`)
    console.log("Database connected successfully on host: ", conn.connection.host)
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
    process.exit(1);
  }
}