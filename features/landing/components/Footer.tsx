"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { useScrollStore } from "../stores/scrollStore";

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  const register = useScrollStore((s) => s.register);

  useEffect(() => {
    register("footer", ref.current);
    return () => register("footer", null);
  }, [register]);
  return (
    <footer ref={ref} className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">JobBoard</h3>
            <p className="text-gray-400 mb-4">
              Connecting talented professionals with amazing opportunities
              worldwide.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs">in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/browse-jobs" className="hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/career-advice" className="hover:text-white">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link href="/resume-builder" className="hover:text-white">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/salary-guide" className="hover:text-white">
                  Salary Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/post-job" className="hover:text-white">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/browse-resumes" className="hover:text-white">
                  Browse Resumes
                </Link>
              </li>
              <li>
                <Link href="/hiring-solutions" className="hover:text-white">
                  Hiring Solutions
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Get the latest job opportunities delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-green-500 hover:bg-green-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 JobBoard. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-400">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
