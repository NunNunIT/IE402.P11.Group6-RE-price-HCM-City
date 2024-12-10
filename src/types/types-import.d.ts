/* eslint-disable no-unused-vars */
import { JWT } from "next-auth/jwt"
import { IUser } from "@/lib/model";
import { ENUM_RESPONSE_STATUS, ROLES, ENUM_ROLE } from "@/utils";

type TBaseResponseProps = {
  message: string;
  status: ENUM_RESPONSE_STATUS;
  data?: TResponseData | TResponseData[];
  error?: Error | string;
}

type TPermission = (typeof ROLES)[keyof typeof ROLES][number];

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends Partial<IUser> { }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account { }

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session { }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: ENUM_ROLE;
  }
}