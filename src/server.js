import express from "express";
import dotenv from "dotenv";
import favRouter from "./routes/favorites.routes.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/favorite", favRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
