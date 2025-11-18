
import React from "react";
import { render, screen, act } from "@testing-library/react";
import Timer from "./Timer";

jest.useFakeTimers();

describe("Timer Component", () => {
  test("displays initial time of 10:00", () => {
    const mockOnComplete = jest.fn();
    render(<Timer onComplete={mockOnComplete} />);
    expect(screen.getByText("Expires in: 10:00")).toBeInTheDocument();
  });

  test("counts down correctly", () => {
    const mockOnComplete = jest.fn();
    render(<Timer onComplete={mockOnComplete} />);

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(screen.getByText("Expires in: 9:00")).toBeInTheDocument();
  });

  test("calls onComplete when timer reaches zero", () => {
    const mockOnComplete = jest.fn();
    render(<Timer onComplete={mockOnComplete} />);

    act(() => {
      jest.advanceTimersByTime(600000);
    });

    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });
});
