"use client";

import { CodeText } from "@/components/customize-ui";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DemoSection } from "."

export default function DemoButton() {
  return (
    <DemoSection
      title="Button Component"
      href="https://ui.shadcn.com/docs/components/button"
    >
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast.info("Default button clicked")}>Default</Button>
        <Button variant="secondary" onClick={() => toast.info("Secondary button clicked")}>Secondary</Button>
        <Button variant="destructive" onClick={() => toast.info("Destructive button clicked")}>Destructive</Button>
        <Button variant="outline" onClick={() => toast.info("Outline button clicked")}>Outline</Button>
        <Button variant="ghost" onClick={() => toast.info("Ghost button clicked")}>Ghost</Button>
        <Button variant="link" onClick={() => toast.info("Link button clicked")}>Link</Button>
      </div>

      <div className="space-y-4">
        <CodeText>
          {"import { Button } from '@/components/ui/button'"}
        </CodeText>
        <CodeText>
          {`<Button variant="default" onClick={() => toast.info("Button clicked")}>
  Default
</Button>`}
        </CodeText>
      </div>
    </DemoSection>
  )
}