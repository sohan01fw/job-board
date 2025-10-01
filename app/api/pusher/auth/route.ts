import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { getCachedUser } from "@/lib/redis";
import { prisma } from "@/lib/Prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const socketId = body.get("socket_id") as string;
    const channel = body.get("channel_name") as string;

    const user = await getCachedUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ Check based on channel type
    if (channel.startsWith("private-chat-")) {
      const chatId = channel.replace("private-chat-", "");
      const participant = await prisma.chatParticipant.findFirst({
        where: { chatId, userId: user.id },
      });
      if (!participant) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    if (channel.startsWith("private-follow-")) {
      const targetUserId = channel.replace("private-follow-", "");
      // only allow subscribing to your own follow channel
      if (targetUserId !== user.id) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    // 🎯 You can add more channel types here later...

    // ✅ Authorize with Pusher
    const authResponse = pusherServer.authorizeChannel(socketId, channel);
    return NextResponse.json(authResponse);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
