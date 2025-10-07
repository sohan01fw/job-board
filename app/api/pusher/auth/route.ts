import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { getCachedUser } from "@/lib/redis";
import { prisma } from "@/lib/Prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const socketId = formData.get("socket_id") as string;
    const channel = formData.get("channel_name") as string;

    const user = await getCachedUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ✅ Channel authorization
    if (channel.startsWith("private-chat-")) {
      const chatId = channel.replace("private-chat-", "");
      const participant = await prisma.chatParticipant.findFirst({
        where: { chatId, userId: user.id },
      });
      if (!participant)
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (channel.startsWith("private-follow-")) {
      const targetUserId = channel.replace("private-follow-", "");
      if (targetUserId !== String(user.id))
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (channel.startsWith("private-user-notification-")) {
      const targetUserId = channel.replace("private-user-notification-", "");
      if (targetUserId !== String(user.id))
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (channel.startsWith("private-job-notification-")) {
      const targetUserId = channel.replace("private-job-notification-", "");
      if (targetUserId !== String(user.id))
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const authResponse = pusherServer.authorizeChannel(socketId, channel, {
      user_id: user.id,
    });

    return NextResponse.json(authResponse, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
