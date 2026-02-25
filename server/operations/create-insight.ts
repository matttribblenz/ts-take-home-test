import type { InsightInsert } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  newInsight: InsightInsert;
};

const createInsight = ({ db, newInsight }: Input) => {
  insightsTable.insert(db, newInsight);
};

export default createInsight;
