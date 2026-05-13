import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, expect, it } from "vitest";
import NavHeader from "../src/components/nav-header";

describe("NavHeader", () => {
  it("renders landing navigation links and contact actions", () => {
    render(<NavHeader />);

    expect(screen.getByText("Замок Эксперт")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Услуги" })).toHaveAttribute("href", "#services");
    expect(screen.getByRole("link", { name: "Цены" })).toHaveAttribute("href", "#prices");
    expect(screen.getByRole("link", { name: "Контакты" })).toHaveAttribute("href", "#contacts");
    expect(screen.getByRole("link", { name: "+7 (979) 052-32-27" })).toHaveAttribute(
      "href",
      "tel:+79790523227",
    );
  });
});
