"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES, CATEGORY_LIST } from "@/lib/inflation-items";
import { toSlug } from "@/lib/slug";
import Footer from "@/components/Footer";

const itemHref = (cat: string, itemName: string) =>
  `/${encodeURIComponent(toSlug(cat))}/${encodeURIComponent(toSlug(itemName))}`;

export default function HomeClient() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = query.trim().toLowerCase();

  // Filter matching categories and items
  const results: { category: string; items: string[] }[] = [];
  if (q) {
    for (const cat of CATEGORY_LIST) {
      const catMatch = cat.toLowerCase().includes(q);
      const matchingItems = CATEGORIES[cat].filter(
        (item) => item.toLowerCase().includes(q) || catMatch
      );
      if (matchingItems.length > 0) {
        results.push({ category: cat, items: matchingItems });
      }
    }
  }

  const closeSearch = () => {
    setFocused(false);
    setQuery("");
  };

  const showDropdown = focused && q.length > 0 && results.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-3">
          대한민국 물가 인플레이션
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base text-center mb-10">
          통계청 KOSIS 기반 151개 품목의 장기 물가 변화를 확인하세요
        </p>

        {/* Search */}
        <div ref={containerRef} className="w-full max-w-lg relative">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="카테고리 또는 품목 검색..."
              className="w-full pl-12 pr-4 py-3.5 text-base bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-50 top-full mt-2 w-full bg-card border border-border rounded-xl shadow-2xl max-h-80 overflow-y-auto">
              {results.map(({ category, items }) => (
                <div key={category}>
                  <Link
                    href={itemHref(category, items[0])}
                    onClick={closeSearch}
                    className="block px-4 py-2.5 text-xs font-semibold text-primary uppercase tracking-wider hover:bg-muted/50 transition-colors border-b border-border/50"
                  >
                    {category}
                  </Link>
                  {items.map((item) => (
                    <Link
                      key={item}
                      href={itemHref(category, item)}
                      onClick={closeSearch}
                      className="block px-4 py-2.5 pl-8 text-sm text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {focused && q.length > 0 && results.length === 0 && (
            <div className="absolute z-50 top-full mt-2 w-full bg-card border border-border rounded-xl shadow-2xl p-6 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다
            </div>
          )}
        </div>

        {/* Category quick links */}
        <div className="mt-10 w-full max-w-2xl">
          <p className="text-xs text-muted-foreground text-center mb-3">카테고리 바로가기</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_LIST.map((cat) => (
              <Link
                key={cat}
                href={itemHref(cat, CATEGORIES[cat][0])}
                className="px-3 py-1.5 text-sm rounded-lg border border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
