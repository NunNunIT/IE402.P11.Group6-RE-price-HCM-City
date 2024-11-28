"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PropsWithChildren, createContext, useContext, useState } from "react";

import { LoginWithProviderButton } from "@/components/customize-ui/authentication-button";
import { useSession } from "next-auth/react";

const AuthDialogContext = createContext({
  open: false,
  onOpenChange: (__open: boolean) => { },
});

export const AuthDialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession();
  const [open, onOpenChange] = useState(false);

  return (
    <AuthDialogContext.Provider value={{ open, onOpenChange }}>
      {status === "unauthenticated" && (
        <Dialog {...{ open, onOpenChange }}>
          <DialogContent>
            <LoginWithProviderButton provider="github">
              Đăng nhập với Github
            </LoginWithProviderButton>
            <LoginWithProviderButton variant="outline" provider="google">
              Đăng nhập với Google
            </LoginWithProviderButton>
          </DialogContent>
        </Dialog>
      )}
      {children}
    </AuthDialogContext.Provider>
  )
}

export const useAuthDialogContext = () => {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialogContext must be used within AuthDialogProvider");
  }

  return context;
}