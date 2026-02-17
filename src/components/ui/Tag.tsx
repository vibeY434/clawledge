export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-md bg-white/5 px-2 py-0.5 text-xs text-foreground-secondary border border-white/5">
      {label}
    </span>
  );
}
