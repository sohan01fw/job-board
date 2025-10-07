"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  Monitor,
  Apple,
  ShoppingCart,
  Facebook,
  Film,
  Car,
  Music,
} from "lucide-react";

const companies = [
  {
    name: "Google",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "Microsoft",
    icon: Monitor,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    name: "Apple",
    icon: Apple,
    color: "text-gray-800",
    bg: "bg-gray-100",
  },
  {
    name: "Amazon",
    icon: ShoppingCart,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    name: "Meta",
    icon: Facebook,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    name: "Netflix",
    icon: Film,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    name: "Tesla",
    icon: Car,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    name: "Spotify",
    icon: Music,
    color: "text-green-500",
    bg: "bg-green-50",
  },
];

export default function CompaniesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Top global companies use our platform to find exceptional talent.
            Join the network that connects you with industry leaders.
          </p>
        </div>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
          {companies.map((company, index) => {
            const Icon = company.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:scale-105 dark:border-gray-800 dark:hover:border-gray-700"
              >
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div
                    className={`w-14 h-14 ${company.bg} rounded-xl flex items-center justify-center transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${company.color}`} />
                  </div>
                  <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
                    {company.name}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
