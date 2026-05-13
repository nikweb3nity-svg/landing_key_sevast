import { describe, expect, it } from "vitest";
import { formatTelegramLeadMessage, normalizeTelegramLead } from "../src/lib/telegram";

describe("formatTelegramLeadMessage", () => {
  it("formats a lead with name, phone, comment, and time", () => {
    const message = formatTelegramLeadMessage(
      {
        name: "Дмитрий",
        phone: "+7 979 052-32-27",
        comment: "Нужно открыть дверь",
        consent: true,
      },
      new Date("2026-05-13T09:30:00.000Z"),
    );

    expect(message).toContain("🔔 Новая заявка");
    expect(message).toContain("👤 Имя: Дмитрий");
    expect(message).toContain("📞 Телефон: +7 979 052-32-27");
    expect(message).toContain("💬 Комментарий: Нужно открыть дверь");
    expect(message).toContain("⏰ Время:");
  });

  it("requires personal data consent before accepting a lead", () => {
    expect(
      normalizeTelegramLead({
        name: "Дмитрий",
        phone: "+7 979 052-32-27",
        comment: "Нужно открыть дверь",
        consent: false,
      }),
    ).toBeNull();

    expect(
      normalizeTelegramLead({
        name: "Дмитрий",
        phone: "+7 979 052-32-27",
        comment: "Нужно открыть дверь",
        consent: true,
      }),
    ).toEqual({
      name: "Дмитрий",
      phone: "+7 979 052-32-27",
      comment: "Нужно открыть дверь",
      consent: true,
    });
  });
});
