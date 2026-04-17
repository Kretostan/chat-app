import { registerAs } from "@nestjs/config";

export default registerAs("cors", () => ({
  whitelist: [
    process.env.APP_URL,
    "http://localhost:5173",
    "http://localhost:8080"
  ].filter(Boolean)
}));
