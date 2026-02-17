"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import type Fuse from "fuse.js";
import { UseCase } from "@/lib/types";

interface SearchBarProps {
  useCases: UseCase[];
  onResults: (results: UseCase[] | null) => void;
}

export function SearchBar({ useCases, onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const fuseRef = useRef<Fuse<UseCase> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const initFuse = useCallback(async () => {
    if (fuseRef.current) return fuseRef.current;
    const FuseModule = (await import("fuse.js")).default;
    fuseRef.current = new FuseModule(useCases, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.3 },
        { name: "tags", weight: 0.2 },
        { name: "category", weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
    return fuseRef.current;
  }, [useCases]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);

      if (timerRef.current) clearTimeout(timerRef.current);

      if (!value.trim()) {
        onResults(null);
        return;
      }

      timerRef.current = setTimeout(async () => {
        const fuse = await initFuse();
        const results = fuse.search(value);
        onResults(results.map((r) => r.item));
      }, 200);
    },
    [initFuse, onResults]
  );

  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search use cases..."
        className="w-full rounded-lg border border-surface-border bg-surface pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-foreground-secondary focus:border-claw-500/50 focus:outline-none focus:ring-1 focus:ring-claw-500/30"
      />
      {query && (
        <button
          onClick={() => handleSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
