import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { landingConstants } from "@/constants/landing";
import Features from "./features";
import { auth } from "@/server/auth";
// import { getServerAuthSession } from "@/server/auth";

// async function getGitHubStars(): Promise<string | null> {
//   try {
//     const response = await fetch(
//       "https://api.github.com/repos/shadcn/taxonomy",
//       {
//         headers: {
//           Accept: "application/vnd.github+json",
//           Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
//         },
//         next: {
//           revalidate: 60,
//         },
//       },
//     );
//
//     if (!response?.ok) {
//       return null;
//     }
//
//     const json = await response.json();
//
//     return parseInt(json["stargazers_count"]).toLocaleString();
//   } catch (error) {
//     return null;
//   }
// }

export default async function IndexPage() {
  // const saession = await getServerAuthSession();
  // const session = await auth();

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {landingConstants.heroText}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {landingConstants.heroSubtitle}
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Features />
    </>
  );
}
