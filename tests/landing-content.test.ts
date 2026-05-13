import { describe, expect, it } from "vitest";
import { landingContent, metadataConfig } from "../src/data/landing";

describe("landing content", () => {
  it("contains the required brand, city, contacts, services, and prices", () => {
    expect(landingContent.brand).toBe("Замок Эксперт");
    expect(landingContent.city).toBe("Севастополь");
    expect(landingContent.phone).toBe("+7 (978) 345-14-18");
    expect(landingContent.telegram).toBe("@Dimon4888");

    expect(landingContent.services.map((service) => service.title)).toEqual([
      "Вскрытие дверей",
      "Вскрытие автомобилей",
      "Вскрытие сейфов",
      "Замена замков",
      "Установка замков",
      "Ремонт замков",
      "Вскрытие гаражей",
    ]);

    expect(landingContent.prices.map((price) => `${price.title} ${price.value}`)).toEqual([
      "Вскрытие дверей от 1500 ₽",
      "Вскрытие авто от 2000 ₽",
      "Вскрытие сейфов от 3000 ₽",
      "Замена замка от 1800 ₽",
    ]);
  });

  it("defines SEO metadata for emergency lock opening in Sevastopol", () => {
    expect(metadataConfig.title).toContain("Вскрытие замков");
    expect(metadataConfig.title).toContain("Севастополь");
    expect(metadataConfig.description).toContain("24/7");
    expect(metadataConfig.description).toContain("+7 (978) 345-14-18");
  });
});
