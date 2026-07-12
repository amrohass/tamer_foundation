import { cn } from "@/lib/cn";

export function cardClasses(className?: string): string {
  return cn(
    "rounded-2xl border border-line bg-surface p-6 shadow-soft",
    className,
  );
}

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cardClasses(className)}>{children}</div>;
}
