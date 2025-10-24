import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
jest.mock("./components/ConvertSwap", () => {
  return function MockConvertSwap() {
    return <div data-testid="convert-button">Convert Button</div>;
  };
});

describe("App", () => {
  test("renders the main app container", () => {
    render(<App />);
    const appContainer = screen.getByTestId("convert-button");
    expect(appContainer).toBeInTheDocument();
  });

  test("has proper app structure", () => {
    render(<App />);
    expect(screen.getByTestId("convert-button")).toBeInTheDocument();
  });
});
