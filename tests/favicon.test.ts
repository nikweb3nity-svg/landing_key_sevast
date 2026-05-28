import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

describe("favicon", () => {
  it("publishes a blue key icon for browser tabs", () => {
    const iconPath = resolve(rootDir, "app/icon.svg");

    expect(existsSync(iconPath)).toBe(true);

    const icon = readFileSync(iconPath, "utf8");

    expect(icon).toContain("<title>Замок Эксперт</title>");
    expect(icon).toContain("#2563eb");
    expect(icon).toContain('stroke="#ffffff"');
    expect(icon).toContain("path");
  });
});
