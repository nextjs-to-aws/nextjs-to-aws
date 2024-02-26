import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { posts } from "@/server/db/schema";
import { env } from "@/env.mjs";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  togetherAi: protectedProcedure
    .input(z.object({ prompt: z.string().min(1), html: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const url = "https://api.together.xyz/v1/chat/completions";
      const apiKey = env.TOGETHER_API_KEY;

      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      });

      const data = {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that parses html",
          },
          {
            role: "user",
            //It's better to add prompt last
            content: `${input.html} ${input.prompt}`,
          },
        ],
      };

      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      };
      interface choice {
        finish_reason: string;
        index: number;
        logprobs: null;
        message: { role: string; content: string };
      }

      interface togetherResponse {
        id: string;
        object: string;
        created: number;
        model: string;
        prompt: any[];
        choices: choice[];
        usage: {
          prompt_tokens: number;
          completion_tokens: number;
          total_tokens: number;
        };
      }

      const req = await fetch(url, options);
      const json = (await req.json()) as togetherResponse;

      return json.choices[0]?.message.content;
    }),
});
