import { describe, expect, it } from "vitest";

import { validateAuditInput } from "../validators/audit.validator";

describe("validateAuditInput", () => {
  it("accepts a valid payload", () => {
    const result = validateAuditInput({
      teamSize: 10,
      primaryUseCase: "coding",
      tools: [
        {
          toolName: "Cursor",
          currentPlan: "Pro",
          seats: 10,
        },
      ],
    });

    expect(result).toBeNull();
  });

  it("rejects an invalid use case", () => {
    const result = validateAuditInput({
      teamSize: 10,
      primaryUseCase: "finance",
      tools: [
        {
          toolName: "Cursor",
          currentPlan: "Pro",
          seats: 10,
        },
      ],
    });

    expect(result).toBe("Primary use case is invalid.");
  });

  it("rejects non-integer team size", () => {
    const result = validateAuditInput({
      teamSize: 2.5,
      primaryUseCase: "coding",
      tools: [
        {
          toolName: "Cursor",
          currentPlan: "Pro",
          seats: 10,
        },
      ],
    });

    expect(result).toBe(
      "Team size must be a whole number greater than 0."
    );
  });

  it("rejects unsupported plans", () => {
    const result = validateAuditInput({
      teamSize: 10,
      primaryUseCase: "coding",
      tools: [
        {
          toolName: "Cursor",
          currentPlan: "Nonexistent",
          seats: 10,
        },
      ],
    });

    expect(result).toBe(
      'Unsupported plan "Nonexistent" for Cursor.'
    );
  });

  it("rejects non-integer seats", () => {
    const result = validateAuditInput({
      teamSize: 10,
      primaryUseCase: "coding",
      tools: [
        {
          toolName: "Cursor",
          currentPlan: "Pro",
          seats: 1.2,
        },
      ],
    });

    expect(result).toBe(
      "Seats must be a whole number greater than 0 for Cursor."
    );
  });
});
