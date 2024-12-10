export default function ExamplePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex justify-between items-center sticky top-0 bg-background p-2 py-8 w-full max-w-4xl mx-4 z-50">
        <h1 className="text-3xl font-bold">Example Page</h1>
      </div>

      <div className="w-full max-w-4xl space-y-8 m-4">
        <p className="text-lg text-muted-foreground">This page demonstrates various UI components.</p>

        <div className="flex flex-row gap-8">
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
        </div>
      </div>
    </main>
  )
}
