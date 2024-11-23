import DemoButton from "./components/demo-button";

export default function ExamplePage() {
  return (
    <main className="flex justify-center p-8">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold">Example Page</h1>
        <p className="text-lg text-muted-foreground">This page demonstrates various UI components.</p>

        <DemoButton />
      </div>
    </main>
  )
}
