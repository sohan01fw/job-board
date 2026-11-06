import { createBrowserClient } from "@supabase/ssr";

function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Avoid Navigator LockManager contention errors (e.g. "Acquiring an
        // exclusive ... lock immediately failed") across tabs/refreshes.
        lock: async (_name, _acquireTimeout, fn) => await fn(),
      },
    },
  );
}

export const supabase = createClient();
