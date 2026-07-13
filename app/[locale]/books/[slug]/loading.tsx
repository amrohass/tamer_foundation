export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-4xl animate-pulse px-4 py-10 sm:px-6"
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="size-28 shrink-0 rounded-2xl bg-foreground/10" />
        <div className="w-full">
          <div className="h-8 w-64 max-w-full rounded-full bg-foreground/10" />
          <div className="mt-3 h-4 w-40 rounded-full bg-foreground/10" />
          <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-foreground/10" />
          <div className="mt-2 h-4 w-3/4 max-w-lg rounded-full bg-foreground/10" />
        </div>
      </div>
      <div className="mt-10 h-6 w-40 rounded-full bg-foreground/10" />
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-8 w-48 rounded-full bg-foreground/10" />
        <div className="h-8 w-56 rounded-full bg-foreground/10" />
        <div className="h-8 w-40 rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}
