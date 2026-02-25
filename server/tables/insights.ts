import type { Insight, InsightInsert } from "$models/insight.ts";
import type { Database } from "@db/sqlite";

export const createTable = `
  CREATE TABLE IF NOT EXISTS insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brandId INTEGER NOT NULL,
    createdAt DATE NOT NULL,
    text TEXT NOT NULL
  )
`;

export const selectAll = (db: Database) => {
  return db.sql<Insight>`SELECT * FROM insights`;
};

export const insert = (db: Database, item: InsightInsert) => {
  db.sql`INSERT INTO insights (brandId, createdAt, text) VALUES (${item.brandId}, ${item.createdAt}, ${item.text})`;
};
