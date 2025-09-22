"use client";

import { Search, Phone, Video, ChevronDown, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function UserInfo() {
  const [expandedSections, setExpandedSections] = useState({
    chatInfo: true,
    customize: false,
    media: false,
    privacy: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* User Profile Header */}
      <div className="p-6 text-center border-b border-gray-200">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src="/professional-man.png" alt="Prabhat Nepal" />
          <AvatarFallback className="bg-green-600 text-white text-xl">
            PN
          </AvatarFallback>
        </Avatar>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Prabhat Nepal
        </h2>
        <p className="text-sm text-gray-600 mb-1">@prabhatnepal.69</p>
        <p className="text-sm text-green-600 mb-4">Active 32m ago</p>

        <Badge className="bg-gray-100 text-gray-700 mb-4">
          🔒 End-to-end encrypted
        </Badge>

        <div className="flex justify-center gap-4">
          <Button
            size="sm"
            variant="ghost"
            className="flex flex-col items-center text-gray-600 hover:bg-gray-100"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs">Profile</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="flex flex-col items-center text-gray-600 hover:bg-gray-100"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-xs">Unmute</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="flex flex-col items-center text-gray-600 hover:bg-gray-100"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-xs">Search</span>
          </Button>
        </div>
      </div>

      {/* Chat Info Section */}
      <div className="border-b border-gray-200">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-4 text-gray-900 hover:bg-gray-50"
          onClick={() => toggleSection("chatInfo")}
        >
          <span className="font-medium">Chat info</span>
          {expandedSections.chatInfo ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>

        {expandedSections.chatInfo && (
          <div className="px-4 pb-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Notifications</span>
              <span className="text-gray-900">On</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Ignore messages</span>
              <span className="text-gray-900">Off</span>
            </div>
          </div>
        )}
      </div>

      {/* Customize Chat Section */}
      <div className="border-b border-gray-200">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-4 text-gray-900 hover:bg-gray-50"
          onClick={() => toggleSection("customize")}
        >
          <span className="font-medium">Customize chat</span>
          {expandedSections.customize ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>

        {expandedSections.customize && (
          <div className="px-4 pb-4 space-y-3">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🎨</span>
              </div>
              <span className="text-gray-900 text-sm">Change theme</span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">😊</span>
              </div>
              <span className="text-gray-900 text-sm">Change emoji</span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-700 text-sm">Aa</span>
              </div>
              <span className="text-gray-900 text-sm">Edit nicknames</span>
            </div>
          </div>
        )}
      </div>

      {/* Media & Files Section */}
      <div className="border-b border-gray-200">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-4 text-gray-900 hover:bg-gray-50"
          onClick={() => toggleSection("media")}
        >
          <span className="font-medium">Media & files</span>
          {expandedSections.media ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>

        {expandedSections.media && (
          <div className="px-4 pb-4">
            <p className="text-gray-600 text-sm">No media shared yet</p>
          </div>
        )}
      </div>

      {/* Privacy & Support Section */}
      <div>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-4 text-gray-900 hover:bg-gray-50"
          onClick={() => toggleSection("privacy")}
        >
          <span className="font-medium">Privacy & support</span>
          {expandedSections.privacy ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>

        {expandedSections.privacy && (
          <div className="px-4 pb-4 space-y-3">
            <div className="text-sm text-gray-600 cursor-pointer hover:text-gray-900">
              Block messages
            </div>
            <div className="text-sm text-gray-600 cursor-pointer hover:text-gray-900">
              Report conversation
            </div>
            <div className="text-sm text-gray-600 cursor-pointer hover:text-gray-900">
              Delete conversation
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
