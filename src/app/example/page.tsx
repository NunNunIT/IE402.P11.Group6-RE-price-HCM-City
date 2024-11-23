import { ToggleTheme } from "@/components";
import { DemoButton, DemoCard, DemoCheckBox, DemoDialog, DemoDrawer } from "./components";

export default function ExamplePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex justify-between items-center sticky top-0 bg-background py-2 w-full max-w-6xl mx-4 z-50">
        <h1 className="text-3xl font-bold">Example Page</h1>
        <ToggleTheme />
      </div>

      <div className="w-full max-w-4xl space-y-8 m-4">
        <p className="text-lg text-muted-foreground">This page demonstrates various UI components.</p>

        <DemoButton />
        <DemoCard />
        <DemoCheckBox />
        <DemoDialog />
        <DemoDrawer />
      </div>
    </main>
  )
}
