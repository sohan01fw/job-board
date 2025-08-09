"use client";
import Link from "next/link";
import { CheckCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useScrollStore } from "@/lib/Stores/scrollStore";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="absolute w-full px-4 py-4 flex justify-center ">
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm shadow-lg rounded-3xl px-6 py-3">
          {/* flex layout: logo | nav links | actions */}
          <div className="flex items-center justify-between">
            {/* left: logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold text-gray-900">
                  JobBoard
                </span>
              </Link>
            </div>

            {/* center: nav links (hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks />
            </div>

            {/* right: actions */}
            <div className="flex items-center gap-3">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium">
                Log In
              </Button>
              {/* mobile toggle */}
              <button
                className="md:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* mobile dropdown */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              menuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-gray-50 rounded-xl py-2 space-y-1">
              <NavLinks mobile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ mobile }: { mobile?: boolean }) {
  const scrollTo = useScrollStore((s) => s.scrollTo);
  const btnStyle = mobile
    ? "block px-4 py-3 rounded-lg hover:bg-white text-gray-700"
    : "text-gray-700 hover:text-gray-900 font-medium";

  return (
    <>
      <button onClick={() => scrollTo("home")} className={btnStyle}>
        Home
      </button>
      <button onClick={() => scrollTo("features")} className={btnStyle}>
        Features
      </button>
      <button onClick={() => scrollTo("pricing")} className={btnStyle}>
        Pricing
      </button>
      {/* leave blog untouched per your request */}
      <Link href="/blogs" className={btnStyle}>
        Blog
      </Link>
      <button onClick={() => scrollTo("testimonials")} className={btnStyle}>
        Testimonials
      </button>
    </>
  );
}
