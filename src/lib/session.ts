import { auth } from "@/server/auth";
// import { getServerSession } from "next-auth/next";

export async function getCurrentUser() {
  // const session = await getServerSession(authOptions);
  const session = await auth();
  return session?.user;
}
