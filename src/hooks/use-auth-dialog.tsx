import { AuthDialogContext } from "@/provider/auth-dialog";
import { useContext } from "react";

export const useAuthDialogContext = () => {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialogContext must be used within AuthDialogProvider");
  }

  return context;
}