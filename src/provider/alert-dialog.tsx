"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const AlertDialogContext = createContext({
    open: false,
    onOpenChange: (__open: boolean) => { },
    title: '',
    setTitle: (__title: string) => { },
    description: '',
    setDescription: (__description: string) => { },
    action: () => { },
    setAction: (__action: () => void) => { }
});

export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [open, onOpenChange] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [action, setAction] = useState<() => void>(() => { });

    return (
        <AlertDialogContext.Provider value={{
            open, onOpenChange,
            title, setTitle,
            description, setDescription,
            action, setAction
        }}>
            <AlertDialog open={open} onOpenChange={onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            location and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            // onClick={() => action()}
                        >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {children}
        </AlertDialogContext.Provider>
    )
}

export const useAlertDialogContext = () => {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error('useAlertDialogContext must be used within AlertProvider');
    }
    return context;
}