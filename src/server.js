import express from "express";
import dotenv from "dotenv";
import favRouter from "./routes/favorites.routes.js";
import job from "./config/cron.js";
import { ENV } from "./config/env.js";
const app = express();
dotenv.config();

if (ENV.NODE_ENV === "production") job.start();

app.use(express.json());
app.use("/api/favorite", favRouter);
app.get("/api/test", (req, res) => {
  res.status(200).json({ success: true });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
