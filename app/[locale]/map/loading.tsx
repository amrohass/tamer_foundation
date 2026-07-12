export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-6xl animate-pulse px-4 py-10 sm:px-6"
    >
      <div className="h-8 w-64 rounded-full bg-foreground/10" />
      <div className="mt-3 h-4 w-96 max-w-full rounded-full bg-foreground/10" />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="h-10 flex-1 rounded-full bg-foreground/10" />
        <div className="h-10 rounded-full bg-foreground/10 sm:w-56" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(320px,400px)_1fr]">
        <div className="flex flex-col gap-3">
          <div className="h-20 rounded-2xl bg-foreground/10" />
          <div className="h-20 rounded-2xl bg-foreground/10" />
          <div className="h-20 rounded-2xl bg-foreground/10" />
        </div>
        <div className="h-[360px] rounded-2xl bg-foreground/10 lg:h-[560px]" />
      </div>
    </div>
  );
}
