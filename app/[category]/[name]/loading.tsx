export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 animate-pulse">
        {/* Header skeleton */}
        <header className="mb-8 border-b border-border pb-6 sm:pb-8">
          <div className="h-3 w-48 bg-muted rounded mb-3" />
          <div className="h-8 w-72 bg-muted rounded mb-2" />
          <div className="h-4 w-64 bg-muted rounded" />
        </header>

        {/* Category select skeleton */}
        <div className="mb-4">
          <div className="h-9 w-40 bg-muted rounded-md" />
        </div>

        {/* Item buttons skeleton */}
        <div className="mb-6 pt-2 flex flex-wrap gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 w-16 bg-muted rounded-md" />
          ))}
        </div>

        {/* Stats skeleton */}
        <div className="mb-6 border border-border rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card px-4 py-4 sm:px-6 sm:py-5">
              <div className="h-3 w-20 bg-muted rounded mb-2" />
              <div className="h-7 w-28 bg-muted rounded" />
            </div>
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 border border-border rounded-lg p-4 sm:p-6 bg-card">
            <div className="h-4 w-32 bg-muted rounded mb-2" />
            <div className="h-3 w-48 bg-muted rounded mb-4" />
            <div className="h-60 sm:h-72 bg-muted/50 rounded" />
          </div>
          <div className="lg:col-span-3 border border-border rounded-lg p-4 sm:p-6 bg-card">
            <div className="h-4 w-48 bg-muted rounded mb-2" />
            <div className="h-3 w-40 bg-muted rounded mb-4" />
            <div className="h-60 sm:h-72 bg-muted/50 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
