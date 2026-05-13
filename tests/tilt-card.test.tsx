import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, expect, it } from "vitest";
import { TiltCard } from "../src/components/tilt-card";

describe("TiltCard", () => {
  it("renders card content with an optional spotlight layer", () => {
    render(
      <TiltCard spotlight>
        <p>20-40 мин</p>
      </TiltCard>,
    );

    expect(screen.getByText("20-40 мин")).toBeInTheDocument();
    expect(screen.getByTestId("tilt-card-spotlight")).toBeInTheDocument();
  });
});
