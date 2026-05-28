import { describe, expect, it } from "vitest";
import { privacyPolicy } from "../src/data/legal";

describe("privacy policy content", () => {
  it("defines operator, personal data scope, processing goals, and user rights", () => {
    expect(privacyPolicy.title).toBe("Политика конфиденциальности");
    expect(privacyPolicy.operator.name).toContain("Замок Эксперт");
    expect(privacyPolicy.operator.site).toBe("masterkey92.ru");
    expect(privacyPolicy.sections.map((section) => section.title)).toContain("Состав персональных данных");
    expect(privacyPolicy.sections.map((section) => section.title)).toContain("Цели обработки");
    expect(privacyPolicy.sections.map((section) => section.title)).toContain("Права субъекта персональных данных");
  });
});
