import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { parse } from "node-html-parser";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Tiktoken, TiktokenBPE } from "js-tiktoken";
import claude from "../claude.json";
import { env } from "~/env";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();
  const getTokenizer = (): Tiktoken => {
    const ranks: TiktokenBPE = {
      bpe_ranks: claude.bpe_ranks,
      special_tokens: claude.special_tokens,
      pat_str: claude.pat_str,
    };
    return new Tiktoken(ranks);
  };
  function countTokens(text: string): number {
    const tokenizer = getTokenizer();
    const encoded = tokenizer.encode(text.normalize("NFKC"), "all");
    return encoded.length;
  }

  const get = await fetch("https://tonyjara.com/blog");
  const text = await get.text();

  function minimizeHTML(html: string, tagsToRemove: string[]) {
    const doc = parse(html);

    //List all tags in a document
    // const tagSet = new Set();
    // doc.querySelectorAll("*").forEach((element) => {
    //   tagSet.add(element.tagName);
    // });
    // const list = Array.from(tagSet);

    tagsToRemove.forEach((tagToRemove) => {
      const elementsToRemove = doc.querySelectorAll(tagToRemove);
      elementsToRemove.forEach((element) => {
        element.remove();
      });
    });

    return doc.outerHTML;
  }

  const html = minimizeHTML(text, [
    "head",
    "script",
    "footer",
    "style",
    "meta",
    "svg",
    "path",
    "nav",
  ]);

  console.log(countTokens(html));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          {/* <p className="text-2xl text-white"> */}
          {/*   {hello ? hello.greeting : "Loading tRPC query..."} */}
          {/* </p> */}

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

        <CrudShowcase html={html} />
      </div>
    </main>
  );
}

async function CrudShowcase({ html }: { html: string }) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  // const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {/* {latestPost ? ( */}
      {/*   <p className="truncate">Your most recent post: {latestPost.name}</p> */}
      {/* ) : ( */}
      {/*   <p>You have no posts yet.</p> */}
      {/* )} */}

      <CreatePost html={html} />
    </div>
  );
}
