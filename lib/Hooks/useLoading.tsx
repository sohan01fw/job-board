"use client";
import { useState } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(false);

  async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
    setLoading(true);
    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  }

  return { loading, withLoading };
}
