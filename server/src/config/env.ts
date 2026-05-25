import dotenv from "dotenv";

dotenv.config();

export const getRequiredEnv = (name: string): string => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI?.trim() || "",
  geminiApiKey: process.env.GEMINI_API_KEY?.trim() || "",
  geminiModel:
    process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash",
};

export const hasGeminiConfig = (): boolean =>
  Boolean(env.geminiApiKey);
