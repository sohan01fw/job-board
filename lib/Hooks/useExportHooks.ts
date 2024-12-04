import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function useExportHooks() {
  const { toast } = useToast();
  const router = useRouter();

  return { toast, router };
}
