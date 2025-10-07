"use client";
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useScrollStore } from "../stores/scrollStore";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    content:
      "I found my dream job within 2 weeks of joining. The platform's matching system is incredibly accurate!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "StartupXYZ",
    content:
      "The quality of job opportunities here is outstanding. Highly recommend to any job seeker.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    company: "DesignStudio",
    content:
      "Great platform with excellent support. The career guidance helped me negotiate a better salary.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Backend Engineer",
    company: "DataWorks",
    content:
      "Impressed by how fast I got interview calls. The filters and company matches are on point.",
    rating: 5,
  },
  {
    name: "Olivia Martinez",
    role: "Marketing Specialist",
    company: "Brandify",
    content:
      "This site made job searching stress-free. The UX is clean and the job alerts are super useful!",
    rating: 5,
  },
  {
    name: "Daniel Kim",
    role: "DevOps Engineer",
    company: "CloudNova",
    content:
      "I appreciated the curated job recommendations — I landed a remote role with amazing benefits.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const register = useScrollStore((s) => s.register);

  useEffect(() => {
    register("testimonials", ref.current);
    return () => register("testimonials", null);
  }, [register]);
  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Stories from Our Happy Clients
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from professionals who have successfully found their ideal
            positions through our platform.
          </p>
        </div>

        {/* Auto scroll container */}
        <div className="relative overflow-hidden py-6">
          <div className="flex animate-scroll gap-6">
            {/* Duplicate testimonials for seamless scroll */}
            {[...testimonials, ...testimonials].map((t, idx) => (
              <Card
                key={idx}
                className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] flex-shrink-0 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor" // <-- make it filled
                        stroke="currentColor"
                        aria-hidden
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4 italic leading-relaxed break-words flex-grow">
                    “{t.content}”
                  </p>
                  <div className="mt-auto">
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{t.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-20%);
          }
        }
      `}</style>
    </section>
  );
}
