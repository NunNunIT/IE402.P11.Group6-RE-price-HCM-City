"use client"

import * as React from "react"
import { CodeText } from "@/components/customize-ui"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { DemoSection } from "."

export default function DemoDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DemoSection
      title="Dialog Component"
      href="https://ui.shadcn.com/docs/components/dialog"
    >
      <div className="space-y-8">
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Basic Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Basic Dialog</DialogTitle>
                <DialogDescription>
                  This is a basic dialog example with a title and description.
                </DialogDescription>
              </DialogHeader>
              <p>Dialog content goes here.</p>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Form Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => toast.success("Profile updated!")}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">Open Controlled Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Controlled Dialog</DialogTitle>
                <DialogDescription>
                  This dialog&apos;s open state is controlled programmatically.
                </DialogDescription>
              </DialogHeader>
              <p>You can close this dialog using the button below or by clicking outside.</p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Controlled Dialog state: {isOpen ? 'Open' : 'Closed'}</p>
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
          >
            Toggle controlled dialog state
          </Button>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <CodeText>
          {"import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'"}
        </CodeText>
        <CodeText>
          {`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog Description</DialogDescription>
    </DialogHeader>
    <p>Dialog content goes here.</p>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        </CodeText>
      </div>
    </DemoSection>
  )
}
