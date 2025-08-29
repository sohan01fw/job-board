import { Navbar } from "@/features/landing/components/Navbar";
import CompaniesSection from "@/features/landing/components/CompaniesSection";
import FeaturesSection from "@/features/landing/components/FeatureSection";
import Footer from "@/features/landing/components/Footer";
import HeroSection from "@/features/landing/components/HeroSection";
import JobSearchSection from "@/features/landing/components/JobSearchSection";
import ResumeBuilderSection from "@/features/landing/components/ResumeSection";
import StatsSection from "@/features/landing/components/StatsSection";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";
import { authUser } from "@/lib/Actions/Users";

export default async function LandingPage() {
  const user = await authUser();

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} />
      <HeroSection />
      <JobSearchSection />
      <ResumeBuilderSection />
      <FeaturesSection />
      <StatsSection />
      <CompaniesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
