import { Comment, User } from "@prisma/client";

export type UserCmts = {
  id: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: Date;
};

export type PostUser = {
  id: string;
  authorId: string;
  author: User;
  comments: Comment[];
  content: string;
  imageUrl: string[];
  likes: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
};
