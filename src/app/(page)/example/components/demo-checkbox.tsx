"use client";

import { CodeText } from "@/components/customize-ui"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { DemoSection } from "."

export default function DemoCheckbox() {
  return (
    <DemoSection
      title="Checkbox Component"
      href="https://ui.shadcn.com/docs/components/checkbox"
    >
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onCheckedChange={(checked) => {
              toast.info(`Checkbox ${checked ? 'checked' : 'unchecked'}`)
            }} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled">Disabled checkbox</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="checked-disabled" disabled defaultChecked />
            <Label htmlFor="checked-disabled">Checked disabled</Label>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <CodeText>
          {`import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
`}
        </CodeText>
        <CodeText>
          {`<div className="flex items-center space-x-2">
  <Checkbox id="terms" disabled={false}/>
  <Label htmlFor="terms">
    Accept terms and conditions
  </Label>
</div>`}
        </CodeText>
      </div>
    </DemoSection>
  )
}
