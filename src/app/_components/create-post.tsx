"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost({ html }: { html: string }) {
  const router = useRouter();
  const [prompt, setPrompt] = useState(
    "This is a blog, make a json object, that has the key content, where the value of content is an array with objects where each blog of this document is an object with the keys title, summary, imageUrl and date, for the imageUrl give me the full working url, the domain is https://tonyjara.com. Only return the json object.",
  );
  const [message, setMessage] = useState("{}");

  // const createPost = api.post.create.useMutation({
  //   onSuccess: () => {
  //     router.refresh();
  //     setPrompt("");
  //   },
  // });

  const { mutate: togetherTest, isLoading } = api.post.togetherAi.useMutation({
    onSuccess: (x) => {
      setMessage(x ?? "");
      // router.refresh();
      // setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // createPost.mutate({ name });
        togetherTest({ prompt, html });
      }}
      className="flex flex-col gap-2"
    >
      {/* <p>{message}</p> */}
      <input
        type="text"
        placeholder="Title"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black "
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      {JSON.parse(message)?.content?.map(
        (
          x: {
            title: string;
            summary: string;
            imageUrl: string;
            date: string;
          },
          i: number,
        ) => (
          <div key={i}>
            <p>Title: {x.title}</p>
            <p>Summary: {x.summary}</p>
            <img src={x.imageUrl} />
            <p>Date: {x.date}</p>
          </div>
        ),
      )}
    </form>
  );
}
