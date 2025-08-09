"use client";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import googlelogo from "@/app/assets/google.png";
import notionlogo from "@/app/assets/notion.png";
import { useEffect, useRef } from "react";
import { useScrollStore } from "@/lib/Stores/scrollStore";

export default function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const register = useScrollStore((s) => s.register);

  useEffect(() => {
    register("home", ref.current);
    return () => register("home", null);
  }, [register]);
  return (
    <section
      ref={ref}
      id="home"
      className="bg-gradient-to-br from-green-50 to-green-100 py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Discover Your
          <br />
          Next <span className="text-green-600">Career Move</span>
          <br />
          <span className="text-gray-400">Or Star Candidate</span> Today
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Empowering job seekers to land their dream role and recruiters to hire
          top talent with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6  text-lg font-semibold rounded-full">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-5 text-lg font-semibold rounded-full flex items-center gap-2 shadow-md"
          >
            <Play className="h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Floating Profile Cards */}
        <div className="absolute top-80 left-48 hidden xl:block animate-float">
          <div className="absolute top-[-15rem] transform -translate-x-1/2 -translate-y-1/2 hidden xl:block animate-float">
            <div className="bg-white/30 backdrop-blur-sm text-gray-900 flex items-center rounded-2xl shadow-lg px-5 py-4 max-w-xs border border-white/40 gap-3">
              <div className="flex-shrink-0">
                <Image
                  src={notionlogo}
                  alt="Company Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm opacity-90 leading-tight">
                  Senior Software Engineer
                </p>
                <p className="text-xl font-bold leading-tight">$8,000/Month</p>
                <p className="text-xs opacity-75 mt-0.5">Full-time • Remote</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-xs">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                MA
              </div>
              <div>
                <p className="font-semibold text-gray-900">Maria Angelica M</p>
                <p className="text-sm text-gray-500">Product Designer</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Hired May 15, 2024</p>
            <div className="flex space-x-1 mt-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-10 hidden lg:block animate-float">
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-xs">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                MA
              </div>
              <div>
                <p className="font-semibold text-gray-900">Marcus Alexander</p>
                <p className="text-sm text-gray-500">System Developer</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Hired May 12, 2024</p>
            <div className="flex space-x-1 mt-2">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-20 hidden lg:block animate-float">
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-xs">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                VM
              </div>
              <div>
                <p className="font-semibold text-gray-900">Vince Marcomo</p>
                <p className="text-sm text-gray-500">Human Resources</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 right-20 hidden lg:block animate-float">
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-xs">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                RW
              </div>
              <div>
                <p className="font-semibold text-gray-900">Robert Williamson</p>
                <p className="text-sm text-gray-500">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Card */}

        <div className="absolute top-10 right-80 transform -translate-x-1/2 -translate-y-1/2 hidden xl:block animate-float">
          <div className="bg-white/30 backdrop-blur-sm text-gray-900 flex items-center gap-4 rounded-2xl shadow-lg p-6 max-w-xs border border-white/40">
            <Image
              src={googlelogo}
              alt="Company Logo"
              width={32} // 8 * 4 = 32px
              height={32}
              className="w-8 h-8 rounded-full object-contain"
            />
            <div>
              <p className="text-sm opacity-90">Senior Product Designer</p>
              <p className="text-2xl font-bold">$5,000/Month</p>
              <p className="text-xs opacity-75 mt-1">Full-time • Remote</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Logos */}
      <div className="container mx-auto px-4 mt-16">
        <div className="flex justify-center items-center space-x-12 opacity-60">
          <div className="text-2xl font-bold text-gray-400">miro</div>
          <div className="text-2xl font-bold text-gray-400">stripe</div>
          <div className="text-2xl font-bold text-gray-400">Google</div>
          <div className="text-2xl font-bold text-gray-400">Adobe</div>
          <div className="text-2xl font-bold text-gray-400">Spotify</div>
        </div>
      </div>
    </section>
  );
}
