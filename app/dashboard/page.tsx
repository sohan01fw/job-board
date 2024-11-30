import { Navigationtab } from "@/components/pages/dashboard/Navigationtab";

export default async function Jobs() {
  return (
    <div className="m-10">
      <div className="">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>

      <div className="">
        <h1 className="text-sm font-semibold text-gray-400">Welcome,sohan</h1>
      </div>

      <div className="">
        <Navigationtab />
      </div>
    </div>
  );
}
