import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { subscriptionRouter } from "./routers/subscription.route";

export const appRouter = createTRPCRouter({
  post: postRouter,
  subscription: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
