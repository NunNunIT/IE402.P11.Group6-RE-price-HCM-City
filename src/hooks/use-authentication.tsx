"use client";

import { useAuthDialogContext } from "./use-auth-dialog";
import { useCallback } from "react";
import { useSession } from "next-auth/react";

export function useAuthWrapperFunction(callback: () => Promise<void>) {
  const { data: session } = useSession();
  const { onOpenChange } = useAuthDialogContext();
  const openAuthDialog = useCallback(() => onOpenChange(true), [onOpenChange]);
  if (!session?.user) return openAuthDialog;
  return callback;
}
