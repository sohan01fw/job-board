import { JobData } from "../types";

export interface JobApplicationData extends JobData {
  id?: string;
  userId?: string;
}
