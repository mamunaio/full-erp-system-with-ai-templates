import { describe, it, expect, vi } from "vitest";

// Mocking business logic for demo
const calculateInvoice = (subtotal: number, discount: number, tax: number) => {
  const discounted = subtotal - (subtotal * (discount / 100));
  const total = discounted + (discounted * (tax / 100));
  return Number(total.toFixed(2));
};

describe("Finance Module - Invoice Calculations", () => {
  it("should calculate total correctly without discount and tax", () => {
    expect(calculateInvoice(1000, 0, 0)).toBe(1000);
  });

  it("should apply discount percentage correctly", () => {
    expect(calculateInvoice(1000, 10, 0)).toBe(900);
  });

  it("should apply tax on discounted amount", () => {
    // 1000 - 10% = 900. 900 + 5% tax = 945
    expect(calculateInvoice(1000, 10, 5)).toBe(945);
  });

  it("should round to 2 decimal places", () => {
    expect(calculateInvoice(1000.55, 3.5, 7.25)).toBe(1035.48);
  });
});

describe("Double-entry Accounting Logic", () => {
  it("should ensure journal entry is balanced", () => {
    const entry = {
      debits: [{ account: "AR", amount: 5000 }],
      credits: [{ account: "Sales", amount: 5000 }]
    };
    const totalDebit = entry.debits.reduce((s, a) => s + a.amount, 0);
    const totalCredit = entry.credits.reduce((s, a) => s + a.amount, 0);
    expect(totalDebit).toBe(totalCredit);
  });
});
