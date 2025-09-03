// utils/withTryCatch.ts
export async function withTryCatch<T>(
  fn: () => Promise<T>,
  msg: string,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(err);
    throw new Error(msg); // React Query will catch this
  }
}
