"use client";

import { CodeText } from "@/components/customize-ui";
import { Button } from "@/components/ui/button";
import { DemoSection } from ".";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

export default function DemoSonner() {
  // Promise example function
  const performAsyncTask = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Task");
      }, 2000);
    });
  };

  return (
    <DemoSection
      title="Toast Notifications"
      href="https://sonner.emilkowal.ski/"
    >
      <div className="space-y-6">
        {/* Basic Toasts */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="default"
            onClick={() =>
              toast.success("Success message", {
                icon: <CheckCircle2 className="h-4 w-4" />
              })
            }
          >
            Success
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toast.error("Error message", {
                icon: <AlertCircle className="h-4 w-4" />
              })
            }
          >
            Error
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.info("Information message", {
                icon: <Info className="h-4 w-4" />
              })
            }
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.warning("Warning message", {
                icon: <AlertTriangle className="h-4 w-4" />
              })
            }
          >
            Warning
          </Button>
        </div>

        {/* Advanced Toasts */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            onClick={() => {
              toast.promise(performAsyncTask, {
                loading: 'Loading...',
                success: (data) => `${data} completed successfully!`,
                error: 'Something went wrong',
              });
            }}
          >
            Promise Toast
          </Button>
        </div>

        {/* Position and Duration */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="secondary"
            onClick={() =>
              toast.info("Top Left Toast", {
                position: "top-left"
              })
            }
          >
            Top Left
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.info("Bottom Right Toast", {
                position: "bottom-right"
              })
            }
          >
            Bottom Right
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.info("5s Duration", {
                duration: 5000
              })
            }
          >
            Custom Duration
          </Button>
        </div>

        {/* Interactive Toasts */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            onClick={() => {
              toast("Confirm Action", {
                action: {
                  label: "Confirm",
                  onClick: () => console.log("Confirmed")
                },
              });
            }}
          >
            Action Toast
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast.message("Dismissible Toast", {
                dismissible: true
              });
            }}
          >
            Dismissible
          </Button>
        </div>

        {/* Code Examples */}
        <div className="space-y-4">
          <CodeText>
            {"import { toast } from 'sonner'"}
          </CodeText>
          <CodeText>
            {`// Basic toast
toast.success("Success message")

// Promise toast
toast.promise(asyncFunction, {
  loading: 'Loading...',
  success: 'Success!',
  error: 'Error!'
})

// Custom toast
toast.custom((t) => (
  <div>Custom Component</div>
))`}
          </CodeText>
        </div>
      </div>
    </DemoSection>
  );
}