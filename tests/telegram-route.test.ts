import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "../app/api/send-telegram/route";

const originalToken = process.env.TELEGRAM_BOT_TOKEN;
const originalChatId = process.env.TELEGRAM_CHAT_ID;

describe("send telegram route", () => {
  afterEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = originalToken;
    process.env.TELEGRAM_CHAT_ID = originalChatId;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("returns an error when Telegram does not respond before the timeout", async () => {
    vi.useFakeTimers();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "test-chat";

    const fetchMock = vi.fn((_url: string | URL | Request, init?: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    });

    vi.stubGlobal("fetch", fetchMock);

    const responsePromise = POST(
      new Request("https://masterkey92.ru/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test",
          phone: "+7 979 052-32-27",
          comment: "Timeout test",
          consent: true,
        }),
      }),
    );

    await vi.advanceTimersByTimeAsync(10_000);

    const response = await Promise.race([responsePromise, Promise.resolve(null)]);

    expect(response).not.toBeNull();
    expect(response?.status).toBe(502);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0]?.[1]?.signal?.aborted).toBe(true);
  });
});
