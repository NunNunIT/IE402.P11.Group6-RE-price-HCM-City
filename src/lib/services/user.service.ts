"use server";

import { IUser, User } from "../model";

import { ENUM_SOCIAL_TYPE } from "@/utils";

export const createUserFromSocial = async ({
  email,
  metadata,
}: { email: string, socialType: ENUM_SOCIAL_TYPE, metadata: Partial<Omit<IUser, "email">> }) => {
  let user = await User.findOne({ email });
  if (user) return user;

  user = new User({ email, ...metadata });

  await user.save();
  return user;
}
