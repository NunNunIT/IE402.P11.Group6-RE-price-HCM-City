"use client";

import { CodeText } from "@/components/customize-ui";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DemoSection } from ".";
import { Search, Mail } from "lucide-react";
import { Input } from "@/components/customize-ui/input";

export default function DemoInput() {
  const handleInputChange = (label: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.info(`${label}: ${e.target.value}`);
  };

  return (
    <DemoSection
      title="Input Component"
      href="https://ui.shadcn.com/docs/components/input"
    >
      <div className="space-y-6">
        {/* Basic Inputs */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full max-w-xs space-y-2">
            <Label htmlFor="default">Default Input</Label>
            <Input
              id="default"
              placeholder="Default input"
              onChange={handleInputChange("Default")}
            />
          </div>
          <div className="w-full max-w-xs space-y-2">
            <Label htmlFor="disabled">Disabled Input</Label>
            <Input
              id="disabled"
              placeholder="Disabled input"
              disabled
            />
          </div>
        </div>

        {/* Input with Icons */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full max-w-xs space-y-2">
            <Label htmlFor="search">Search Input</Label>
            <div className="relative">
              <Input
                id="search"
                childLeft={<Search className="h-4 w-4 text-muted-foreground" />}
                placeholder="Search..."
                onChange={handleInputChange("Search")}
              />
            </div>
          </div>
          <div className="w-full max-w-xs space-y-2">
            <Label htmlFor="email">Email Input</Label>
            <div className="relative">
              <Input
                id="email"
                childLeft={<Mail className="h-4 w-4 text-muted-foreground" />}
                placeholder="Email address"
                type="email"
                onChange={handleInputChange("Email")}
              />
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="space-y-4">
          <CodeText>
            {"import { Input } from '@/components/customize-ui/input'"}
          </CodeText>
          <CodeText>
            {`<Input
  placeholder="Type something..."
  type="text"
  onChange={(e) => console.log(e.target.value)}
/>`}
          </CodeText>
        </div>
      </div>
    </DemoSection>
  );
}