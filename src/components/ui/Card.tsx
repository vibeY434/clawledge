import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-surface-border bg-surface p-5",
        hover &&
          "transition-all duration-200 hover:border-claw-500/30 hover:bg-surface-light hover:shadow-lg hover:shadow-claw-500/5",
        className
      )}
    >
      {children}
    </div>
  );
}
