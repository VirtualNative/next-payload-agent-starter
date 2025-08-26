export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-semibold">Next + Payload Starter</h1>
        <p className="text-muted-foreground">
          Tailwind & shadcn-ready. Add optional integrations via one-command scripts.
        </p>
        <div className="mt-6 text-sm opacity-80">
          Edit <code>apps/web/app/page.tsx</code> to get started.
        </div>
      </div>
    </main>
  );
}
