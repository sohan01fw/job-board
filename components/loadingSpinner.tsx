import { Loader2Icon } from "lucide-react";

export default function Spinner({ className = "w-6 h-6 text-blue-500" }) {
  return <Loader2Icon className={`animate-spin ${className} text-gray-500`} />;
}
