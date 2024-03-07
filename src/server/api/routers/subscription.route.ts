import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { parse } from "node-html-parser";
import { subscriptionSchema } from "@/lib/validations/subscriptions";
import { Tiktoken, TiktokenBPE } from "js-tiktoken";
import {
  checkIfUrlIsCrawlable,
  countTokens,
  postHtmlToTogether,
} from "@/lib/togetherUtils";
import { checkIfDomainIsBlacklisted } from "@/lib/urlBlacklist";
import { IScrapedUrlResponse } from "@/lib/prompts";

export const subscriptionRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  checkIfUrlIsAllowedToBeCrawled: protectedProcedure
    .input(subscriptionSchema)
    .mutation(
      async ({
        input,
      }): Promise<{
        isCrawlable: boolean;
        content: IScrapedUrlResponse | null;
        errorMessage: string | null;
      }> => {
        //1. check if the url already exists in my stored subscriptions
        //2. check if the url has already been crawled this month and if it's crawlable
        //if it hasn't been crawled this month, crawl it
        //3. check the robots file of the domain url
        //4. store the ulr in the all urls table with the timestamp
        const domainIsBlacklisted = checkIfDomainIsBlacklisted(input.url);
        if (domainIsBlacklisted) {
          return {
            isCrawlable: false,
            content: null,
            errorMessage:
              "This domain is in our no no list, please try another one",
          };
        }

        const { error, isCrawlable } = await checkIfUrlIsCrawlable({
          url: input.url,
        });
        if (error)
          throw new Error("Something went wrong while checking the url");
        if (!isCrawlable)
          return {
            isCrawlable: false,
            content: null,
            errorMessage:
              "We checked this website and we're pretty sure they're not cool with this scraping thing we're doing",
          };
        const get = await fetch(input.url);
        const text = await get.text();

        function minimizeHTML(html: string, tagsToRemove: string[]) {
          const doc = parse(html);

          tagsToRemove.forEach((tagToRemove) => {
            const elementsToRemove = doc.querySelectorAll(tagToRemove);
            elementsToRemove.forEach((element) => {
              element.remove();
            });
          });

          return doc.outerHTML;
        }

        const miniHtml = minimizeHTML(text, [
          "head",
          "script",
          "footer",
          "style",
          "meta",
          "svg",
          "path",
          "nav",
        ]);

        // console.log(miniHtml);

        const estimatedTokens = countTokens(miniHtml);
        const chatResponse = await postHtmlToTogether({
          html: miniHtml,
          url: input.url,
        });
        if (!chatResponse)
          return { isCrawlable: true, content: null, errorMessage: null };
        return {
          isCrawlable: true,
          content: JSON.parse(chatResponse),
          errorMessage: null,
        };
      },
    ),

  storeUrlSubscription: protectedProcedure
    .input(subscriptionSchema)
    .mutation(async ({ input }) => {
      const get = await fetch(input.url);
      const text = await get.text();

      function minimizeHTML(html: string, tagsToRemove: string[]) {
        const doc = parse(html);

        tagsToRemove.forEach((tagToRemove) => {
          const elementsToRemove = doc.querySelectorAll(tagToRemove);
          elementsToRemove.forEach((element) => {
            element.remove();
          });
        });

        return doc.outerHTML;
      }

      const miniHtml = minimizeHTML(text, [
        "head",
        "script",
        "footer",
        "style",
        "meta",
        "svg",
        "path",
        "nav",
      ]);

      const estimatedTokens = countTokens(miniHtml);

      console.log(estimatedTokens);

      // simulate a slow db call
    }),
});
