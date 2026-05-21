export const generateShareId = (): string => {
  const randomPart = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `AUD-${randomPart}`;
};