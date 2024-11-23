import { ToggleTheme } from "@/components";
import DemoButton from "./components/demo-button";

export default function ExamplePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-8 m-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Example Page</h1>
          <ToggleTheme />
        </div>
        <p className="text-lg text-muted-foreground">This page demonstrates various UI components.</p>

        <DemoButton />
      </div>
    </main>
  )
}
