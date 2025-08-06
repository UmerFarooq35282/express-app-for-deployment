import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbURL = process.env.MONGODB_URL;
    if (!dbURL) {
      throw new Error("MONGODB_URL not found in environment variables");
    }

    const conn = await mongoose.connect(dbURL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error in database connection::", error.message);
    process.exit(1);
  }
};
