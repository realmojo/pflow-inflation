# Startlog 아키텍처 계획

## 페이지 구조 (Next.js App Router)
```
app/
  layout.tsx              - 루트 레이아웃 (헤더/푸터 포함)
  page.tsx                - 메인 피드 (소셜 피드, Reddit 스타일)
  products/
    page.tsx              - 프로덕트 목록
    new/
      page.tsx            - 프로덕트 등록 폼
    [id]/
      page.tsx            - 프로덕트 상세
  api/
    posts/
      route.ts            - 피드 포스트 CRUD
    products/
      route.ts            - 프로덕트 CRUD
    products/[id]/
      route.ts            - 프로덕트 단건 조회/수정/삭제
    votes/
      route.ts            - 투표(upvote) 처리
```

## 컴포넌트 구조
```
components/
  ui/                     - shadcn 컴포넌트 (기존)
  layout/
    header.tsx            - 글로벌 헤더 (로고, 네비, 등록 버튼)
    footer.tsx            - 글로벌 푸터
  feed/
    post-card.tsx         - 소셜 피드 포스트 카드
    post-list.tsx         - 포스트 목록
    post-form.tsx         - 포스트 작성 폼
  products/
    product-card.tsx      - 프로덕트 카드 (썸네일, 이름, 설명, 투표수)
    product-list.tsx      - 프로덕트 목록
    product-form.tsx      - 프로덕트 등록 폼
    product-detail.tsx    - 프로덕트 상세
    vote-button.tsx       - 투표 버튼
```

## Supabase 스키마 계획
```sql
-- 포스트 (소셜 피드)
posts (
  id uuid primary key,
  title text not null,
  content text,
  author_name text,
  created_at timestamptz,
  updated_at timestamptz,
  upvotes int default 0
)

-- 프로덕트
products (
  id uuid primary key,
  name text not null,
  tagline text not null,     -- 한 줄 소개
  description text,
  url text not null,
  logo_url text,
  thumbnail_url text,
  category text,
  maker_name text,
  created_at timestamptz,
  upvotes int default 0,
  is_featured boolean default false
)

-- 투표 (중복 방지용)
votes (
  id uuid primary key,
  product_id uuid references products(id),
  voter_ip text,             -- 인증 없는 경우 IP 기반
  created_at timestamptz
)
```

## 구현 우선순위
1. Phase 1: 정적 UI (Supabase 없이 mock data)
2. Phase 2: Supabase 연동 (실제 DB)
3. Phase 3: 투표 기능, 인증 (옵션)
