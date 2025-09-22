import { useComments } from "../../hooks/useComment";
import { formatDistanceToNow } from "date-fns";
import { UserCmts } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ShowComments({ postId }: { postId: string }) {
  const { data: comments, isLoading } = useComments({ postId });

  if (isLoading) return <p>Loading...</p>;
  if (!comments || comments.length === 0)
    return <p className="text-gray-500">No comments yet.</p>;

  return (
    <div className="space-y-4 mt-4">
      {comments.map((comment: UserCmts) => (
        <div key={comment.id} className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white font-bold">
            <Avatar className="w-12 h-12">
              <AvatarImage src={comment.author.img || "/placeholder.svg"} />
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">
                {comment.author.name}
              </span>
              <span className="text-gray-400 text-sm">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-gray-800">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
