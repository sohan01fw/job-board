"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, Target, Shield, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useScrollStore } from "../stores/scrollStore";

const features = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description:
      "Our AI-powered algorithm precisely matches you with jobs that fit your unique skills, experience, and career preferences.",
  },
  {
    icon: Users,
    title: "Network Building",
    description:
      "Connect meaningfully with industry professionals and expand your professional circle through our exclusive community features.",
  },
  {
    icon: Target,
    title: "Career Guidance",
    description:
      "Get personalized career advice, roadmap planning, and industry insights to help you make informed decisions about your future.",
  },
  {
    icon: Shield,
    title: "Verified Companies",
    description:
      "Sleep easy knowing all companies on our platform are thoroughly verified to ensure legitimate opportunities and safe applications.",
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
    <section ref={ref} id="features" className="py-24 relative overflow-hidden bg-white">
      {/* Subtle Green Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50/50 via-transparent to-transparent opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-50/50 via-transparent to-transparent opacity-70 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-green-50 text-green-600 font-semibold text-sm mb-4 border border-green-100">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
             Accelerate Your Career with <br/>
            <span className="text-green-600 relative inline-block">
              Intelligent Tools
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-green-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed font-medium">
            We provide everything you need to find your dream job, connect with the right people, and grow professionally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative border-0 shadow-none bg-white transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-2xl bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-105" />
              
              <CardContent className="p-6 h-full flex flex-col">
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-200 group-hover:shadow-green-300 transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-[15px] mb-6 flex-grow">
                  {feature.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-green-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Read more <ArrowUpRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
