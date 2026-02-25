import { CATEGORIES, CATEGORY_LIST } from "@/lib/inflation-items";
import { toSlug } from "@/lib/slug";

const itemHref = (cat: string, itemName: string) =>
  `/${encodeURIComponent(toSlug(cat))}/${encodeURIComponent(toSlug(itemName))}`;

export default function Footer() {
  const popularCategories = CATEGORY_LIST.slice(0, 8);

  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="inline-block">
              <h2 className="text-base font-bold tracking-tight text-foreground">
                대한민국 물가 인플레이션
              </h2>
            </a>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-xs">
              통계청 KOSIS 생활물가지수(2020=100) 기반
              151개 품목의 장기 물가 변화를 한눈에 확인하세요.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              카테고리
            </h3>
            <ul className="space-y-1.5">
              {popularCategories.map((cat) => (
                <li key={cat}>
                  <a
                    href={itemHref(cat, CATEGORIES[cat][0])}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More categories */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              더보기
            </h3>
            <ul className="space-y-1.5">
              {CATEGORY_LIST.slice(8).map((cat) => (
                <li key={cat}>
                  <a
                    href={itemHref(cat, CATEGORIES[cat][0])}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              정보
            </h3>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://kosis.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  통계청 KOSIS
                </a>
              </li>
              <li>
                <a
                  href="https://pflow.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  pflow.app
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                본 사이트의 데이터는 통계청 KOSIS
                생활물가지수를 기반으로 하며,
                추정 가격은 참고용입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} 대한민국 물가 인플레이션. 출처: 통계청 KOSIS 생활물가지수 (2020=100)
          </p>
          <a
            href="https://pflow.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Made by pflow
          </a>
        </div>
      </div>
    </footer>
  );
}
