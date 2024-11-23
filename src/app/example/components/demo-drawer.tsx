"use client"

import * as React from "react"
import { CodeText } from "@/components/customize-ui"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { DemoSection } from "."

export default function DemoDrawer() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DemoSection
      title="Drawer Component"
      href="https://ui.shadcn.com/docs/components/drawer"
    >
      <div className="space-y-8">
        {/* Basic Examples */}
        <div>
          <h3 className="text-lg font-medium mb-4">Basic Examples</h3>
          <div className="flex flex-wrap gap-4">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Basic Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Basic Drawer</DrawerTitle>
                  <DrawerDescription>
                    This is a basic drawer example with a title and description.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <p>Drawer content goes here.</p>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Form Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit profile</DrawerTitle>
                  <DrawerDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="drawer-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="drawer-name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="drawer-username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="drawer-username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                  <Button onClick={() => toast.success("Profile updated!")}>
                    Save changes
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button variant="secondary">Open Controlled Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Controlled Drawer</DrawerTitle>
                  <DrawerDescription>
                    This drawer&apos;s open state is controlled programmatically.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <p>You can close this drawer using the buttons below or by clicking outside.</p>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Controlled Drawer state: {isOpen ? 'Open' : 'Closed'}
          </p>
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
          >
            Toggle controlled drawer state
          </Button>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <CodeText>
          {"import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'"}
        </CodeText>
        <CodeText>
          {`// Direction examples
<Drawer direction="right">
  <DrawerTrigger asChild>
    <Button variant="outline">Right Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Right Drawer</DrawerTitle>
      <DrawerDescription>Slides in from the right</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">
      <p>Drawer content goes here.</p>
    </div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Close</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        </CodeText>
      </div>
    </DemoSection>
  )
}