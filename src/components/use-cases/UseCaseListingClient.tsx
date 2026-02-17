"use client";

import { useState, useCallback } from "react";
import { UseCase, Category, Difficulty } from "@/lib/types";
import { SearchBar } from "./SearchBar";
import { FilterBar } from "./FilterBar";
import { UseCaseGrid } from "./UseCaseGrid";

export function UseCaseListingClient({
  useCases,
  initialCategory,
}: {
  useCases: UseCase[];
  initialCategory?: string;
}) {
  const [searchResults, setSearchResults] = useState<UseCase[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    (initialCategory as Category) || null
  );
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  const handleSearchResults = useCallback(
    (results: UseCase[] | null) => {
      setSearchResults(results);
    },
    []
  );

  const filteredCases = (searchResults ?? useCases).filter((uc) => {
    if (selectedCategory && uc.category !== selectedCategory) return false;
    if (selectedDifficulty && uc.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <SearchBar useCases={useCases} onResults={handleSearchResults} />
      <FilterBar
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        onCategoryChange={setSelectedCategory}
        onDifficultyChange={setSelectedDifficulty}
      />
      <div className="text-sm text-foreground-secondary">
        Showing {filteredCases.length} of {useCases.length} use cases
      </div>
      <UseCaseGrid useCases={filteredCases} />
    </div>
  );
}
