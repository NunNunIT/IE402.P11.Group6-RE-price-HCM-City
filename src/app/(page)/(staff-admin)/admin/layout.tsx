import { auth } from "@/lib/auth";
import { ENUM_ROLE } from "@/utils";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function OnlyAdminStaffLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (![ENUM_ROLE.Admin, ENUM_ROLE.Staff].includes(session?.user?.role)) return notFound();

  return children;
}
