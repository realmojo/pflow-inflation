import { redirect } from "next/navigation";
import { CATEGORIES } from "@/lib/inflation-items";
import { toSlug, fromSlug } from "@/lib/slug";

export const runtime = "edge";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = fromSlug(decodeURIComponent(categorySlug));
  const firstName = CATEGORIES[category]?.[0];
  if (!firstName) redirect("/");
  redirect(`/${categorySlug}/${encodeURIComponent(toSlug(firstName))}`);
}
