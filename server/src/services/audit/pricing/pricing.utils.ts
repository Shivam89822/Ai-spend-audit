export const normalizeText = (
  value: string
): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
};