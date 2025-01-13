import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Briefcase, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <svg
            className="absolute h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.07)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Find Your Dream Job Today
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with top employers and kickstart your career journey
              </p>
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/jobs">
                  Browse Jobs <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="w-full">
              <div className="relative transform perspective-1000 hover:scale-105 transition-transform duration-500">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Create-Next-App-01-08-2025_09_37_PM-YbDOSzWFHRq9rP986F4z5Yv7SNdgKR.png"
                    alt="Dashboard Preview"
                    width={1000}
                    height={100}
                    className="w-full h-auto transform hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Job Board?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "Top Companies",
                description:
                  "Connect with industry-leading companies and startups.",
              },
              {
                icon: CheckCircle,
                title: "Verified Jobs",
                description: "All job listings are verified and up-to-date.",
              },
              {
                icon: Users,
                title: "Career Resources",
                description:
                  "Access guides, tips, and tools to advance your career.",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of job seekers who have found their perfect role
            through our platform.
          </p>
          <Button size="lg" asChild>
            <Link href="/jobs">Browse All Jobs</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Software Engineer",
                quote:
                  "I found my dream job within weeks of using this platform. The process was smooth and the job recommendations were spot-on!",
              },
              {
                name: "Sarah Lee",
                role: "Marketing Specialist",
                quote:
                  "The career resources provided were invaluable. They helped me prepare for interviews and negotiate my salary confidently.",
              },
              {
                name: "Michael Brown",
                role: "Data Analyst",
                quote:
                  "The variety of job listings is impressive. I appreciated the ability to filter by remote work options, which led me to my current role.",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-full mr-4"></div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">JobBoard</h3>
              <p>Connecting talent with opportunity.</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/jobs">Find Jobs</Link>
                </li>
                <li>
                  <Link href="/companies">Companies</Link>
                </li>
                <li>
                  <Link href="/resources">Resources</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
              <p className="mb-4">
                Subscribe to our newsletter for the latest job updates and
                career tips.
              </p>
              <div className="flex">
                <Input
                  className="bg-white text-black mr-2"
                  placeholder="Your email"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
            <p>&copy; 2024 JobBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
