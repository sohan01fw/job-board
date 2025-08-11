import useSWRMutation from "swr/mutation";
import { CreateJobs } from "../actions";

type CreateJobArg = {
  values: any;
  userEmail: string;
  userId: string;
};

export function useCreateJob() {
  return useSWRMutation(
    "/create-job",
    async (url, { arg }: { arg: CreateJobArg }) => {
      return CreateJobs(arg.values as any, arg.userEmail, arg.userId);
    },
  );
}
