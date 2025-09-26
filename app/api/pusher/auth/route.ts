import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { prisma } from "@/lib/Prisma";
import { getCachedUser } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const socketId = body.get("socket_id") as string;
    const channel = body.get("channel_name") as string;

    const user = await getCachedUser(); // e.g. from session
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // channel looks like: "private-chat-<chatId>"
    const chatId = channel.replace("private-chat-", "");

    // 🔍 Prisma check: is this user a participant?
    const participant = await prisma.chatParticipant.findFirst({
      where: { chatId, userId: user.id },
    });

    if (!participant) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // ✅ Authorize with Pusher
    const authResponse = pusherServer.authorizeChannel(socketId, channel);
    return NextResponse.json(authResponse);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
