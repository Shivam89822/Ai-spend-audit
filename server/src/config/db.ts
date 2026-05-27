import mongoose from "mongoose";
import { env, getRequiredEnv } from "./env";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      env.mongoUri || getRequiredEnv("MONGO_URI")
    );

    console.log(`✅ MongoDB connected successfully to: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);

    process.exit(1);
  }
};

export default connectDB;
