import { JobData } from "../types";

export interface PostedJobsType extends JobData {
  id: string;
  _count: {
    jobApplications: number;
  };
}
