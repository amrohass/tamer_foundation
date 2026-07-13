"use client";

import { useState } from "react";
import { LoaderCircle, Search, SearchX } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { Recipe } from "@/lib/types";
import RecipeCard from "./RecipeCard";

type SearchMode = "all" | "semantic" | "keyword";
const SUGGESTION_KEYS = ["suggestion1", "suggestion2", "suggestion3"] as const;

export default function FacilitatorHub({ recipes }: { recipes: Recipe[] }) {
  const t = useTranslations("hub");
  const [query, setQuery] = useState("");
  const [displayed, setDisplayed] = useState<Recipe[] | null>(null);
  const [mode, setMode] = useState<SearchMode>("all");
  const [activeQuery, setActiveQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const runSearch = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || searching) return;
    setSearching(true);
    try {
      const response = await fetch("/api/search-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      const data = (await response.json()) as {
        mode?: string;
        results?: Array<{ slug: string }>;
      };
      if (
        response.ok &&
        (data.mode === "semantic" || data.mode === "keyword") &&
        data.results
      ) {
        const bySlug = new Map(recipes.map((r) => [r.slug, r]));
        setDisplayed(
          data.results.flatMap(({ slug }) => {
            const recipe = bySlug.get(slug);
            return recipe ? [recipe] : [];
          }),
        );
        setMode(data.mode);
      } else {
        localSearch(trimmed);
      }
    } catch {
      localSearch(trimmed);
    }
    setActiveQuery(trimmed);
    setSearching(false);
  };

  // Last-resort search over the recipes already on the page, so searching
  // still works even if the API route is unreachable.
  const localSearch = (text: string) => {
    const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
    const scored = recipes
      .map((recipe) => {
        const haystack = [
          recipe.title_en, recipe.title_ar, recipe.summary_en,
          recipe.summary_ar, recipe.lesson_en, recipe.lesson_ar, recipe.theme,
        ]
          .join(" ")
          .toLowerCase();
        const score = tokens.filter((token) => haystack.includes(token)).length;
        return { recipe, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);
    setDisplayed(scored.map(({ recipe }) => recipe));
    setMode("keyword");
  };

  const clearSearch = () => {
    setDisplayed(null);
    setMode("all");
    setQuery("");
    setActiveQuery("");
  };

  const shown = displayed ?? recipes;

  return (
    <div className="mt-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void runSearch(query);
        }}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <label className="flex-1">
          <span className="mb-1 block text-sm font-medium">
            {t("searchLabel")}
          </span>
          <span className="relative block">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-full border border-line bg-surface py-2.5 pe-4 ps-9 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </span>
        </label>
        <Button type="submit" disabled={searching || !query.trim()}>
          {searching ? (
            <LoaderCircle
              className="size-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : (
            <Search className="size-4" aria-hidden="true" />
          )}
          {searching ? t("searching") : t("searchButton")}
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted">{t("suggestionsLabel")}</span>
        {SUGGESTION_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setQuery(t(key));
              void runSearch(t(key));
            }}
            className="rounded-full border border-line bg-surface px-3 py-1 text-muted transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t(key)}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold">
          {mode === "all" ? t("allRecipes") : t("resultsFor", { query: activeQuery })}
        </h2>
        <span className="text-sm text-muted">
          {t("count", { count: shown.length })}
          {mode === "semantic" && ` · ${t("modeSemantic")}`}
          {mode === "keyword" && ` · ${t("modeKeyword")}`}
        </span>
        {mode !== "all" && (
          <Button variant="ghost" size="sm" onClick={clearSearch}>
            {t("clear")}
          </Button>
        )}
      </div>

      {shown.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-3 py-12 text-center">
          <SearchX className="size-8 text-muted" aria-hidden="true" />
          <p className="text-muted">{t("empty")}</p>
          <Button variant="secondary" size="sm" onClick={clearSearch}>
            {t("clear")}
          </Button>
        </Card>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {shown.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
