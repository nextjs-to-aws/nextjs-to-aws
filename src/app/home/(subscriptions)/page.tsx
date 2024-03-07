import { redirect } from "next/navigation";

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { SubscriptionCreateButton } from "@/app/home/_components/subscription-create-button";
import { PostItem } from "@/components/post-item";
import { DashboardShell } from "@/components/shell";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/server/db";
import { SubscriptionCreateDialog } from "../_components/subscription-create-dialog";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const subs = await db.query.subscriptions.findMany({});

  // const subs = await db.
  //       subscriptinos.findMany({
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
  // const posts: any = [];

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <SubscriptionCreateDialog />
      </DashboardHeader>
      <div>
        {subs?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {subs.map((sub) => (
              <PostItem key={sub.id} post={sub} />
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
            <SubscriptionCreateDialog variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
