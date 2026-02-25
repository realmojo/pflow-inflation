import type { Metadata } from "next";
import ItemPageClient from "./ItemPageClient";
import { INFLATION_ITEMS } from "@/lib/inflation-items";
import { fromSlug, toSlug } from "@/lib/slug";

export const runtime = "edge";

const SITE_URL = "https://inflation.pflow.app";

type Props = {
  params: Promise<{ category: string; name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, name: nameSlug } = await params;
  const category = fromSlug(decodeURIComponent(categorySlug));
  const name = fromSlug(decodeURIComponent(nameSlug));

  const item = INFLATION_ITEMS.find(
    (i) => i.name === name && i.category === category,
  );

  if (!item) {
    return {
      title: "품목을 찾을 수 없습니다",
    };
  }

  const isAggregate = item.category === "종합지수";
  const canonicalUrl = `${SITE_URL}/${toSlug(category)}/${toSlug(name)}`;

  const title = `${name} 물가 추이 - ${category}`;
  const description = isAggregate
    ? `${name} 장기 추이를 확인하세요. 통계청 KOSIS 생활물가지수(2020=100) 기반 데이터로 한국 물가 인플레이션 변화를 분석합니다.`
    : `${name} 가격 변화와 물가지수 추이를 확인하세요. 통계청 KOSIS 생활물가지수(2020=100) 기반 장기 데이터, 최저임금 환산, 월급 구매력 비교까지 제공합니다.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: canonicalUrl,
      siteName: "대한민국 물가 인플레이션",
      title: `${name} 물가 추이 | 대한민국 물가 인플레이션`,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${name} 물가 추이 - 대한민국 물가 인플레이션`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} 물가 추이 | 대한민국 물가 인플레이션`,
      description,
      images: ["/og.png"],
    },
  };
}

export default function ItemPage() {
  return <ItemPageClient />;
}
