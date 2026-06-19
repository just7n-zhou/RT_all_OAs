import { Outlet } from "react-router-dom";
import { FavoritesProvider } from "./features/favorites/context/FavoritesContext";
import { Navbar } from "./shared/components/Navbar";
import styles from "./app/App.module.css";

export function App() {
  return (
    <FavoritesProvider>
      <div className={styles.app}>
        <Navbar />
        <Outlet />
      </div>
    </FavoritesProvider>
  );
}