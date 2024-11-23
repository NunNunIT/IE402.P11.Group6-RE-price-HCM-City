"use client"

import * as React from "react"
import { CodeText } from "@/components/customize-ui"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { DemoSection } from "."
import { Settings, User, Menu, MessageSquare, AlignLeft, AlignRight } from "lucide-react"

export default function DemoSheet() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DemoSection
      title="Sheet Component"
      href="https://ui.shadcn.com/docs/components/sheet"
    >
      <div className="space-y-8">
        {/* Side Positions Examples */}
        <div>
          <h3 className="text-lg font-medium mb-4">Sheet Positions</h3>
          <div className="flex flex-wrap gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <AlignRight className="mr-1 h-4 w-4 -ml-1" />
                  Right Sheet
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Right Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the right side.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p>Default side sheet content.</p>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <AlignLeft className="mr-1 h-4 w-4 -ml-1" />
                  Left Sheet
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Left Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the left side.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p>Navigation menu could go here.</p>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu className="mr-1 h-4 w-4 -ml-1" />
                  Top Sheet
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Top Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the top.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p>Notification area could go here.</p>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu className="mr-1 h-4 w-4 -ml-1" />
                  Bottom Sheet
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Bottom Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the bottom.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p>Mobile menu could go here.</p>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Use Case Examples */}
        <div>
          <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
          <div className="flex flex-wrap gap-4">
            {/* Settings Panel */}
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  <Settings className="mr-1 h-4 w-4 -ml-1" />
                  Settings
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>
                    Manage your account settings and preferences.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" className="col-span-3" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button onClick={() => toast.success("Settings saved!")}>
                    Save changes
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* User Profile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">
                  <User className="mr-1 h-4 w-4 -ml-1" />
                  Profile
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Profile</SheetTitle>
                  <SheetDescription>
                    View and update your profile information.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">John Doe</h4>
                        <p className="text-sm text-muted-foreground">@johndoe</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Bio</h4>
                      <p className="text-sm text-muted-foreground">
                        Full-stack developer passionate about UI/UX.
                      </p>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <Button variant="outline">Edit Profile</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Chat Panel */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <MessageSquare className="mr-1 h-4 w-4 -ml-1" />
                  Messages
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Messages</SheetTitle>
                  <SheetDescription>
                    View your recent conversations.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    {['Alice', 'Bob', 'Charlie'].map((user) => (
                      <div key={user} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{user}</h4>
                          <p className="text-sm text-muted-foreground">Last message...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <SheetFooter>
                  <Button variant="outline" className="w-full">
                    View All Messages
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Controlled Sheet Example */}
        <div>
          <h3 className="text-lg font-medium mb-4">Controlled Sheet</h3>
          <div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="secondary">Controlled Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Controlled Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet&apos;s open state is controlled programmatically.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p>You can control this sheet using the button below.</p>
                </div>
                <SheetFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Close
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Sheet state: {isOpen ? 'Open' : 'Closed'}
              </p>
              <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
              >
                Toggle sheet state
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <CodeText>
          {"import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet'"}
        </CodeText>
        <CodeText>
          {`// Basic Sheet example
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet Description</SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <p>Sheet content goes here.</p>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Close</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>

// Available sides: "left" | "right" | "top" | "bottom"`}
        </CodeText>
      </div>
    </DemoSection>
  )
}