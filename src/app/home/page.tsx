import { redirect } from "next/navigation";

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { SubscriptionCreateButton } from "@/app/home/_components/subscription-create-button";
import { PostItem } from "@/components/post-item";
import { DashboardShell } from "@/components/shell";
import { useSession } from "next-auth/react";
import { db } from "@/server/db";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  // const user = await getCurrentUser();
  //
  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login");
  // }

  // const posts = await db.post.findMany({
  //   where: {
  //     authorId: user.id,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     published: true,
  //     createdAt: true,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  // });
  const posts: any = [];

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <SubscriptionCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post: any) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No susbcriptions created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any subscriptions yet. Start subscribing.
            </EmptyPlaceholder.Description>
            <SubscriptionCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
