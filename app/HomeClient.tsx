"use client";

import { useState, useRef, useEffect } from "react";
import { CATEGORIES, CATEGORY_LIST } from "@/lib/inflation-items";
import { toSlug } from "@/lib/slug";
import { CPI_RATE, MINIMUM_WAGE, GDP_GROWTH, EMPLOYMENT, getLatest } from "@/lib/macro-data";
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
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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
        (item) => item.toLowerCase().includes(q) || catMatch,
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
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
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
                  <a
                    href={itemHref(category, items[0])}
                    onClick={closeSearch}
                    className="block px-4 py-2.5 text-xs font-semibold text-primary uppercase tracking-wider hover:bg-muted/50 transition-colors border-b border-border/50"
                  >
                    {category}
                  </a>
                  {items.map((item) => (
                    <a
                      key={item}
                      href={itemHref(category, item)}
                      onClick={closeSearch}
                      className="block px-4 py-2.5 pl-8 text-sm text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {item}
                    </a>
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
          <p className="text-xs text-muted-foreground text-center mb-3">
            카테고리 바로가기
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_LIST.map((cat) => (
              <a
                key={cat}
                href={itemHref(cat, CATEGORIES[cat][0])}
                className="px-3 py-1.5 text-sm rounded-lg border border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>

        {/* Macro economic indicator cards */}
        <div className="mt-12 w-full max-w-2xl">
          <p className="text-xs text-muted-foreground text-center mb-3">
            주요 경제지표
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">소비자물가</p>
              <p className={`text-2xl font-bold tabular-nums ${getLatest(CPI_RATE).rate > 0 ? "text-destructive" : ""}`}>
                {getLatest(CPI_RATE).rate}%
              </p>
              <p className="text-[11px] text-muted-foreground">전년대비</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">최저임금</p>
              <p className="text-2xl font-bold tabular-nums">
                {getLatest(MINIMUM_WAGE).hourly.toLocaleString()}원
              </p>
              <p className="text-[11px] text-muted-foreground">시간당</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">GDP 성장률</p>
              <p className="text-2xl font-bold tabular-nums">
                {getLatest(GDP_GROWTH).rate}%
              </p>
              <p className="text-[11px] text-muted-foreground">전년대비</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">고용률</p>
              <p className="text-2xl font-bold tabular-nums">
                {getLatest(EMPLOYMENT).employment}%
              </p>
              <p className="text-[11px] text-muted-foreground">
                {getLatest(EMPLOYMENT).year}년
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a
              href="/statistics"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              경제지표 대시보드 바로가기
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
