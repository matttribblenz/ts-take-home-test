import { useEffect } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import { useInsightsStore } from "../hooks/useInsightsStore.ts";

import styles from "./app.module.css";

export const App = () => {
  const { insights, fetchInsights } = useInsightsStore();

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Insights className={styles.insights} insights={insights} />
    </main>
  );
};
