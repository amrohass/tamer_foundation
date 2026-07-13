export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-6xl animate-pulse px-4 py-10 sm:px-6"
    >
      <div className="h-8 w-64 rounded-full bg-foreground/10" />
      <div className="mt-3 h-4 w-96 max-w-full rounded-full bg-foreground/10" />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="h-11 flex-1 rounded-full bg-foreground/10" />
        <div className="h-11 w-32 rounded-full bg-foreground/10" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="h-52 rounded-2xl bg-foreground/10" />
        <div className="h-52 rounded-2xl bg-foreground/10" />
        <div className="h-52 rounded-2xl bg-foreground/10" />
        <div className="h-52 rounded-2xl bg-foreground/10" />
      </div>
    </div>
  );
}
