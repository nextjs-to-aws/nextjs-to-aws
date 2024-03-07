import { env } from "@/env.mjs";
import claude from "../claude.json";
import { promptToCheckCrawlersAreAllowed, promptToParseHtml } from "./prompts";
import { Tiktoken, TiktokenBPE } from "js-tiktoken";

const togetherUrl = "https://api.together.xyz/v1/chat/completions";
const apiKey = env.TOGETHER_API_KEY;

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
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
});

export const postHtmlToTogether = async ({
  html,
  url,
}: {
  html: string;
  url: string;
}): Promise<string | undefined> => {
  const { systemPrompt, prompt } = promptToParseHtml(html, url);
  const data = {
    model: "togethercomputer/StripedHyena-Nous-7B",
    max_tokens: 5000,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  const req = await fetch(togetherUrl, options);
  const json = (await req.json()) as togetherResponse;

  return json.choices[0]?.message.content;
};

export const checkIfUrlIsCrawlable = async ({
  url,
}: {
  url: string;
}): Promise<{ error: boolean; isCrawlable: boolean }> => {
  const parsedUrl = new URL(url);
  const robotsPageUrl =
    parsedUrl.protocol + "//" + parsedUrl.hostname + "/robots.txt";

  const getRobotsPage = await fetch(robotsPageUrl);
  const robotsPageContent = await getRobotsPage.text();

  const { systemPrompt, prompt } = promptToCheckCrawlersAreAllowed(
    robotsPageContent,
    url,
  );

  const data = {
    model: "Qwen/Qwen1.5-4B-Chat", // 0.10 per 1 million
    max_tokens: 1024,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  const req = await fetch(togetherUrl, options);
  const json = (await req.json()) as togetherResponse;
  const answer = json.choices[0]?.message.content;
  if (!answer || typeof answer !== "string") {
    return { error: true, isCrawlable: false };
  }

  return { error: false, isCrawlable: answer.toLowerCase() === "true" };
};

export const countTokens = (text: string): number => {
  const getTokenizer = (): Tiktoken => {
    const ranks: TiktokenBPE = {
      bpe_ranks: claude.bpe_ranks,
      special_tokens: claude.special_tokens,
      pat_str: claude.pat_str,
    };
    return new Tiktoken(ranks);
  };

  const tokenizer = getTokenizer();
  const encoded = tokenizer.encode(text.normalize("NFKC"), "all");
  return encoded.length;
};
