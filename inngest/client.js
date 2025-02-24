import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ai-podcast-generator",deploymentUrl:process.env.NEXT_PUBLIC_INNGEST_DEPLOYMENT_URL });
