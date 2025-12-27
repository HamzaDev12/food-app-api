import { Router } from "express";
import {
  createFav,
  deleteFav,
  getFav,
} from "../controllers/favorite.controller.js";
const router = Router();

router.post("/create", createFav);
router.delete("/delete/:userId/:recipeId", deleteFav);
router.get("/get/:userId", getFav);

export default router;
