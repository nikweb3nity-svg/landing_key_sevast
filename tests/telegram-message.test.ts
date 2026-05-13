import { describe, expect, it } from "vitest";
import { formatTelegramLeadMessage } from "../src/lib/telegram";

describe("formatTelegramLeadMessage", () => {
  it("formats a lead with name, phone, comment, and time", () => {
    const message = formatTelegramLeadMessage(
      {
        name: "Дмитрий",
        phone: "+7 978 345-14-18",
        comment: "Нужно открыть дверь",
      },
      new Date("2026-05-13T09:30:00.000Z"),
    );

    expect(message).toContain("🔔 Новая заявка");
    expect(message).toContain("👤 Имя: Дмитрий");
    expect(message).toContain("📞 Телефон: +7 978 345-14-18");
    expect(message).toContain("💬 Комментарий: Нужно открыть дверь");
    expect(message).toContain("⏰ Время:");
  });
});
