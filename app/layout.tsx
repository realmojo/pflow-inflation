import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://inflation.pflow.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "대한민국 물가 인플레이션 | 151개 품목 장기 물가지수",
    template: "%s | 대한민국 물가 인플레이션",
  },
  description:
    "통계청 KOSIS 생활물가지수(2020=100) 기반 151개 품목의 장기 물가 변화를 한눈에 확인하세요. 외식·식재료·의류·교통·교육 등 다양한 품목의 인플레이션 추이를 분석합니다.",
  keywords: [
    "물가 인플레이션",
    "생활물가지수",
    "KOSIS",
    "통계청",
    "물가 추이",
    "인플레이션 추적",
    "소비자물가",
    "외식 물가",
    "식재료 가격",
  ],
  authors: [{ name: "pflow.app" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "대한민국 물가 인플레이션",
    title: "대한민국 물가 인플레이션 | 151개 품목 장기 물가지수",
    description:
      "통계청 KOSIS 생활물가지수(2020=100) 기반 151개 품목의 장기 물가 변화를 한눈에 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "대한민국 물가 인플레이션",
    description:
      "통계청 KOSIS 생활물가지수(2020=100) 기반 151개 품목의 장기 물가 변화를 한눈에 확인하세요.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "대한민국 물가 인플레이션",
  url: SITE_URL,
  description:
    "통계청 KOSIS 생활물가지수(2020=100) 기반 151개 품목의 장기 물가 변화를 한눈에 확인하세요.",
  inLanguage: "ko",
  publisher: {
    "@type": "Organization",
    name: "pflow.app",
    url: "https://pflow.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
