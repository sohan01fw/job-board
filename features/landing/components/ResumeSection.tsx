"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JobAISection() {
  const router = useRouter();
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          {/* Left Side - AI Recommendation Info */}
          <div className="text-center xl:text-left">
            <div className="inline-flex items-center mb-4 px-3 py-1 bg-green-100 text-green-700 rounded-full">
              <Cpu className="h-5 w-5 mr-2" />
              <span className="text-sm font-semibold">AI Powered</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              Get Smart Job Recommendations Instantly
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto xl:mx-0">
              Our AI-driven platform matches you with the most relevant job
              opportunities based on your skills, experience, and career goals.
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold"
            >
              Explore Jobs
            </Button>
          </div>

          {/* Right Side - Salary Chart & Job Card */}
          <div className="relative max-w-3xl mx-auto px-4 py-12">
            {/* Salary Estimate Chart */}
            <div className="absolute top-0 left-1/2 md:-left-[2rem] -translate-x-1/2 xl:-translate-x-1/3 w-72 shadow-lg p-4 rounded-xl bg-white">
              <p className="text-sm text-gray-500 mb-4 text-center font-medium">
                Salary Estimate
              </p>
              <div className="flex justify-center items-end space-x-1 mb-4 h-24">
                {[40, 60, 80, 100, 70, 90, 85, 95, 75, 85, 90, 80].map(
                  (height, i) => (
                    <div
                      key={i}
                      className="bg-green-500 rounded-t transition-all duration-300"
                      style={{ height: `${height}px`, width: "12px" }}
                    />
                  ),
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900 text-center">
                $4.58K
              </p>
            </div>

            {/* Job Card */}
            <Card className="max-w-sm mx-auto relative z-10 mt-80 md:mt-64 xl:mt-0 xl:ml-16 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">△</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Senior UI Designer
                </h3>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">Remote • $4,100 - $7,000</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  AI suggests the best roles for you based on your skills and
                  experience to maximize your chances of landing your dream job.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    React
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    iOS Developer
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Android Engineer
                  </Badge>
                </div>

                <Button className="bg-green-500 hover:bg-green-600 text-white mt-auto">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
