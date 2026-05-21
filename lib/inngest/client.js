import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
    id: "welth",
    name: "Welth",
    retryFunction: (attempt) => ({
        delay: Math.pow(2, attempt) * 1000,
        maxAttempts: 2, // in milliseconds
    }),
});
