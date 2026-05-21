import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId, sessionId } = auth();
  return Response.json({ userId, sessionId });
}
