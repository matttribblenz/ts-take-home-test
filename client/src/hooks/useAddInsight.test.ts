import { afterEach, describe, expect, it, vi } from "vitest";
import { useAddInsight } from "./useAddInsight.ts";

describe("useAddInsight", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns addInsight function", () => {
    const { addInsight } = useAddInsight();
    expect(typeof addInsight).toBe("function");
  });

  it("calls fetch with correct URL and method", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    globalThis.fetch = fetchMock;

    const { addInsight } = useAddInsight();
    const params = { brandId: 1, text: "Test insight" };

    await addInsight(params);

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/insights"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(params),
      }),
    );
  });

  it("sends correct insight data", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    globalThis.fetch = fetchMock;

    const { addInsight } = useAddInsight();
    const params = { brandId: 2, text: "Another insight" };

    await addInsight(params);

    const call = fetchMock.mock.calls[0];
    expect(call[1]?.body).toBe(JSON.stringify(params));
  });
});
