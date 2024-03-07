import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [GitHub],
});

// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import NextAuth, {
//   getServerSession,
//   type DefaultSession,
//   type NextAuthOptions,
// } from "next-auth";
// import { type Adapter } from "next-auth/adapters";
// import GithubProvider from "next-auth/providers/github";
//
// import { db } from "@/server/db";
// import { createTable } from "@/server/db/schema";
// import { env } from "@/env.mjs";
//
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }
//
//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }
//
// export const authOptions: NextAuthOptions = {
//   callbacks: {
//     session: ({ session, user }) => {
//
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: user.id,
//         },
//       };
//     },
//   },
//   adapter: DrizzleAdapter(db, createTable) as Adapter,
//   providers: [
//     GithubProvider({
//       clientId: env.GITHUB_ID,
//       clientSecret: env.GITHUB_SECRET,
//     }),
//   ],
//   secret: env.NEXTAUTH_SECRET,
// };
//
// export const getServerAuthSession = () => getServerSession(authOptions);
//
// export const handler = NextAuth(authOptions);
//
// export { handler as GET, handler as POST };
