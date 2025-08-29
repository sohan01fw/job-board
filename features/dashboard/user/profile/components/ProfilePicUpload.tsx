"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User, X } from "lucide-react";

interface ProfileImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProfileImageUpload({
  value,
  onChange,
}: ProfileImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-32 h-32 border-4 border-green-200">
          <AvatarImage
            src={value || "/placeholder.svg"}
            alt="Profile picture"
          />
          <AvatarFallback className="bg-green-50 text-green-600">
            <User className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>
        {value && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? "border-green-400 bg-green-50"
            : "border-green-200 hover:border-green-300 hover:bg-green-50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop your photo here, or{" "}
          <button
            type="button"
            className="text-green-600 hover:text-green-700 font-medium"
            onClick={() => fileInputRef.current?.click()}
          >
            browse files
          </button>
        </p>
        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
