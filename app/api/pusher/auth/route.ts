import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { getCachedUser } from "@/lib/redis";
import { prisma } from "@/lib/Prisma";

// ✅ Force Node.js runtime so cookies/session are accessible
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // ✅ Parse Pusher POST body (x-www-form-urlencoded)
    const body = await req.text();
    const formData = new URLSearchParams(body);

    const socketId = formData.get("socket_id")!;
    const channel = formData.get("channel_name")!;

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

    if (
      channel.startsWith("private-follow-") ||
      channel.startsWith("private-user-notification-") ||
      channel.startsWith("private-job-notification-")
    ) {
      const targetUserId = channel.split("-").pop();
      if (targetUserId !== user.id)
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Authorize channel
    const authResponse = pusherServer.authorizeChannel(socketId, channel, {
      user_id: user.id,
    });

    return NextResponse.json(authResponse, { status: 200 });
  } catch (err) {
    console.error("Pusher auth error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Optional: handle preflight (CORS) if needed
export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set(
    "Access-Control-Allow-Origin",
    "https://job-board-all.vercel.app",
  );
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  return res;
}
