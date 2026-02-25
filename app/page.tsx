import { redirect } from "next/navigation";
import { CATEGORY_LIST, CATEGORIES } from "@/lib/inflation-items";
import { toSlug } from "@/lib/slug";

export default function Home() {
  const firstCategory = CATEGORY_LIST[0];
  const firstName = CATEGORIES[firstCategory][0];
  redirect(`/${encodeURIComponent(toSlug(firstCategory))}/${encodeURIComponent(toSlug(firstName))}`);
}
