export const validateAuditInput = (
  body: any
): string | null => {
  if (!body.teamSize) {
    return "Team size is required.";
  }

  if (!body.primaryUseCase) {
    return "Primary use case is required.";
  }

  if (!Array.isArray(body.tools)) {
    return "Tools array is required.";
  }

  if (body.tools.length === 0) {
    return "At least one tool is required.";
  }

  return null;
};