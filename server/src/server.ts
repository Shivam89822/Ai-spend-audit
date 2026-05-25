import app from "./app";
import connectDB from "./config/db";
import { env } from "./config/env";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Server startup failed");
  }
};

startServer();
