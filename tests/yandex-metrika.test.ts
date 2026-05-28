import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

describe("Yandex Metrika", () => {
  it("injects the configured counter into the root layout", () => {
    const layout = readFileSync(resolve(rootDir, "app/layout.tsx"), "utf8");

    expect(layout).toContain("109479947");
    expect(layout).toContain("https://mc.yandex.ru/metrika/tag.js?id=109479947");
    expect(layout).toContain("https://mc.yandex.ru/watch/109479947");
    expect(layout).toContain("webvisor:true");
    expect(layout).toContain('ecommerce:"dataLayer"');
  });
});
