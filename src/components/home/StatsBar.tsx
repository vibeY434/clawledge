import { getStats } from "@/lib/data";

export function StatsBar() {
  const stats = getStats();

  const items = [
    { label: "Use Cases", value: stats.totalCases },
    { label: "Categories", value: stats.categories },
    { label: "Repositories", value: stats.repositories },
  ];

  return (
    <section className="border-y border-surface-border bg-surface-dark/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          {items.map((item) => (
            <div key={item.label}>
              <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white">
                {item.value}
              </div>
              <div className="mt-1 text-sm text-foreground-secondary">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
