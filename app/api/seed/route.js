import { seedTransactions } from "@/actions/seed";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
    const { userId } = await auth();
    
    if (!userId) {
        return Response.json(
            { error: "Unauthorized - Please sign in first" },
            { status: 401 }
        );
    }

    // Get accountId from query parameters if provided
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    const result = await seedTransactions(userId, accountId);
    return Response.json({ result });
}