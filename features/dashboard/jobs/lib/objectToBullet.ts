export function objectToBullets(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `- ${key}: ${Array.isArray(value) ? value.join(", ") : value}`,
    )
    .join("\n");
}
