import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { InsightInsert } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";

describe("creating insights in the database", () => {
  describe("single insight creation", () => {
    withDB((fixture) => {
      const newInsight: InsightInsert = {
        brandId: 0,
        createdAt: new Date("2026-02-26T00:00:00Z"),
        text: "Test insight",
      };

      beforeAll(() => {
        createInsight({ db: fixture.db, newInsight });
      });

      it("inserts the insight into the database", () => {
        const results = fixture.insights.selectAll();
        expect(results.length).toBe(1);
      });

      it("saves the correct brandId", () => {
        const results = fixture.insights.selectAll();
        expect(results[0].brandId).toBe(newInsight.brandId);
      });

      it("saves the correct text", () => {
        const results = fixture.insights.selectAll();
        expect(results[0].text).toBe(newInsight.text);
      });

      it("saves the correct createdAt timestamp", () => {
        const results = fixture.insights.selectAll();
        expect(results[0].createdAt).toBe(
          newInsight.createdAt.toISOString(),
        );
      });
    });
  });

  describe("multiple insight creation", () => {
    withDB((fixture) => {
      const insights: InsightInsert[] = [
        {
          brandId: 0,
          createdAt: new Date("2026-02-26T10:00:00Z"),
          text: "First insight",
        },
        {
          brandId: 1,
          createdAt: new Date("2026-02-26T11:00:00Z"),
          text: "Second insight",
        },
        {
          brandId: 2,
          createdAt: new Date("2026-02-26T12:00:00Z"),
          text: "Third insight",
        },
      ];

      beforeAll(() => {
        insights.forEach((insight) => {
          createInsight({ db: fixture.db, newInsight: insight });
        });
      });

      it("inserts all insights into the database", () => {
        const results = fixture.insights.selectAll();
        expect(results.length).toBe(insights.length);
      });

      it("preserves all insight data correctly", () => {
        const results = fixture.insights.selectAll();
        insights.forEach((insight, index) => {
          expect(results[index].brandId).toBe(insight.brandId);
          expect(results[index].text).toBe(insight.text);
          expect(results[index].createdAt).toBe(
            insight.createdAt.toISOString(),
          );
        });
      });
    });
  });
});
