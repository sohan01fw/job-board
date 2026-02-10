import { useComments } from "../../hooks/useComment";
import { formatDistanceToNow } from "date-fns";
import { UserCmts } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function ShowComments({ postId }: { postId: string }) {
  const { data: comments, isLoading } = useComments({ postId });

  if (isLoading)
    return (
      <div className="space-y-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start space-x-3 p-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );

  if (!comments || comments.length === 0)
    return (
      <p className="text-gray-500 dark:text-gray-400 py-4">No comments yet.</p>
    );

  return (
    <div className="space-y-4 mt-4">
      {comments.map((comment: UserCmts) => (
        <div
          key={comment.id}
          className="flex items-start space-x-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
        >
          <div className="flex-shrink-0">
            <Avatar className="w-12 h-12">
              <AvatarImage src={comment.author.img || "/placeholder.svg"} />
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {comment.author.name}
              </span>
              <span className="text-gray-400 dark:text-gray-400 text-sm">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-gray-800 dark:text-gray-200 mt-1">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
