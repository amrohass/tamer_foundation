export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-4xl animate-pulse px-4 py-10 sm:px-6"
    >
      <div className="h-8 w-72 rounded-full bg-foreground/10" />
      <div className="mt-3 h-4 w-96 max-w-full rounded-full bg-foreground/10" />
      <div className="mt-8 h-36 rounded-2xl bg-foreground/10" />
      <div className="mx-auto mt-8 h-10 w-48 rounded-full bg-foreground/10" />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="h-36 rounded-2xl bg-foreground/10" />
        <div className="h-36 rounded-2xl bg-foreground/10" />
        <div className="h-36 rounded-2xl bg-foreground/10" />
        <div className="h-36 rounded-2xl bg-foreground/10" />
      </div>
    </div>
  );
}
