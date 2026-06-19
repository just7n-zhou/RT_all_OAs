import { useEffect, useState } from "react";
import { StatsPanel } from "./StatsPanel";
import { FeaturedRecipes } from "./FeaturedRecipes";
import { dashboardApi } from "../api/dashboardApi";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import type { DashboardStats } from "../types/dashboard.types";
import type { Recipe } from "../../recipes/types/recipe.types";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [featured, setFeatured] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [statsData, featuredData] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getFeatured(),
        ]);
          setStats(statsData);
          setFeatured(featuredData);
      } catch (err) {
        setError("Failed to fetch recipes!");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !stats) {
    return <div className={styles.error}>{error || "Dashboard unavailable"}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <StatsPanel stats={stats} />
      <FeaturedRecipes recipes={featured} />
    </div>
  );
}
