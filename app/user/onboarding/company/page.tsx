import { UserCompany } from "@/features/auth/components/onboarding/usercompany";
import { CheckCompany } from "@/lib/Actions/Company";
import { authUser } from "@/lib/Actions/Users";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function page() {
  //authenticate the user if not present redirect to login page
  const userauth = await authUser();
  if (!userauth || !userauth?.email) {
    return redirect("/auth/login");
  }
  const user = userauth;
  const companyData = await CheckCompany(user.id);
  if ("error" in companyData) {
    console.log(companyData.message);
  }
  return (
    <div className="">
      <div>
        <h1 className="text-gray-900 font-bold text-5xl ">onBoarding </h1>
        <p className="text-gray-500 ml-3 text-sm">
          Edit user company information
        </p>
      </div>
      <div className="">
        <UserCompany
          name={companyData.data?.name || ""}
          desc={companyData.data?.desc || ""}
          userId={user.id}
        />
      </div>
    </div>
  );
}
