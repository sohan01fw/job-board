import { Briefcase, Clock, MapPin, Users } from "lucide-react";

type ActivityItem = {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  status?: string;
  meta?: { icon?: React.ReactNode; label: string }[];
};

export function getActivityConfig(activity: any): ActivityItem {
  switch (activity.type) {
    case "JOB_PENDING":
    case "JOB_REJECTED":
    case "JOB_ACCEPTED":
      return {
        id: activity.id,
        type: activity.type,
        title: `${activity.jobApplication?.job?.title ?? "Job"} at ${
          activity.jobApplication?.job?.company ?? ""
        }`,
        subtitle: activity.jobApplication?.job?.location ?? "",
        status: activity?.status,
        meta: [
          {
            icon: <MapPin className="h-3 w-3" />,
            label: activity.jobApplication?.job?.location ?? "Unknown",
          },
        ],
      };

    case "FOLLOW": {
      const isActorFollower = activity.userId === activity.follow?.followerId;

      return {
        id: activity.id,
        type: activity.type,
        title: isActorFollower
          ? `You followed ${activity.follow?.following?.name ?? "someone"}`
          : `${activity.follow?.follower?.name ?? "Someone"} followed you`,
      };
    }

    case "UNFOLLOW": {
      const isActorFollower = activity.userId === activity.follow?.followerId;

      return {
        id: activity.id,
        type: activity.type,
        title: isActorFollower
          ? `You unfollowed ${activity.follow?.following?.name ?? "someone"}`
          : `${activity.follow?.follower?.name ?? "Someone"} unfollowed you`,
      };
    }

    case "FOLLOW_ACCEPTED": {
      const acceptedBy = activity.follow?.follower; // the one who accepted
      const requestedBy = activity.follow?.following; // the one who sent the original follow

      const isCurrentUserAccepted = activity.userId === acceptedBy?.id;

      return {
        id: activity.id,
        type: activity.type,
        title: isCurrentUserAccepted
          ? `You accepted ${requestedBy?.name ?? "someone"}'s follow request`
          : `${acceptedBy?.name ?? "Someone"} accepted your follow request`,
      };
    }

    default:
      return {
        id: activity.id,
        type: activity.type,
        title: "Unknown activity",
      };
  }
}

export function getIcon(type: string) {
  switch (type) {
    case "JOB_PENDING":
      return (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Briefcase className="h-4 w-4 text-blue-600" aria-hidden="true" />
        </div>
      );
    case "JOB_REJECTED":
      return (
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <Briefcase className="h-4 w-4 text-red-600" aria-hidden="true" />
        </div>
      );
    case "JOB_ACCEPTED":
      return (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Briefcase className="h-4 w-4 text-green-600" aria-hidden="true" />
        </div>
      );
    case "FOLLOW":
    case "FOLLOWED_BY":
      return (
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <Users className="h-4 w-4 text-purple-600" aria-hidden="true" />
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <Clock className="h-4 w-4 text-gray-600" aria-hidden="true" />
        </div>
      );
  }
}
