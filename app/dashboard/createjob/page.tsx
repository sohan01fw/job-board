import { CreateJobForm } from "@/components/pages/dashboard/CreateJobForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { authUser } from "@/lib/Actions/Users";
import { redirect } from "next/navigation";

export default async function page() {
  const authResponse = await authUser();

  if (!authResponse || !authResponse.user) {
    return redirect("/auth/login");
  }

  const email = authResponse.user.email ?? "";
  const id = authResponse.user.id ?? "";

  return (
    <div className="m-2">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create-Job</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-center">
        <div className=" p-5 rounded-lg shadow-xl m-5 ">
          <CreateJobForm userEmail={email} userId={id} />
        </div>
      </div>
    </div>
  );
}
