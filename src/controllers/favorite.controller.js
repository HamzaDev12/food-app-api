import { and, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { messageErrors } from "../constants/contants.js";
import { favoriteTable } from "../db/schema.js";

export const createFav = async (req, res) => {
  try {
    const { userId, recipId, title, image, cookTime, servings } = req.body;
    if (!userId && !recipId && !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFav = await db
      .insert(favoriteTable)
      .values({
        recipId,
        title,
        userId,
        cookTime,
        image,
        servings,
      })
      .returning();

    res.status(201).json({
      message: "Successfully created",
      favorites: newFav[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: messageErrors,
    });
  }
};

export const deleteFav = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoriteTable)
      .where(
        and(
          eq(favoriteTable.userId, userId),
          eq(favoriteTable.recipId, parseInt(recipeId))
        )
      );

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: messageErrors,
    });
  }
};

export const getFav = async (req, res) => {
  try {
    const { userId } = req.params;

    const userFav = await db
      .select()
      .from(favoriteTable)
      .where(eq(favoriteTable.userId, userId));

    if (!userId) {
      res.status(400).json({
        message: "user is not exist",
      });
      return;
    }

    res.status(200).json({
      message: "user's favorite fetched",
      favorites: userFav,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: messageErrors,
    });
  }
};
