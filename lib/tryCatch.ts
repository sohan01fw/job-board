// utils/withTryCatch.ts
export async function withTryCatch<T>(
  fn: () => Promise<T>,
  errorMessage: string,
): Promise<{ error: boolean; data?: T; message: string }> {
  try {
    const data = await fn();
    return { error: false, data, message: "success" };
  } catch (err) {
    console.error(err);
    return { error: true, message: errorMessage };
  }
}
