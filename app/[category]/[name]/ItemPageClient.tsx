"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  INFLATION_ITEMS,
  CATEGORIES,
  CATEGORY_LIST,
} from "@/lib/inflation-items";
import { toSlug, fromSlug } from "@/lib/slug";
import Footer from "@/components/Footer";
import {
  MINIMUM_WAGE,
  AVG_MONTHLY_WAGE,
  getMinuteEquivalent,
  getMonthlyPurchaseCount,
  getLatest,
} from "@/lib/macro-data";

type ItemData = {
  category: string;
  longTerm: Array<{ year: string; index: number }>;
  fiveYear: Array<{ year: string; price: number }>;
  currentPrice: number;
  tenYearIncrease: number | null;
  lastUpdated: string | null;
};

export default function ItemPageClient() {
  const params = useParams<{ category: string; name: string }>();

  const category = fromSlug(decodeURIComponent(params.category));
  const name = fromSlug(decodeURIComponent(params.name));

  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = INFLATION_ITEMS.find((i) => i.name === name);
    if (!item) return;

    setLoading(true);
    setItemData(null);
    fetch(`/api/inflation?code=${item.code}`)
      .then((res) => res.json())
      .then((json) => {
        setItemData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch item data:", err);
        setLoading(false);
      });
  }, [name]);

  // Dynamic title & JSON-LD
  useEffect(() => {
    document.title = `${name} 물가 추이 - ${category} | 대한민국 물가 인플레이션`;

    const SITE_URL = "https://inflation.pflow.app";
    const url = `${SITE_URL}/${toSlug(category)}/${toSlug(name)}`;

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: category,
          item: `${SITE_URL}/${toSlug(category)}`,
        },
        { "@type": "ListItem", position: 3, name, item: url },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumb);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [category, name]);

  // Close search / tooltip on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  const foodList = CATEGORIES[category] ?? [];
  const trackingStart = itemData?.longTerm?.[0]?.year ?? "—";
  const trackingEnd = itemData?.lastUpdated ?? "—";
  const isAggregate = itemData?.category === "종합지수";

  // 10년 전 대비 원 단위 차이 계산
  const tenYearPriceDiff = (() => {
    if (!itemData || isAggregate) return null;
    const latestYear = parseInt(itemData.lastUpdated ?? "");
    if (isNaN(latestYear)) return null;
    const targetYear = String(latestYear - 10);
    const oldEntry = itemData.fiveYear.find((d) => d.year === targetYear);
    if (!oldEntry) return null;
    return {
      oldPrice: oldEntry.price,
      diff: itemData.currentPrice - oldEntry.price,
    };
  })();

  // 최저임금 대비 계산
  const wageComparison = (() => {
    if (!itemData || isAggregate) return null;
    const latestYear = parseInt(itemData.lastUpdated ?? "");
    if (isNaN(latestYear)) return null;

    const currentMinutes = getMinuteEquivalent(itemData.currentPrice, latestYear);

    const tenYearsAgo = latestYear - 10;
    const oldPrice = itemData.fiveYear.find(
      (d) => d.year === String(tenYearsAgo),
    )?.price;
    const oldMinutes = oldPrice
      ? getMinuteEquivalent(oldPrice, tenYearsAgo)
      : null;

    const currentWageEntry =
      MINIMUM_WAGE.find((w) => w.year === latestYear) ??
      getLatest(MINIMUM_WAGE);
    const oldWageEntry = MINIMUM_WAGE.find((w) => w.year === tenYearsAgo);

    return {
      currentMinutes,
      oldMinutes,
      currentWage: currentWageEntry,
      oldWage: oldWageEntry,
      oldPrice,
      tenYearsAgo,
    };
  })();

  // 월급 구매력 비교
  const purchasingPower = (() => {
    if (!itemData || isAggregate) return null;
    const latestYear = parseInt(itemData.lastUpdated ?? "");
    if (isNaN(latestYear)) return null;

    const tenYearsAgo = latestYear - 10;
    const oldPrice = itemData.fiveYear.find(
      (d) => d.year === String(tenYearsAgo),
    )?.price;
    if (!oldPrice) return null;

    const currentCount = getMonthlyPurchaseCount(
      itemData.currentPrice,
      latestYear,
    );
    const oldCount = getMonthlyPurchaseCount(oldPrice, tenYearsAgo);

    const currentWage = AVG_MONTHLY_WAGE.find((w) => w.year === latestYear);
    const oldWage = AVG_MONTHLY_WAGE.find((w) => w.year === tenYearsAgo);

    if (!currentWage || !oldWage || currentCount === 0 || oldCount === 0)
      return null;

    const changePercent = (
      ((currentCount - oldCount) / oldCount) *
      100
    ).toFixed(1);

    return {
      currentCount,
      oldCount,
      currentWage: currentWage.wage,
      oldWage: oldWage.wage,
      changePercent: parseFloat(changePercent),
      tenYearsAgo,
      latestYear,
    };
  })();

  const navigateTo = (cat: string, itemName: string) => {
    window.location.href = `/${toSlug(cat)}/${toSlug(itemName)}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <header className="mb-8 border-b border-border pb-6 sm:pb-8">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2.5">
            통계청 KOSIS · 생활물가지수 2020=100
          </p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1.5">
                <a href="/" className="hover:opacity-80 transition-opacity">
                  대한민국 물가 인플레이션
                </a>
              </h1>
              <p className="text-muted-foreground text-sm">
                외식·식재료·의류·교통·교육 등 151개 품목의 장기 물가 변화
              </p>
            </div>
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
                        href={`/${encodeURIComponent(toSlug(cat))}/${encodeURIComponent(toSlug(items[0]))}`}
                        className="block px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wider hover:bg-muted/50 border-b border-border/50"
                      >
                        {cat}
                      </a>
                      {items.map((item) => (
                        <a
                          key={item}
                          href={`/${encodeURIComponent(toSlug(cat))}/${encodeURIComponent(toSlug(item))}`}
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

        {/* Category select */}
        <div className="mb-4">
          <select
            value={category}
            onChange={(e) =>
              navigateTo(e.target.value, CATEGORIES[e.target.value][0])
            }
            className="w-full sm:w-auto px-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {CATEGORY_LIST.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Item selector */}
        <div className="mb-6 pt-2 flex flex-wrap gap-1.5">
          {foodList.map((food) => (
            <button
              key={food}
              onClick={() => navigateTo(category, food)}
              className={cn(
                "px-3 py-1 text-sm rounded-md border transition-colors",
                name === food
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground",
              )}
            >
              {food}
            </button>
          ))}
        </div>

        {/* Key stats */}
        <div
          className="mb-6 border border-border rounded-lg overflow-hidden
          grid grid-cols-1 divide-y sm:grid-cols-2 lg:grid-cols-4 sm:divide-x sm:divide-y-0 divide-border"
        >
          <div className="bg-card px-4 py-4 sm:px-6 sm:py-5 flex sm:block items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {isAggregate ? "최신 지수값" : "현재 평균가"}
            </p>
            <p className="text-xl sm:text-2xl font-bold tabular-nums">
              {loading ? (
                <span className="text-muted-foreground text-base">—</span>
              ) : isAggregate ? (
                (itemData?.longTerm[
                  itemData.longTerm.length - 1
                ]?.index.toFixed(1) ?? "—")
              ) : (
                (itemData?.currentPrice.toLocaleString() ?? "—")
              )}
              {!loading && !isAggregate && itemData && (
                <span className="text-sm sm:text-base font-normal text-muted-foreground ml-1">
                  원
                </span>
              )}
            </p>
          </div>
          <div className="bg-card px-4 py-4 sm:px-6 sm:py-5 flex sm:block items-center justify-between">
            <p className="text-xs text-muted-foreground">10년 전 대비</p>
            <p
              className={`text-xl sm:text-2xl font-bold tabular-nums ${itemData?.tenYearIncrease != null && itemData.tenYearIncrease < 0 ? "text-blue-400" : "text-destructive"}`}
            >
              {loading ? (
                <span className="text-muted-foreground text-base">—</span>
              ) : itemData?.tenYearIncrease != null ? (
                <>
                  {itemData.tenYearIncrease > 0 ? "+" : ""}
                  {itemData.tenYearIncrease}
                  <span className="text-sm sm:text-base font-normal text-muted-foreground ml-1">
                    %
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground text-base">—</span>
              )}
            </p>
          </div>
          <div className="bg-card px-4 py-4 sm:px-6 sm:py-5 flex sm:block items-center justify-between">
            <p className="text-xs text-muted-foreground">10년간 가격 변화</p>
            <p className="text-xl sm:text-2xl font-bold tabular-nums">
              {loading ? (
                <span className="text-muted-foreground text-base">—</span>
              ) : tenYearPriceDiff ? (
                <>
                  <span
                    className={
                      tenYearPriceDiff.diff >= 0
                        ? "text-destructive"
                        : "text-blue-400"
                    }
                  >
                    {tenYearPriceDiff.diff > 0 ? "+" : ""}
                    {tenYearPriceDiff.diff.toLocaleString()}
                  </span>
                  <span className="text-sm sm:text-base font-normal text-muted-foreground ml-1">
                    원
                  </span>
                </>
              ) : isAggregate ? (
                <span className="text-muted-foreground text-base">—</span>
              ) : (
                <span className="text-muted-foreground text-base">—</span>
              )}
            </p>
            {!loading && tenYearPriceDiff && (
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {tenYearPriceDiff.oldPrice.toLocaleString()}원 →{" "}
                {itemData!.currentPrice.toLocaleString()}원
              </p>
            )}
          </div>
          <div className="bg-card px-4 py-4 sm:px-6 sm:py-5 flex sm:block items-center justify-between">
            <p className="text-xs text-muted-foreground">추적 기간</p>
            <p className="text-xl sm:text-2xl font-bold tabular-nums">
              {loading ? (
                <span className="text-muted-foreground text-base">—</span>
              ) : (
                <>
                  {trackingStart}
                  <span className="text-xs sm:text-sm font-normal text-muted-foreground mx-1.5">
                    –
                  </span>
                  {trackingEnd}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Price bar chart */}
          <div className="lg:col-span-2 border border-border rounded-lg p-4 sm:p-6 bg-card">
            <div className="mb-4">
              <h2 className="text-sm font-semibold">연도별 추정 가격</h2>
              <p className="text-xs text-muted-foreground mt-1">
                2020년 기준가 × 지수 추정 (원)
              </p>
            </div>
            <div className="h-60 sm:h-72 flex items-center justify-center">
              {loading ? (
                <p className="text-xs text-muted-foreground">불러오는 중...</p>
              ) : itemData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={itemData.fiveYear}
                    margin={{ top: 4, right: 4, left: -14, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="2 4"
                      stroke="oklch(0.269 0 0)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="year"
                      stroke="oklch(0.556 0 0)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      dy={8}
                      interval={4}
                    />
                    <YAxis
                      stroke="oklch(0.556 0 0)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v / 1000}k`}
                    />
                    <Tooltip
                      cursor={{ fill: "oklch(0.269 0 0)", opacity: 0.4 }}
                      contentStyle={{
                        backgroundColor: "oklch(0.145 0 0)",
                        border: "1px solid oklch(0.269 0 0)",
                        borderRadius: "6px",
                        color: "oklch(0.985 0 0)",
                        fontSize: "12px",
                      }}
                      formatter={(value: any) => [
                        `${Number(value).toLocaleString()}원`,
                        "가격",
                      ]}
                    />
                    <Bar
                      dataKey="price"
                      fill="oklch(0.70 0.15 162)"
                      radius={[2, 2, 0, 0]}
                      animationDuration={400}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>

          {/* Long-term line chart */}
          <div className="lg:col-span-3 border border-border rounded-lg p-4 sm:p-6 bg-card">
            <div className="mb-4">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-semibold">
                  {name} — 장기 물가지수 추이
                </h2>
                <div ref={tooltipRef} className="relative">
                  <button
                    onClick={() => setShowTooltip((v) => !v)}
                    className="w-4 h-4 rounded-full border border-muted-foreground/40 text-muted-foreground hover:text-foreground hover:border-foreground/60 transition-colors flex items-center justify-center text-[10px] font-bold leading-none"
                  >
                    ?
                  </button>
                  {showTooltip && (
                    <div className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-2xl p-3 text-xs text-muted-foreground leading-relaxed">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-l border-t border-border rotate-45" />
                      <p className="font-semibold text-foreground mb-1">
                        물가지수란?
                      </p>
                      <p>
                        2020년 가격을 100으로 놓고 각 연도의 가격 수준을
                        상대적으로 나타낸 수치입니다. 예를 들어 지수가 120이면
                        2020년보다 20% 올랐다는 뜻이고, 80이면 20% 낮았다는
                        뜻입니다.
                      </p>
                      <p className="mt-1.5 text-muted-foreground/70">
                        출처: 통계청 KOSIS 생활물가지수
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                2020년 = 100 기준
                {!loading && itemData
                  ? `, ${trackingStart}~${trackingEnd}`
                  : ""}
              </p>
            </div>
            <div className="h-60 sm:h-72 flex items-center justify-center">
              {loading ? (
                <p className="text-xs text-muted-foreground">불러오는 중...</p>
              ) : itemData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={itemData.longTerm}
                    margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="2 4"
                      stroke="oklch(0.269 0 0)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="year"
                      stroke="oklch(0.556 0 0)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      dy={8}
                      interval={4}
                    />
                    <YAxis
                      stroke="oklch(0.556 0 0)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.145 0 0)",
                        border: "1px solid oklch(0.269 0 0)",
                        borderRadius: "6px",
                        color: "oklch(0.985 0 0)",
                        fontSize: "12px",
                      }}
                      cursor={{ stroke: "oklch(0.556 0 0)", strokeWidth: 1 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="index"
                      name="물가지수"
                      stroke="oklch(0.85 0.13 165)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{
                        r: 3,
                        strokeWidth: 0,
                        fill: "oklch(0.85 0.13 165)",
                      }}
                      animationDuration={400}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>
        </div>

        {/* Wage & purchasing power comparison */}
        {!loading && !isAggregate && (wageComparison || purchasingPower) && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 최저임금 대비 */}
            {wageComparison && (
              <div className="border border-border rounded-lg p-4 sm:p-6 bg-card">
                <h2 className="text-sm font-semibold mb-4">
                  최저임금으로 환산
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-foreground">
                        현재{" "}
                        <span className="font-semibold">{name}</span>{" "}
                        ({itemData!.currentPrice.toLocaleString()}원)
                      </p>
                      <p className="text-lg font-bold tabular-nums mt-0.5">
                        = 최저임금 약{" "}
                        <span className="text-destructive">
                          {wageComparison.currentMinutes}분
                        </span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {itemData!.currentPrice.toLocaleString()}원 ÷{" "}
                        {wageComparison.currentWage.hourly.toLocaleString()}
                        원/시간
                      </p>
                    </div>
                  </div>

                  {wageComparison.oldMinutes && wageComparison.oldWage && (
                    <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          {wageComparison.tenYearsAgo}년에는
                        </p>
                        <p className="text-lg font-bold tabular-nums mt-0.5">
                          = 최저임금 약{" "}
                          <span className="text-blue-400">
                            {wageComparison.oldMinutes}분
                          </span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {wageComparison.oldPrice?.toLocaleString()}원 ÷{" "}
                          {wageComparison.oldWage.hourly.toLocaleString()}
                          원/시간
                        </p>
                      </div>
                    </div>
                  )}

                  {wageComparison.oldMinutes && (
                    <div className="bg-muted/30 rounded-md p-3 mt-2">
                      <p className="text-xs text-muted-foreground">
                        {wageComparison.currentMinutes >
                        (wageComparison.oldMinutes ?? 0)
                          ? `10년 전보다 최저임금 기준 ${wageComparison.currentMinutes - (wageComparison.oldMinutes ?? 0)}분 더 일해야 합니다.`
                          : `10년 전보다 최저임금 기준 ${(wageComparison.oldMinutes ?? 0) - wageComparison.currentMinutes}분 덜 일해도 됩니다.`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 월급 구매력 */}
            {purchasingPower && (
              <div className="border border-border rounded-lg p-4 sm:p-6 bg-card">
                <h2 className="text-sm font-semibold mb-4">
                  월급 구매력 변화
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">
                          {purchasingPower.latestYear}년
                        </span>{" "}
                        월급({purchasingPower.currentWage}만원)으로
                      </p>
                      <p className="text-lg font-bold tabular-nums mt-0.5">
                        {name} 약{" "}
                        <span className="text-foreground">
                          {purchasingPower.currentCount.toLocaleString()}개
                        </span>{" "}
                        구매 가능
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">
                          {purchasingPower.tenYearsAgo}년
                        </span>{" "}
                        월급({purchasingPower.oldWage}만원)으로
                      </p>
                      <p className="text-lg font-bold tabular-nums mt-0.5">
                        {name} 약{" "}
                        <span className="text-foreground">
                          {purchasingPower.oldCount.toLocaleString()}개
                        </span>{" "}
                        구매 가능
                      </p>
                    </div>
                  </div>

                  <div
                    className={`rounded-md p-3 mt-2 ${purchasingPower.changePercent < 0 ? "bg-destructive/10" : "bg-blue-500/10"}`}
                  >
                    <p
                      className={`text-xs font-medium ${purchasingPower.changePercent < 0 ? "text-destructive" : "text-blue-400"}`}
                    >
                      {purchasingPower.changePercent < 0
                        ? `구매력 ${Math.abs(purchasingPower.changePercent)}% 감소 — 같은 월급으로 ${purchasingPower.oldCount - purchasingPower.currentCount}개 덜 살 수 있습니다`
                        : `구매력 ${purchasingPower.changePercent}% 증가 — 같은 월급으로 ${purchasingPower.currentCount - purchasingPower.oldCount}개 더 살 수 있습니다`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Statistics link */}
        <div className="mt-8 text-center">
          <a
            href="/statistics"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            더 많은 경제지표 보기 →
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
