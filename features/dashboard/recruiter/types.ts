import { JobData } from "../types";

export interface PostedJobsType extends JobData {
  id: string;
  _count: {
    jobApplications: number;
  };
}

export type Applicant = {
  id: string;
  coverLetter: string;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    img?: string;
    phone?: string;
    experience?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    resume?: string;
  };
};
export type JobApplicantType = {
  id: string;
  userId: string;
  job: {
    id: string;
    title: string;
  };
};
