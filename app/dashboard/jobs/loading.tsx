import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <div className="flex flex-col gap-3 justify-center mt-10 w-full">
        <div className="flex flex-col items-center gap-5">
          <div>
            <div className="mb-2">
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <div>
              <Skeleton className="w-[30rem] h-[30px] rounded-full" />
            </div>
          </div>
          <div>
            <div className="mb-2">
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <div>
              <Skeleton className="w-[30rem] h-[30px] rounded-full" />
            </div>
          </div>
          <div>
            <div className="mb-2">
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <div>
              <Skeleton className="w-[30rem] h-[30px] rounded-full" />
            </div>
          </div>
          <div>
            <div className="mb-2">
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <div>
              <Skeleton className="w-[30rem] h-[30px] rounded-full" />
            </div>
          </div>
          <div>
            <div className="mb-2">
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <div>
              <Skeleton className="w-[30rem] h-[30px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
