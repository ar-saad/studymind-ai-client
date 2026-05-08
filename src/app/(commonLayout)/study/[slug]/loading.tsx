export default function StudyLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl animate-pulse">
        {/* Back link skeleton */}
        <div className="h-5 bg-muted rounded w-32 mb-4" />

        {/* Title skeleton */}
        <div className="h-9 bg-muted rounded w-2/3 mb-2" />
        <div className="h-5 bg-muted rounded w-48 mb-6" />

        {/* Tab bar skeleton */}
        <div className="flex gap-1 bg-muted/30 p-1 rounded-xl mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-muted rounded-lg flex-1" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-48" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
            <div className="mt-6 h-6 bg-muted rounded w-36" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
