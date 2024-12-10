"use client";

import { useCallback } from "react";
import { useAlertDialogContext } from "@/provider/alert-dialog";

export function useAlertDialogWrapperFunction(callback: () => Promise<void>, options?: { title?: string, description?: string }) {
  const { onOpenChange, setTitle, setDescription, setAction } = useAlertDialogContext();
  
  const openAlertDialog = useCallback(() => {
    if (options?.title) setTitle(options.title);
    if (options?.description) setDescription(options.description);
    setAction(callback);
    onOpenChange(true);
  }, [onOpenChange, setTitle, setDescription, setAction, options, callback]);

  return openAlertDialog;
}
