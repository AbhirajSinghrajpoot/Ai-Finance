import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      console.warn("No user found in Clerk");
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Initializing user:", user.id, user.emailAddresses);

    // Check if user already exists
    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) {
      console.log("User already exists in database");
      return Response.json(loggedInUser);
    }

    // Create new user
    const name = `${user.firstName || "User"} ${user.lastName || ""}`.trim();
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      console.error("No email found for user:", user.id);
      return Response.json({ error: "No email found" }, { status: 400 });
    }

    console.log("Creating new user:", { clerkUserId: user.id, name, email });

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    });

    console.log("User created successfully:", newUser.id);
    return Response.json(newUser);
  } catch (error) {
    console.error("User Init Error:", error);
    return Response.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
