import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",

      async authorize(credentials) {
        if (credentials.email === "" || credentials.password === "") {
          return null;
        }

        //if the admin exists
        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log(admin);

        //if the user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (admin) {
          const match = credentials.password === admin.password;
          console.log(match);
          if (!match) {
            return null;
          }
          return admin;
        } else if (user) {
          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!match) {
            return null;
          }
          return user;
        }
        return null;

        // if (!user) {
        //   return null;
        // }

        // //check if password matches
        // const match = await bcrypt.compare(credentials.password, user.password);

        // if (!match) {
        //   return null;
        // }

        // //return user object if everything is ok
        // return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debud: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
