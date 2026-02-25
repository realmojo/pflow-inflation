# pflow-inflation Project - Agent Memory

## 프로젝트 개요

- 프로젝트명: pflow-inflation (웹사이트 등록 및 발견 서비스, Product Hunt / Reddit 스타일)
- 위치: /Users/gshs/Desktop/m/pflow-inflation
- 초기 대화 날짜: 2026-02-23

## 기술 스택 (확인됨)

- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript
- Tailwind CSS v4
- shadcn/ui (radix-mira 스타일, components.json 설정됨)
- lucide-react (아이콘)
- Supabase 미설치 (의존성에 없음 - 추후 추가 필요)

## 설치된 shadcn/ui 컴포넌트

alert-dialog, badge, button, card, combobox, dropdown-menu, field, input-group, input, label, select, separator, textarea

## 핵심 파일 위치

- app/layout.tsx - 루트 레이아웃 (Inter 폰트 사용)
- app/globals.css - Tailwind v4 설정, CSS 변수 기반 테마
- app/page.tsx - 현재 ComponentExample 렌더링 (교체 필요)
- components/ui/ - shadcn 컴포넌트들
- lib/utils.ts - cn() 유틸리티

## 컬러 테마 (globals.css 확인)

- primary: oklch(0.60 0.13 163) - 초록 계열 (mint/teal)
- 배경/포그라운드는 무채색 (흑백 그레이)
- 요청: 버튼 등 클릭 가능 요소는 primary 컬러, 전체는 무채색

## 계획된 아키텍처

- 자세한 내용은 architecture.md 참고

## 주요 의존성 추가 예정

- @supabase/supabase-js - DB/인증
- @supabase/ssr - Next.js SSR 지원
