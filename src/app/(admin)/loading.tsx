export default function AdminLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block w-[250px] bg-card border-r border-border animate-pulse">
        <div className="p-4 border-b border-border">
          <div className="h-7 bg-muted rounded w-32" />
        </div>
        <div className="p-3 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex-1 p-6 lg:p-8 space-y-6 animate-pulse">
        <div className="h-10 bg-muted rounded w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
