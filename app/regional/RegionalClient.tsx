"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import {
  REGIONAL_CPI_CATEGORIES,
  REGIONAL_CPI_BY_CATEGORY,
  getRegionalCpiExtremes,
  type RegionalCpiCategoryId,
} from "@/lib/macro-data";
import { CATEGORIES, CATEGORY_LIST } from "@/lib/inflation-items";
import { toSlug } from "@/lib/slug";
import Footer from "@/components/Footer";

// ---------------------------------------------------------------------------
// Constants (same as StatisticsClient)
// ---------------------------------------------------------------------------

const TOOLTIP_STYLE = {
  backgroundColor: "oklch(0.145 0 0)",
  border: "1px solid oklch(0.269 0 0)",
  borderRadius: "6px",
  color: "oklch(0.985 0 0)",
  fontSize: "12px",
} as const;

const COLOR = {
  green: "oklch(0.70 0.15 162)",
  greenLine: "oklch(0.85 0.13 165)",
  red: "oklch(0.70 0.15 25)",
  blue: "oklch(0.70 0.15 240)",
  grid: "oklch(0.269 0 0)",
  axis: "oklch(0.556 0 0)",
  cursor: "oklch(0.556 0 0)",
} as const;

const AXIS_PROPS = {
  stroke: COLOR.axis,
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const itemHref = (cat: string, itemName: string) =>
  `/${encodeURIComponent(toSlug(cat))}/${encodeURIComponent(toSlug(itemName))}`;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  suffix,
  sub,
}: {
  label: string;
  value: string;
  suffix?: string;
  sub?: string;
}) {
  return (
    <div className="bg-card px-4 py-4 sm:px-6 sm:py-5 flex sm:block items-center justify-between">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div>
        <div className="flex items-baseline gap-1.5">
          <p className="text-xl sm:text-2xl font-bold tabular-nums">{value}</p>
          {suffix && (
            <span className="text-sm sm:text-base font-normal text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
        {sub && (
          <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function RegionalClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<RegionalCpiCategoryId>("overall");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [sortKey, setSortKey] = useState<"region" | "index" | "rate">("index");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // JSON-LD structured data
  useEffect(() => {
    const SITE_URL = "https://inflation.pflow.app";

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "지역별 물가지수",
          item: `${SITE_URL}/regional`,
        },
      ],
    };

    const dataset = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "지역별 소비자물가지수",
      description:
        "17개 시·도별 COICOP 12개 카테고리 소비자물가지수 비교 (2020=100)",
      url: `${SITE_URL}/regional`,
      creator: {
        "@type": "Organization",
        name: "pflow.app",
        url: "https://pflow.app",
      },
      temporalCoverage: "2024",
      spatialCoverage: { "@type": "Place", name: "대한민국" },
    };

    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.textContent = JSON.stringify(breadcrumb);
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.textContent = JSON.stringify(dataset);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ---- Search logic ----
  const sq = searchQuery.trim().toLowerCase();
  const searchResults: { category: string; items: string[] }[] = [];
  if (sq) {
    for (const cat of CATEGORY_LIST) {
      const catMatch = cat.toLowerCase().includes(sq);
      const matchingItems = CATEGORIES[cat].filter(
        (item) => item.toLowerCase().includes(sq) || catMatch,
      );
      if (matchingItems.length > 0) {
        searchResults.push({ category: cat, items: matchingItems });
      }
    }
  }

  // ---- Derived data ----
  const categoryMeta = REGIONAL_CPI_CATEGORIES.find(
    (c) => c.id === selectedCategory,
  )!;

  const extremes = useMemo(
    () => getRegionalCpiExtremes(selectedCategory),
    [selectedCategory],
  );

  const chartData = useMemo(
    () =>
      [...REGIONAL_CPI_BY_CATEGORY[selectedCategory]].sort(
        (a, b) => b.index - a.index,
      ),
    [selectedCategory],
  );

  const minDomain = Math.floor(
    Math.min(...chartData.map((d) => d.index)) - 2,
  );
  const maxDomain = Math.ceil(
    Math.max(...chartData.map((d) => d.index)) + 1,
  );

  const tableData = useMemo(() => {
    return [...REGIONAL_CPI_BY_CATEGORY[selectedCategory]].sort((a, b) => {
      const mul = sortDir === "desc" ? -1 : 1;
      if (sortKey === "region")
        return mul * a.region.localeCompare(b.region, "ko");
      return mul * (a[sortKey] - b[sortKey]);
    });
  }, [selectedCategory, sortKey, sortDir]);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sortIndicator = (key: typeof sortKey) => {
    if (sortKey !== key) return "";
    return sortDir === "desc" ? " \u25BC" : " \u25B2";
  };

  const spread = (extremes.highest.index - extremes.lowest.index).toFixed(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* ================================================================
            Header
        ================================================================ */}
        <header className="mb-8 border-b border-border pb-6 sm:pb-8">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2.5">
            통계청 소비자물가조사 &middot; 2024년 기준
          </p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1.5">
                <a href="/" className="hover:opacity-80 transition-opacity">
                  지역별 소비자물가지수
                </a>
              </h1>
              <p className="text-muted-foreground text-sm">
                17개 시·도별 물가를 12개 카테고리별로 비교합니다
              </p>
            </div>

            {/* Search */}
            <div
              ref={searchRef}
              className="relative flex-shrink-0 w-40 sm:w-56"
            >
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
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
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                placeholder="품목 검색..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {searchFocused && sq.length > 0 && searchResults.length > 0 && (
                <div className="absolute z-50 top-full mt-1 w-72 right-0 bg-card border border-border rounded-lg shadow-2xl max-h-72 overflow-y-auto">
                  {searchResults.map(({ category: cat, items }) => (
                    <div key={cat}>
                      <a
                        href={itemHref(cat, items[0])}
                        className="block px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wider hover:bg-muted/50 border-b border-border/50"
                      >
                        {cat}
                      </a>
                      {items.map((item) => (
                        <a
                          key={item}
                          href={itemHref(cat, item)}
                          className="block px-3 py-2 pl-6 text-sm text-foreground hover:bg-muted/50"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {searchFocused && sq.length > 0 && searchResults.length === 0 && (
                <div className="absolute z-50 top-full mt-1 w-72 right-0 bg-card border border-border rounded-lg shadow-2xl p-4 text-center text-sm text-muted-foreground">
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================================================================
            Category selector
        ================================================================ */}
        <div className="mb-6 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {REGIONAL_CPI_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-sm rounded-lg border whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/50"
                }`}
              >
                <span className="sm:hidden">{cat.labelShort}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================================================================
            Stat Cards
        ================================================================ */}
        <div className="mb-8 border border-border rounded-lg overflow-hidden grid grid-cols-1 divide-y sm:grid-cols-2 lg:grid-cols-4 sm:divide-x sm:divide-y-0 divide-border">
          <StatCard
            label="전국 평균 지수"
            value={extremes.average.toFixed(1)}
            suffix="(2020=100)"
          />
          <StatCard
            label="최고 지역"
            value={extremes.highest.region}
            suffix={extremes.highest.index.toFixed(1)}
            sub={`전년대비 +${extremes.highest.rate}%`}
          />
          <StatCard
            label="최저 지역"
            value={extremes.lowest.region}
            suffix={extremes.lowest.index.toFixed(1)}
            sub={`전년대비 +${extremes.lowest.rate}%`}
          />
          <StatCard
            label="지역 간 격차"
            value={spread}
            suffix="p"
            sub={`평균 상승률 +${extremes.rateAverage}%`}
          />
        </div>

        {/* ================================================================
            Chart
        ================================================================ */}
        <div className="border border-border rounded-lg p-4 sm:p-6 bg-card mb-8">
          <div className="mb-4">
            <h3 className="text-sm font-semibold">
              지역별 소비자물가지수 — {categoryMeta.label}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              2024년 기준 시·도별 {categoryMeta.label} 소비자물가지수
              (2020=100). 빨간색: 최고, 파란색: 최저, 점선: 전국 평균
            </p>
          </div>
          <div className="h-[500px] sm:h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -4, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke={COLOR.grid}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  {...AXIS_PROPS}
                  domain={[minDomain, maxDomain]}
                />
                <YAxis
                  type="category"
                  dataKey="region"
                  {...AXIS_PROPS}
                  width={36}
                  tick={{ fontSize: 11 }}
                />
                <ReferenceLine
                  x={extremes.average}
                  stroke={COLOR.red}
                  strokeDasharray="4 4"
                  strokeWidth={1}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ fill: COLOR.grid, opacity: 0.4 }}
                  formatter={(value: any, _name: any, props: any) => [
                    `지수 ${value} (전년대비 +${props.payload.rate}%)`,
                    props.payload.region,
                  ]}
                />
                <Bar
                  dataKey="index"
                  fill={COLOR.green}
                  radius={[0, 2, 2, 0]}
                  barSize={18}
                  animationDuration={400}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.region}
                      fill={
                        entry.region === extremes.highest.region
                          ? COLOR.red
                          : entry.region === extremes.lowest.region
                            ? COLOR.blue
                            : COLOR.green
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================================================================
            Data Table
        ================================================================ */}
        <div className="border border-border rounded-lg overflow-hidden mb-8">
          <div className="p-4 sm:p-6 border-b border-border">
            <h3 className="text-sm font-semibold">
              {categoryMeta.label} 지역별 상세 데이터
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              열 제목을 클릭하면 정렬할 수 있습니다
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground w-14">
                    순위
                  </th>
                  <th
                    onClick={() => toggleSort("region")}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
                  >
                    지역{sortIndicator("region")}
                  </th>
                  <th
                    onClick={() => toggleSort("index")}
                    className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
                  >
                    물가지수{sortIndicator("index")}
                  </th>
                  <th
                    onClick={() => toggleSort("rate")}
                    className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
                  >
                    전년대비(%){sortIndicator("rate")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">
                    평균 대비
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => {
                  const diff = row.index - extremes.average;
                  return (
                    <tr
                      key={row.region}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-2.5 text-muted-foreground tabular-nums">
                        {i + 1}
                      </td>
                      <td className="px-4 py-2.5 font-medium">
                        {row.region}
                        {row.region === extremes.highest.region && (
                          <span className="ml-1.5 text-[10px] text-destructive font-semibold">
                            최고
                          </span>
                        )}
                        {row.region === extremes.lowest.region && (
                          <span className="ml-1.5 text-[10px] text-blue-400 font-semibold">
                            최저
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-medium">
                        {row.index.toFixed(1)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        <span
                          className={
                            row.rate >= extremes.rateAverage
                              ? "text-destructive"
                              : "text-blue-400"
                          }
                        >
                          +{row.rate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        <span
                          className={
                            diff > 0
                              ? "text-destructive"
                              : diff < 0
                                ? "text-blue-400"
                                : "text-muted-foreground"
                          }
                        >
                          {diff > 0 ? "+" : ""}
                          {diff.toFixed(1)}p
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================================
            Insights
        ================================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="border border-border rounded-lg p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-1">물가 최고 지역</p>
            <p className="text-sm font-medium">
              {categoryMeta.label} 기준{" "}
              <span className="text-destructive font-bold">
                {extremes.highest.region}
              </span>
              이 {extremes.highest.index.toFixed(1)}로 가장 높습니다
            </p>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-1">물가 최저 지역</p>
            <p className="text-sm font-medium">
              <span className="text-blue-400 font-bold">
                {extremes.lowest.region}
              </span>
              이 {extremes.lowest.index.toFixed(1)}로 가장 낮으며, 최고 지역과{" "}
              {spread}p 차이
            </p>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-1">
              전년대비 상승률
            </p>
            <p className="text-sm font-medium">
              전국 평균 +{extremes.rateAverage}%, 2020년 대비 모든 지역의 물가가
              상승
            </p>
          </div>
        </div>

        {/* ================================================================
            Navigation
        ================================================================ */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href="/"
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            &larr; 홈으로
          </a>
          <span className="text-muted-foreground">·</span>
          <a
            href="/statistics"
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            경제지표 대시보드 &rarr;
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
