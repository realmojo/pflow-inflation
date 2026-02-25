import type { Metadata } from "next";
import StatisticsClient from "./StatisticsClient";

export const runtime = "edge";

const SITE_URL = "https://inflation.pflow.app";

export const metadata: Metadata = {
  title: "한국 경제지표 대시보드 - 물가·임금·GDP·고용",
  description:
    "소비자물가 상승률, 최저임금 변화, GDP 성장률, 고용률·실업률, 월평균 임금 등 한국 주요 경제지표의 장기 추이를 차트와 함께 한눈에 확인하세요. 통계청·고용노동부·한국은행 공식 데이터 기반.",
  alternates: {
    canonical: `${SITE_URL}/statistics`,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: `${SITE_URL}/statistics`,
    siteName: "대한민국 물가 인플레이션",
    title: "한국 경제지표 대시보드 | 대한민국 물가 인플레이션",
    description:
      "소비자물가 상승률, 최저임금, GDP 성장률, 고용률 등 주요 경제지표의 장기 추이를 차트로 확인하세요.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "한국 경제지표 대시보드 - 대한민국 물가 인플레이션",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "한국 경제지표 대시보드 | 대한민국 물가 인플레이션",
    description:
      "소비자물가, 최저임금, GDP, 고용률 등 주요 경제지표 추이를 한눈에 확인하세요.",
    images: ["/og.png"],
  },
};

export default function StatisticsPage() {
  return <StatisticsClient />;
}
