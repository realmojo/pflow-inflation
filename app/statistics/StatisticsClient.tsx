"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Line,
  LineChart,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import {
  MINIMUM_WAGE,
  CPI_RATE,
  GDP_GROWTH,
  EMPLOYMENT,
  AVG_MONTHLY_WAGE,
  REGIONAL_CPI,
  getLatest,
} from "@/lib/macro-data";
import { CATEGORIES, CATEGORY_LIST } from "@/lib/inflation-items";
import { toSlug } from "@/lib/slug";
import Footer from "@/components/Footer";

// ---------------------------------------------------------------------------
// Constants
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
  greenFill: "oklch(0.70 0.15 162)",
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
// Derived data
// ---------------------------------------------------------------------------

function buildGdpCpiOverlay() {
  const map = new Map<number, { year: number; gdp?: number; cpi?: number }>();
  for (const d of GDP_GROWTH) {
    map.set(d.year, { year: d.year, gdp: d.rate });
  }
  for (const d of CPI_RATE) {
    const existing = map.get(d.year);
    if (existing) {
      existing.cpi = d.rate;
    } else {
      map.set(d.year, { year: d.year, cpi: d.rate });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.year - b.year);
}

function buildMonthlyMinWage() {
  return MINIMUM_WAGE.map((d) => ({
    year: d.year,
    monthly: Math.round((d.hourly * 209) / 10000),
    monthlyRaw: d.hourly * 209,
  }));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const itemHref = (cat: string, itemName: string) =>
  `/${encodeURIComponent(toSlug(cat))}/${encodeURIComponent(toSlug(itemName))}`;

function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-lg p-4 sm:p-6 bg-card">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="h-64 sm:h-80">{children}</div>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  delta,
}: {
  label: string;
  value: string;
  suffix?: string;
  delta?: "up" | "down" | "neutral";
}) {
  return (
    <div className="bg-card px-4 py-4 sm:px-6 sm:py-5 flex sm:block items-center justify-between">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <p className="text-xl sm:text-2xl font-bold tabular-nums">{value}</p>
        {suffix && (
          <span className="text-sm sm:text-base font-normal text-muted-foreground">
            {suffix}
          </span>
        )}
        {delta && delta !== "neutral" && (
          <span
            className={
              delta === "up" ? "text-destructive text-sm" : "text-blue-400 text-sm"
            }
          >
            {delta === "up" ? "\u25B2" : "\u25BC"}
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function StatisticsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Dynamic title + JSON-LD structured data
  useEffect(() => {
    document.title = "한국 경제지표 대시보드 - 물가·임금·GDP·고용 | 대한민국 물가 인플레이션";

    const SITE_URL = "https://inflation.pflow.app";

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "경제지표 대시보드", item: `${SITE_URL}/statistics` },
      ],
    };

    const dataset = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "한국 주요 경제지표",
      description: "소비자물가 상승률, 최저임금, GDP 성장률, 고용률, 월평균 임금 등 한국의 주요 경제지표 장기 추이",
      url: `${SITE_URL}/statistics`,
      creator: {
        "@type": "Organization",
        name: "pflow.app",
        url: "https://pflow.app",
      },
      temporalCoverage: "2000/2024",
      spatialCoverage: {
        "@type": "Place",
        name: "대한민국",
      },
      variableMeasured: [
        { "@type": "PropertyValue", name: "소비자물가 상승률", unitText: "%" },
        { "@type": "PropertyValue", name: "최저임금", unitText: "원/시간" },
        { "@type": "PropertyValue", name: "GDP 성장률", unitText: "%" },
        { "@type": "PropertyValue", name: "고용률", unitText: "%" },
        { "@type": "PropertyValue", name: "월평균 임금", unitText: "만원" },
      ],
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
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ---- Search logic (same pattern as ItemPageClient) ----
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

  // ---- Latest values ----
  const latestCpi = getLatest(CPI_RATE);
  const latestWage = getLatest(MINIMUM_WAGE);
  const latestGdp = getLatest(GDP_GROWTH);
  const latestEmp = getLatest(EMPLOYMENT);

  // ---- Derived chart data (memoized) ----
  const gdpCpiData = useMemo(() => buildGdpCpiOverlay(), []);
  const monthlyMinWage = useMemo(() => buildMonthlyMinWage(), []);

  // ---- Insights ----
  const wageMultiple = (
    latestWage.hourly / MINIMUM_WAGE[0].hourly
  ).toFixed(1);

  const cumulativeCpi = CPI_RATE.reduce((sum, d) => sum + d.rate, 0).toFixed(0);

  const prevCpi = CPI_RATE.length >= 2 ? CPI_RATE[CPI_RATE.length - 2] : null;
  const cpiDelta: "up" | "down" | "neutral" = prevCpi
    ? latestCpi.rate > prevCpi.rate
      ? "up"
      : latestCpi.rate < prevCpi.rate
        ? "down"
        : "neutral"
    : "neutral";

  const prevGdp = GDP_GROWTH.length >= 2 ? GDP_GROWTH[GDP_GROWTH.length - 2] : null;
  const gdpDelta: "up" | "down" | "neutral" = prevGdp
    ? latestGdp.rate > prevGdp.rate
      ? "up"
      : latestGdp.rate < prevGdp.rate
        ? "down"
        : "neutral"
    : "neutral";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* ================================================================
            Header
        ================================================================ */}
        <header className="mb-8 border-b border-border pb-6 sm:pb-8">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2.5">
            고용노동부 &middot; 통계청 &middot; 한국은행
          </p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1.5">
                <a href="/" className="hover:opacity-80 transition-opacity">
                  한국 경제지표 대시보드
                </a>
              </h1>
              <p className="text-muted-foreground text-sm">
                주요 경제 지표의 장기 추이를 한눈에 확인하세요
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
            Key Indicator Cards
        ================================================================ */}
        <div
          className="mb-8 border border-border rounded-lg overflow-hidden
          grid grid-cols-1 divide-y sm:grid-cols-2 lg:grid-cols-4 sm:divide-x sm:divide-y-0 divide-border"
        >
          <StatCard
            label={`소비자물가 상승률 (${latestCpi.year})`}
            value={latestCpi.rate.toFixed(1)}
            suffix="%"
            delta={cpiDelta}
          />
          <StatCard
            label={`최저임금 (${latestWage.year})`}
            value={formatNumber(latestWage.hourly)}
            suffix="원/시간"
          />
          <StatCard
            label={`GDP 성장률 (${latestGdp.year})`}
            value={latestGdp.rate.toFixed(1)}
            suffix="%"
            delta={gdpDelta}
          />
          <StatCard
            label={`고용률 (${latestEmp.year})`}
            value={latestEmp.employment.toFixed(1)}
            suffix="%"
          />
        </div>

        {/* ================================================================
            Charts — 2-column grid
        ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          {/* ---- 1. 소비자물가 상승률 추이 (Area) ---- */}
          <ChartCard
            title="소비자물가 상승률 추이"
            description="전년 대비 소비자물가 상승률 (%), 한국은행 물가안정목표 2.0%"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[...CPI_RATE]}
                margin={{ top: 8, right: 8, left: -14, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="cpiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={COLOR.greenLine}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={COLOR.greenLine}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke={COLOR.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  {...AXIS_PROPS}
                  dy={8}
                  interval={4}
                />
                <YAxis
                  {...AXIS_PROPS}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ stroke: COLOR.cursor, strokeWidth: 1 }}
                  formatter={(value: any) => [`${value}%`, "물가 상승률"]}
                />
                <ReferenceLine
                  y={2.0}
                  stroke={COLOR.red}
                  strokeDasharray="4 4"
                  strokeWidth={1}
                  label={{
                    value: "목표 2.0%",
                    position: "right",
                    fill: COLOR.red,
                    fontSize: 10,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  name="물가 상승률"
                  stroke={COLOR.greenLine}
                  strokeWidth={2}
                  fill="url(#cpiGradient)"
                  dot={false}
                  activeDot={{
                    r: 3,
                    strokeWidth: 0,
                    fill: COLOR.greenLine,
                  }}
                  animationDuration={400}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* ---- 2. 최저임금 변화 (Bar) ---- */}
          <ChartCard
            title="최저임금 변화"
            description="연도별 시간당 최저임금 (원), 고용노동부 고시"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...MINIMUM_WAGE]}
                margin={{ top: 8, right: 8, left: -4, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke={COLOR.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  {...AXIS_PROPS}
                  dy={8}
                  interval={4}
                />
                <YAxis
                  {...AXIS_PROPS}
                  tickFormatter={(v: number) =>
                    v >= 10000 ? `${(v / 10000).toFixed(1)}만` : `${(v / 1000).toFixed(0)}k`
                  }
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ fill: COLOR.grid, opacity: 0.4 }}
                  formatter={(value: any) => [
                    `${formatNumber(Number(value))}원`,
                    "시간당",
                  ]}
                />
                <Bar
                  dataKey="hourly"
                  name="최저임금"
                  fill={COLOR.green}
                  radius={[2, 2, 0, 0]}
                  animationDuration={400}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* ---- 3. GDP 성장률 vs 물가상승률 (Dual line) ---- */}
          <ChartCard
            title="GDP 성장률 vs 물가상승률"
            description="한국은행 GDP 성장률과 소비자물가 상승률 비교 (%)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gdpCpiData}
                margin={{ top: 8, right: 8, left: -14, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke={COLOR.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  {...AXIS_PROPS}
                  dy={8}
                  interval={4}
                />
                <YAxis
                  {...AXIS_PROPS}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ stroke: COLOR.cursor, strokeWidth: 1 }}
                  formatter={(value: any, name: any) => [
                    `${value}%`,
                    name === "gdp" ? "GDP 성장률" : "물가 상승률",
                  ]}
                />
                <Legend
                  verticalAlign="top"
                  height={28}
                  iconType="line"
                  formatter={(value: any) =>
                    value === "gdp" ? "GDP 성장률" : "물가 상승률"
                  }
                  wrapperStyle={{ fontSize: "11px" }}
                />
                <ReferenceLine
                  y={0}
                  stroke={COLOR.axis}
                  strokeDasharray="2 2"
                  strokeWidth={1}
                />
                <Line
                  type="monotone"
                  dataKey="gdp"
                  name="gdp"
                  stroke={COLOR.blue}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0, fill: COLOR.blue }}
                  animationDuration={400}
                />
                <Line
                  type="monotone"
                  dataKey="cpi"
                  name="cpi"
                  stroke={COLOR.red}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0, fill: COLOR.red }}
                  animationDuration={400}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* ---- 4. 고용률 / 실업률 (Area + Line, dual Y) ---- */}
          <ChartCard
            title="고용률 / 실업률"
            description="15세 이상 고용률(좌축)과 실업률(우축), 통계청 경제활동인구조사"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[...EMPLOYMENT]}
                margin={{ top: 8, right: 4, left: -14, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="empGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={COLOR.greenLine}
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="100%"
                      stopColor={COLOR.greenLine}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke={COLOR.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  {...AXIS_PROPS}
                  dy={8}
                  interval={4}
                />
                <YAxis
                  yAxisId="left"
                  {...AXIS_PROPS}
                  domain={[55, 65]}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  {...AXIS_PROPS}
                  domain={[0, 6]}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ stroke: COLOR.cursor, strokeWidth: 1 }}
                  formatter={(value: any, name: any) => [
                    `${value}%`,
                    name === "employment" ? "고용률" : "실업률",
                  ]}
                />
                <Legend
                  verticalAlign="top"
                  height={28}
                  iconType="line"
                  formatter={(value: any) =>
                    value === "employment" ? "고용률" : "실업률"
                  }
                  wrapperStyle={{ fontSize: "11px" }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="employment"
                  name="employment"
                  stroke={COLOR.greenLine}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 3,
                    strokeWidth: 0,
                    fill: COLOR.greenLine,
                  }}
                  animationDuration={400}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="unemployment"
                  name="unemployment"
                  stroke={COLOR.red}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0, fill: COLOR.red }}
                  animationDuration={400}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* ---- 5. 월평균 임금 추이 (Bar) ---- */}
          <ChartCard
            title="월평균 임금 추이"
            description="고용노동부 고용형태별근로실태조사 기준 (만원)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...AVG_MONTHLY_WAGE]}
                margin={{ top: 8, right: 8, left: -14, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="wageGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={COLOR.greenLine}
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="100%"
                      stopColor={COLOR.green}
                      stopOpacity={0.7}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke={COLOR.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  {...AXIS_PROPS}
                  dy={8}
                  interval={4}
                />
                <YAxis
                  {...AXIS_PROPS}
                  tickFormatter={(v: number) => `${v}만`}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ fill: COLOR.grid, opacity: 0.4 }}
                  formatter={(value: any) => [`${value}만원`, "월평균 임금"]}
                />
                <Bar
                  dataKey="wage"
                  name="월평균 임금"
                  fill="url(#wageGradient)"
                  radius={[2, 2, 0, 0]}
                  animationDuration={400}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* ---- 6. 최저임금 월급 추이 (Line) ---- */}
          <ChartCard
            title="최저임금 월급 추이"
            description="시간당 최저임금 x 209시간 기준 월급 (만원)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyMinWage}
                margin={{ top: 8, right: 8, left: -14, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="minWageMonthly"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={COLOR.greenLine}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor={COLOR.greenLine}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke={COLOR.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  {...AXIS_PROPS}
                  dy={8}
                  interval={4}
                />
                <YAxis
                  {...AXIS_PROPS}
                  tickFormatter={(v: number) => `${v}만`}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ stroke: COLOR.cursor, strokeWidth: 1 }}
                  formatter={(value: any, _name: any, props: any) => [
                    `${formatNumber(props.payload.monthlyRaw)}원 (${value}만원)`,
                    "최저임금 월급",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="monthly"
                  name="최저임금 월급"
                  stroke={COLOR.greenLine}
                  strokeWidth={2}
                  fill="url(#minWageMonthly)"
                  dot={false}
                  activeDot={{
                    r: 3,
                    strokeWidth: 0,
                    fill: COLOR.greenLine,
                  }}
                  animationDuration={400}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* ---- 7. 지역별 물가 비교 (Bar, full-width) ---- */}
          <div className="lg:col-span-2">
            <ChartCard
              title="지역별 소비자물가지수 비교"
              description="2024년 기준 시·도별 소비자물가지수 (2020=100), 전년대비 상승률(%)"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[...REGIONAL_CPI].sort((a, b) => b.index - a.index)}
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
                    domain={[110, 118]}
                  />
                  <YAxis
                    type="category"
                    dataKey="region"
                    {...AXIS_PROPS}
                    width={36}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ fill: COLOR.grid, opacity: 0.4 }}
                    formatter={(value: any, name: any, props: any) => {
                      if (name === "index") {
                        return [
                          `지수 ${value} (전년대비 +${props.payload.rate}%)`,
                          props.payload.region,
                        ];
                      }
                      return [value, name];
                    }}
                  />
                  <Bar
                    dataKey="index"
                    name="index"
                    fill={COLOR.green}
                    radius={[0, 2, 2, 0]}
                    animationDuration={400}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        {/* ================================================================
            Insights
        ================================================================ */}
        <div className="mb-12">
          <h2 className="text-lg font-bold tracking-tight mb-4">
            주요 인사이트
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border border-border rounded-lg bg-card p-4 sm:p-5">
              <p className="text-xs text-muted-foreground mb-1">
                {MINIMUM_WAGE[0].year}년 대비 최저임금
              </p>
              <p className="text-2xl font-bold tabular-nums">
                {wageMultiple}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  배 상승
                </span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                {formatNumber(MINIMUM_WAGE[0].hourly)}원 →{" "}
                {formatNumber(latestWage.hourly)}원
              </p>
            </div>
            <div className="border border-border rounded-lg bg-card p-4 sm:p-5">
              <p className="text-xs text-muted-foreground mb-1">
                같은 기간 물가 누적 상승
              </p>
              <p className="text-2xl font-bold tabular-nums">
                약 {cumulativeCpi}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  % 상승
                </span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                {CPI_RATE[0].year}~{latestCpi.year}년 소비자물가 상승률 합계
              </p>
            </div>
            <div className="border border-border rounded-lg bg-card p-4 sm:p-5">
              <p className="text-xs text-muted-foreground mb-1">
                {CPI_RATE[0].year}~{latestCpi.year}년 최고 물가 상승률
              </p>
              <p className="text-2xl font-bold tabular-nums text-destructive">
                5.1
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  % (2022년)
                </span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                글로벌 인플레이션 영향, {CPI_RATE.length}년간 최고치
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================
            Navigation back
        ================================================================ */}
        <div className="mb-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            물가 인플레이션 홈으로
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
