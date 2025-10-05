"use client";

import { useState, useEffect, memo } from "react";
import data from "@emoji-mart/data";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";

const Picker = dynamic(() => import("@emoji-mart/react"), { ssr: false }); // SSR false

interface EmojiPickerProps {
  onSelectAction: (emoji: string) => void;
  text?: string;
}

export const EmojiPicker = memo(function EmojiPicker({
  onSelectAction,
  text,
}: EmojiPickerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-primary"
        >
          <Smile className="w-5 h-5 text-muted-foreground" />
          {text ?? ""}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="p-0 border-none shadow-none bg-transparent"
        align="start"
      >
        {mounted ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-80 overflow-y-auto no-scrollbar">
              <Picker
                data={data}
                onEmojiSelect={(emoji: any) => onSelectAction(emoji.native)}
                theme="light"
              />
            </div>
          </div>
        ) : (
          <div className="flex h-80 items-center justify-center">
            <p className="text-muted-foreground">No results</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
