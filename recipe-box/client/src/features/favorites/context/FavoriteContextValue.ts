import { createContext } from "react";
import type { FavoritesContextType } from "../types/favorites.types";

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
