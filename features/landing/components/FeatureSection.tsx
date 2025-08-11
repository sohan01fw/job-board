"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, Target, Shield } from "lucide-react";
import { useEffect, useRef } from "react";
import { useScrollStore } from "../stores/scrollStore";

const features = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description:
      "Our AI-powered algorithm matches you with jobs that fit your skills, experience, and preferences.",
  },
  {
    icon: Users,
    title: "Network Building",
    description:
      "Connect with industry professionals and expand your network through our community features.",
  },
  {
    icon: Target,
    title: "Career Guidance",
    description:
      "Get personalized career advice and insights to help you make informed decisions about your future.",
  },
  {
    icon: Shield,
    title: "Verified Companies",
    description:
      "All companies on our platform are verified to ensure legitimate opportunities and safe applications.",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const register = useScrollStore((s) => s.register);

  useEffect(() => {
    register("features", ref.current);
    return () => register("features", null);
  }, [register]);
  return (
    <section ref={ref} id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Online&aposs Matching Resume Service and Career Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and services to accelerate your career growth
            and job search success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
