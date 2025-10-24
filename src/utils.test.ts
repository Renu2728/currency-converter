import { isValidAmount, isValidSearch } from "../src/utils/validation";
describe("Validation Utilities", () => {
  describe("isValidAmount", () => {
    test("validates correct amount formats", () => {
      expect(isValidAmount("100")).toBe(true);
      expect(isValidAmount("100.00")).toBe(true);
      expect(isValidAmount("100.0")).toBe(true);
      expect(isValidAmount("0.50")).toBe(true);
    });
    test("rejects invalid amount formats", () => {
      expect(isValidAmount("100.0.0")).toBe(false);
      expect(isValidAmount("abc")).toBe(false);
      expect(isValidAmount("100.123")).toBe(false);
      expect(isValidAmount("")).toBe(false);
      expect(isValidAmount("   ")).toBe(false);
    });
  });
  describe("isValidSearch", () => {
    test("validates search input", () => {
      expect(isValidSearch("USD")).toBe(true);
      expect(isValidSearch("Euro")).toBe(true);
      expect(isValidSearch("us")).toBe(true);
    });
    test("rejects empty search input", () => {
      expect(isValidSearch("")).toBe(false);
      expect(isValidSearch("   ")).toBe(false);
    });
  });
});
