import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { BRAND_NAMES_BY_ID_MAP } from "../../lib/consts.ts";
import { useDeleteInsight } from "../../hooks/useDeleteInsight.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
};

export const Insights = ({ insights, className }: InsightsProps) => {
  const { deleteInsight } = useDeleteInsight();

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length ? (
          insights.map(({ id, text, createdAt, brandId }) => {
            return (
              <div className={styles.insight} key={id}>
                <div className={styles["insight-meta"]}>
                  <span>{BRAND_NAMES_BY_ID_MAP[brandId]}</span>
                  <div className={styles["insight-meta-details"]}>
                    <span>{new Date(createdAt).toLocaleString()}</span>
                    <Trash2Icon
                      className={styles["insight-delete"]}
                      onClick={() => deleteInsight({ id })}
                    />
                  </div>
                </div>
                <p className={styles["insight-content"]}>{text}</p>
              </div>
            );
          })
        ) : (
          <p>We have no insight!</p>
        )}
      </div>
    </div>
  );
};
