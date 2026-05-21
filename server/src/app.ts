import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";
import hpp from "hpp";

import apiRateLimiter from "./middleware/rateLimiter";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import auditRoutes from "./routes/auditRoutes";
const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use(xss());

app.use(hpp());

app.use(apiRateLimiter);
app.use("/api/audit", auditRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use(notFound);

app.use(errorHandler);

export default app;