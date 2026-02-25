import type { Metadata } from "next";
import { INFLATION_ITEMS, CATEGORIES } from "@/lib/inflation-items";
import { fromSlug, toSlug } from "@/lib/slug";
import ItemPageClient from "./ItemPageClient";

const SITE_URL = "https://inflation.pflow.app";

type Props = {
  params: Promise<{ category: string; name: string }>;
};

export async function generateStaticParams() {
  return INFLATION_ITEMS.map((item) => ({
    category: toSlug(item.category),
    name: toSlug(item.name),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, name: nameSlug } = await params;
  const category = fromSlug(decodeURIComponent(categorySlug));
  const name = fromSlug(decodeURIComponent(nameSlug));

  const item = INFLATION_ITEMS.find((i) => i.name === name);
  const categoryItems = CATEGORIES[category] ?? [];

  const title = `${name} 물가 추이`;
  const description = item
    ? `${name}의 장기 물가 변화를 확인하세요. 통계청 KOSIS 생활물가지수(2020=100) 기반 ${name}의 인플레이션 추이 데이터. ${category} 카테고리의 ${categoryItems.length}개 품목 비교 가능.`
    : `${name} 물가 추이 — 통계청 KOSIS 생활물가지수(2020=100)`;

  const canonicalUrl = `${SITE_URL}/${toSlug(category)}/${toSlug(name)}`;

  return {
    title,
    description,
    keywords: [name, category, "물가 추이", "인플레이션", "생활물가지수", "KOSIS", "통계청"],
    openGraph: {
      title: `${title} | 대한민국 물가 인플레이션`,
      description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      title: `${title} | 대한민국 물가 인플레이션`,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function ItemPage() {
  return <ItemPageClient />;
}
