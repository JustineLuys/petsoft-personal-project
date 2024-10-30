import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { validateData } from "./utils";
import { logInFormSchema } from "./schema";
import { getUser, getUserByEmail } from "./server-utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const config = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = validateData(logInFormSchema, credentials);
        if ("message" in validatedCredentials) {
          throw new Error(validatedCredentials.message);
        }

        const user = await getUser(validatedCredentials.email);

        if (!user) {
          console.log("User not found");
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(
          validatedCredentials.password,
          user.hashedPassword
        );

        if (!isPasswordMatch) {
          console.log("Password does not match");
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      const isTryingToLogIn = request.nextUrl.pathname.includes("/login");
      const isTryingToSignUp = request.nextUrl.pathname.includes("/signup");

      const isLoggedIn = Boolean(auth?.user);
      const hasAccess = auth?.user.hasAccess;

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        if (!hasAccess) {
          return NextResponse.redirect(new URL("/payment", request.nextUrl));
        }
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        if (isTryingToLogIn || isTryingToSignUp) {
          if (!hasAccess) {
            return NextResponse.redirect(new URL("/payment", request.nextUrl));
          } else {
            return NextResponse.redirect(
              new URL("/app/dashboard", request.nextUrl)
            );
          }
        } else {
          if (request.nextUrl.pathname === "/payment") {
            if (hasAccess) {
              return NextResponse.redirect(
                new URL("/app/dashboard", request.nextUrl)
              );
            }
            return true;
          }
          return NextResponse.redirect(
            new URL("/app/dashboard", request.nextUrl)
          );
        }
      }

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      // if (isLoggedIn && !isTryingToAccessApp) {
      //   return NextResponse.redirect(
      //     new URL("/app/dashboard", request.nextUrl)
      //   );
      // }

      // return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.hasAccess = user.hasAccess;
      }
      if (trigger === "update") {
        const user = await getUserByEmail(token.email);
        token.hasAccess = user!.hasAccess;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.hasAccess = token.hasAccess;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);
