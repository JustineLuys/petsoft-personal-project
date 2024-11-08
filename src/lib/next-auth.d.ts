import {} from "next-auth";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "USER";
    hasAccess: boolean;
  }

  interface Session {
    user: User & {
      hasAccess: boolean;
      role: "ADMIN" | "USER";
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    email: string;
    hasAccess: boolean;
    role: "ADMIN" | "USER";
  }
}
