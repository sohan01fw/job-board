import { LandingPage } from "@/components/pages/index/Landingpage";
import { Navbar } from "@/components/pages/index/Navbar";

export default async function Home() {
  return (
    <div className="">
      <Navbar />
      <LandingPage />
    </div>
  );
}
