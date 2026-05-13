import { describe, expect, it } from "vitest";
import { landingContent, metadataConfig } from "../src/data/landing";

describe("landing content", () => {
  it("contains the required brand, city, contacts, services, and prices", () => {
    expect(landingContent.brand).toBe("Замок Эксперт");
    expect(landingContent.city).toBe("Севастополь");
    expect(landingContent.phone).toBe("+7 (979) 052-32-27");
    expect(landingContent.telegram).toBe("@Andree92");

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
      "Сейфы от 1500 ₽",
      "Машины от 1500 ₽",
      "Квартиры от 1000 ₽",
      "Замена от 1000 ₽",
    ]);
  });

  it("defines SEO metadata for emergency lock opening in Sevastopol", () => {
    expect(metadataConfig.title).toContain("Вскрытие замков");
    expect(metadataConfig.title).toContain("Севастополь");
    expect(metadataConfig.description).toContain("24/7");
    expect(metadataConfig.description).toContain("+7 (979) 052-32-27");
  });
});
