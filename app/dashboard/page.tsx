import {
  JobApplications,
  Jobs,
  Overview,
  Settings,
} from "@/components/pages/dashboard";
import Mainpage from "@/components/pages/dashboard/Mainpage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignOut } from "@/lib/ui";
export const dynamic = "force-dynamic";
export default function page() {
  return (
    <div>
      <SignOut />
    </div>
  );
}
