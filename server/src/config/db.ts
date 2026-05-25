import mongoose from "mongoose";
import { env, getRequiredEnv } from "./env";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      env.mongoUri || getRequiredEnv("MONGO_URI")
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed");

    process.exit(1);
  }
};

export default connectDB;
