import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const favoriteTable = pgTable("favorite", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  recipId: integer("recip_id").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  cookTime: text("cook_time"),
  servings: text("servings"),
  createAt: timestamp("create_at").defaultNow(),
});
