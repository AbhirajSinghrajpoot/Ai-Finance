import { db } from "@/lib/prisma";

export async function GET() {
  try {
    // Simple ping to the database
    const result = await db.$queryRaw`SELECT 1 as ok`;
    const ok = Array.isArray(result) ? result[0]?.ok === 1 : false;

    return Response.json({
      ok,
      engine: "prisma",
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error?.message || "DB check failed",
        hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      },
      { status: 500 }
    );
  }
}
