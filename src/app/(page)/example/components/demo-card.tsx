"use client";

import { CodeText } from "@/components/customize-ui";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { DemoSection } from ".";
import { CreditCard, User, Settings } from 'lucide-react';

export default function DemoCard() {
  return (
    <DemoSection
      title="Card Component"
      href="https://ui.shadcn.com/docs/components/card"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>This is a default card example</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast.info("Default card action")}>Action</Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Primary Border Card</CardTitle>
            <CardDescription>Card with primary color border</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card has a primary color border.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => toast.info("Primary border card action")}>Action</Button>
          </CardFooter>
        </Card>

        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader>
            <CardTitle>Secondary Background Card</CardTitle>
            <CardDescription>Card with secondary background color</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card has a secondary background color.</p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" onClick={() => toast.info("Secondary background card action")}>Action</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Card className="flex flex-col items-center p-4">
          <CreditCard className="h-12 w-12 mb-2" />
          <h3 className="text-lg font-semibold">Compact Card</h3>
          <p className="text-sm text-center">A compact card with an icon</p>
        </Card>

        <Card className="flex items-center p-4">
          <User className="h-10 w-10 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Horizontal Card</h3>
            <p className="text-sm">A card with horizontal layout</p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
            <CardDescription>Hover to see the effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card has an interactive hover effect.</p>
          </CardContent>
          <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="secondary" onClick={() => toast.info("Interactive card clicked")}>
              <Settings className="mr-1 size-4 -ml-1" /> Settings
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-4 mt-4">
        <CodeText>
          {"import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'"}
        </CodeText>
        <CodeText>
          {`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
        </CodeText>
      </div>
    </DemoSection>
  )
}

