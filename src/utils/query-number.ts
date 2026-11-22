export function parseQueryNumber(
  value: unknown,
  defaultValue: number,
  minValue: number = 0
): number {
  if (typeof value !== "string" || !value.trim()) {
    return defaultValue;
  }

  const parsedValue = Number(value);

  if (Number.isInteger(parsedValue) && parsedValue >= minValue) {
    return parsedValue;
  }

  return defaultValue;
}