"use server";

import { deleteUserAccount } from "./lib/query";

export async function deleteUserAccountAction({ userId }: { userId: string }) {
  return await deleteUserAccount({ userId });
}
