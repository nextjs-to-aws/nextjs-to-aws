import { z } from "zod";

export const subscriptionSchema = z.object({
  url: z.string().url().min(1).max(512),
});

export interface SubscriptionSchema
  extends z.infer<typeof subscriptionSchema> {}

export const defaultSubscriptionValues: SubscriptionSchema = {
  url: "https://",
};
