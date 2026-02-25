import type { Metadata } from "next";
import RegionalClient from "./RegionalClient";

export const runtime = "edge";

const SITE_URL = "https://inflation.pflow.app";

export const metadata: Metadata = {
  title: "지역별 소비자물가지수 - 카테고리별 비교",
  description:
    "17개 시·도별 소비자물가지수를 식료품, 교통, 교육, 주거 등 12개 카테고리별로 비교합니다. 통계청 소비자물가조사(2020=100) 기반 지역별 물가 차이를 한눈에 확인하세요.",
  alternates: { canonical: `${SITE_URL}/regional` },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: `${SITE_URL}/regional`,
    siteName: "대한민국 물가 인플레이션",
    title: "지역별 소비자물가지수 카테고리별 비교 | 대한민국 물가 인플레이션",
    description:
      "17개 시·도별 소비자물가지수를 12개 카테고리별로 비교합니다.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "지역별 소비자물가지수 카테고리별 비교",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "지역별 소비자물가지수 카테고리별 비교 | 대한민국 물가 인플레이션",
    description:
      "17개 시·도별 소비자물가지수를 12개 카테고리별로 비교합니다.",
    images: ["/og.png"],
  },
};

export default function RegionalPage() {
  return <RegionalClient />;
}
