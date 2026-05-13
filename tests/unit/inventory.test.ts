import { describe, it, expect } from "vitest";

const calculateAvailableStock = (onHand: number, reserved: number) => {
  return onHand - reserved;
};

describe("Inventory Module - Stock Logic", () => {
  it("should calculate available stock correctly", () => {
    expect(calculateAvailableStock(100, 20)).toBe(80);
  });

  it("should detect low stock condition", () => {
    const isLowStock = (qty: number, min: number) => qty <= min;
    expect(isLowStock(5, 10)).toBe(true);
    expect(isLowStock(15, 10)).toBe(false);
  });

  it("should handle negative availability (oversold)", () => {
    expect(calculateAvailableStock(10, 15)).toBe(-5);
  });
});
