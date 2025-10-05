"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  trigger?: React.ReactNode; // Custom trigger button or element
  title?: string; // Dialog title
  description: string; // Dialog description/content
  confirmText?: string; // Confirm button text
  variant?:
    | "destructive"
    | "outline"
    | "link"
    | "default"
    | "secondary"
    | "ghost"
    | null; // Button variant
  cancelText?: string; // Cancel button text
  confirmTextColor?: string;
  onConfirmAction: () => Promise<any>;
  onCancel?: () => void; // Optional cancel callback
  icon?: React.ReactNode; // Optional icon
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmText = "Delete",
  confirmTextColor,
  cancelText = "Cancel",
  onConfirmAction,
  variant,
  icon,
  onCancel,
}: ConfirmDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirmAction(); // wait until success
      setOpen(false); // ✅ close only after success
    } catch (error) {
      console.error("ConfirmDialog error:", error);
      // ❌ don’t close on error
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant={variant}>
            {icon}
            {title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className={confirmTextColor}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
