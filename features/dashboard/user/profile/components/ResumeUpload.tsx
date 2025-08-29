"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Eye, X } from "lucide-react";

interface ResumeUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResumeUpload({ value, onChange }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setFileName(file.name);
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

  const removeResume = () => {
    onChange("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const previewResume = () => {
    if (value) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <iframe src="${value}" style="width:100%; height:100vh; border:none;"></iframe>
        `);
      }
    }
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                {fileName || "Resume.pdf"}
              </p>
              <p className="text-sm text-green-600">
                PDF uploaded successfully
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={previewResume}
              className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeResume}
              className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-green-400 bg-green-50"
              : "border-green-200 hover:border-green-300 hover:bg-green-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload your resume
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop your resume here, or{" "}
            <button
              type="button"
              className="text-green-600 hover:text-green-700 font-medium"
              onClick={() => fileInputRef.current?.click()}
            >
              browse files
            </button>
          </p>
          <p className="text-xs text-gray-500">PDF files only, up to 10MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
