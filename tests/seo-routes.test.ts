import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function importIfExists<T>(filePath: string, modulePath: string) {
  if (!existsSync(resolve(rootDir, filePath))) {
    return null;
  }

  return (await import(modulePath)) as T;
}

describe("SEO metadata routes", () => {
  it("publishes robots metadata for the production domain", async () => {
    const module = await importIfExists<{ default: () => unknown }>("app/robots.ts", "../app/robots");

    expect(module).not.toBeNull();

    const robots = module?.default();

    expect(robots).toMatchObject({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://masterkey92.ru/sitemap.xml",
      host: "https://masterkey92.ru",
    });
  });

  it("publishes sitemap entries for public pages", async () => {
    const module = await importIfExists<{ default: () => Array<{ url: string }> }>("app/sitemap.ts", "../app/sitemap");

    expect(module).not.toBeNull();

    const sitemap = module?.default();

    expect(sitemap?.map((entry) => entry.url)).toEqual([
      "https://masterkey92.ru/",
      "https://masterkey92.ru/privacy",
    ]);
  });
});
