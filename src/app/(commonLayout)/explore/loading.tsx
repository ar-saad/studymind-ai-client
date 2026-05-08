export default function ExploreLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl animate-pulse">
        {/* Header skeleton */}
        <div className="text-center mb-10">
          <div className="h-10 bg-muted rounded w-64 mx-auto mb-3" />
          <div className="h-5 bg-muted rounded w-96 mx-auto" />
        </div>

        {/* Search bar skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-12 bg-muted rounded-xl flex-1" />
            <div className="h-12 bg-muted rounded-xl w-40" />
            <div className="h-12 bg-muted rounded-xl w-28" />
          </div>
        </div>

        {/* Topic cards skeleton grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="h-40 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="h-5 bg-muted rounded-full w-20" />
                  <div className="h-5 bg-muted rounded-full w-24" />
                </div>
                <div className="h-5 bg-muted rounded w-4/5" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-9 bg-muted rounded-lg w-28" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
