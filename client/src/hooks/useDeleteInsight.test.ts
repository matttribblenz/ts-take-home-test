import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDeleteInsight } from "./useDeleteInsight.ts";
import * as useInsightsModule from "./useInsightsStore.ts";

vi.mock("./useInsights.ts");

describe("useDeleteInsight", () => {
  let mockRemoveInsight: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRemoveInsight = vi.fn();
    vi.spyOn(useInsightsModule, "useInsightsStore").mockReturnValue({
      insights: [],
      fetchInsights: vi.fn(),
      removeInsight: mockRemoveInsight,
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns deleteInsight function", () => {
    const { deleteInsight } = useDeleteInsight();
    expect(typeof deleteInsight).toBe("function");
  });

  it("calls fetch with correct URL and method", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    globalThis.fetch = fetchMock;

    const { deleteInsight } = useDeleteInsight();
    const insightId = 1;

    await deleteInsight({ id: insightId });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(`/insights/${insightId}`),
      expect.objectContaining({
        method: "DELETE",
      }),
    );
  });

  it("removes insight from store after deletion", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    globalThis.fetch = fetchMock;

    const { deleteInsight } = useDeleteInsight();
    const insightId = 1;

    await deleteInsight({ id: insightId });

    expect(mockRemoveInsight).toHaveBeenCalledWith(insightId);
  });

  it("removes insight even if different IDs are deleted", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    globalThis.fetch = fetchMock;

    const { deleteInsight } = useDeleteInsight();

    await deleteInsight({ id: 5 });
    await deleteInsight({ id: 10 });

    expect(mockRemoveInsight).toHaveBeenCalledWith(5);
    expect(mockRemoveInsight).toHaveBeenCalledWith(10);
  });
});
