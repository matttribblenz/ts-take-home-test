import { Database } from "@db/sqlite";
import * as insightsTable from "$tables/insights.ts";
import type { HasDBClient } from "./shared.ts";
import { afterAll, beforeAll } from "@std/testing/bdd";
import type { Insight, InsightInsert } from "$models/insight.ts";

type Fixture = HasDBClient & {
  insights: {
    insert(insights: InsightInsert[]): void;
    selectAll(): Insight[];
  };
};

export const withDB = <R>(fn: (fixture: Fixture) => R): R => {
  const db = new Database(":memory:");

  beforeAll(() => {
    db.exec(insightsTable.createTable);
  });

  afterAll(() => db.close());

  return fn({
    db,
    insights: {
      selectAll: () => insightsTable.selectAll(db),
      insert(insights) {
        for (const item of insights) {
          insightsTable.insert(db, item);
        }
      },
    },
  });
};
