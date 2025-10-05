"use client";

import * as React from "react";
import { handleLogOutBtn, useDeleteUserAccount } from "../hooks/useDeleteAcc";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DeleteAccount({ userId }: { userId: string }) {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: deleteAcc, isPending } = useDeleteUserAccount();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      await deleteAcc({ userId });
      await handleLogOutBtn(router); // pass router
      setOpen(false);
    } catch (err) {
      console.error("Delete account error:", err);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="flex justify-between rounded-2xl border shadow-sm p-6 bg-white dark:bg-gray-900 space-y-4">
        <div>
          <h2 className="text-lg font-medium text-red-600">Danger Zone</h2>
          <p className="text-sm text-gray-600 font-semibold">
            Once you delete your account, all your data will be permanently
            removed. This action cannot be undone.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="bg-red-600">
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account? This action is
                permanent and cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="bg-red-600"
                onClick={handleDeleteAccount}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
