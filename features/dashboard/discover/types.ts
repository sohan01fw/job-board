import { Comment, JobPost, PostLike, User } from "@prisma/client";

export type UserCmts = {
  id: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: Date;
};

type JobWithCount = JobPost & {
  _count?: {
    jobApplications: number;
  };
};
export type PostUser = {
  id: string;
  authorId: string;
  author: User;
  comments: Comment[];
  postlikes: PostLike[];
  jobs?: JobWithCount | null;
  content: string;
  imageUrl: string[];
  createdAt: Date;
  updatedAt: Date;
};
