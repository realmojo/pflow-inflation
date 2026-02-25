// =============================================================================
// 한국 주요 경제지표 정적 데이터
// 출처: 고용노동부, 통계청, 한국은행
// =============================================================================

// 최저임금 (시간당, 원) — 고용노동부 고시
export const MINIMUM_WAGE = [
  { year: 2000, hourly: 1600 },
  { year: 2001, hourly: 1865 },
  { year: 2002, hourly: 2100 },
  { year: 2003, hourly: 2275 },
  { year: 2004, hourly: 2510 },
  { year: 2005, hourly: 2840 },
  { year: 2006, hourly: 3100 },
  { year: 2007, hourly: 3480 },
  { year: 2008, hourly: 3770 },
  { year: 2009, hourly: 4000 },
  { year: 2010, hourly: 4110 },
  { year: 2011, hourly: 4320 },
  { year: 2012, hourly: 4580 },
  { year: 2013, hourly: 4860 },
  { year: 2014, hourly: 5210 },
  { year: 2015, hourly: 5580 },
  { year: 2016, hourly: 6030 },
  { year: 2017, hourly: 6470 },
  { year: 2018, hourly: 7530 },
  { year: 2019, hourly: 8350 },
  { year: 2020, hourly: 8590 },
  { year: 2021, hourly: 8720 },
  { year: 2022, hourly: 9160 },
  { year: 2023, hourly: 9620 },
  { year: 2024, hourly: 9860 },
  { year: 2025, hourly: 10030 },
  { year: 2026, hourly: 10320 },
] as const;

// 소비자물가 상승률 (전년대비, %) — 통계청
export const CPI_RATE = [
  { year: 2000, rate: 2.3 },
  { year: 2001, rate: 4.1 },
  { year: 2002, rate: 2.8 },
  { year: 2003, rate: 3.5 },
  { year: 2004, rate: 3.6 },
  { year: 2005, rate: 2.8 },
  { year: 2006, rate: 2.2 },
  { year: 2007, rate: 2.5 },
  { year: 2008, rate: 4.7 },
  { year: 2009, rate: 2.8 },
  { year: 2010, rate: 2.9 },
  { year: 2011, rate: 4.0 },
  { year: 2012, rate: 2.2 },
  { year: 2013, rate: 1.3 },
  { year: 2014, rate: 1.3 },
  { year: 2015, rate: 0.7 },
  { year: 2016, rate: 1.0 },
  { year: 2017, rate: 1.9 },
  { year: 2018, rate: 1.5 },
  { year: 2019, rate: 0.4 },
  { year: 2020, rate: 0.5 },
  { year: 2021, rate: 2.5 },
  { year: 2022, rate: 5.1 },
  { year: 2023, rate: 3.6 },
  { year: 2024, rate: 2.3 },
] as const;

// GDP 성장률 (%) — 한국은행
export const GDP_GROWTH = [
  { year: 2000, rate: 9.1 },
  { year: 2001, rate: 4.5 },
  { year: 2002, rate: 7.4 },
  { year: 2003, rate: 2.9 },
  { year: 2004, rate: 4.9 },
  { year: 2005, rate: 3.9 },
  { year: 2006, rate: 5.2 },
  { year: 2007, rate: 5.5 },
  { year: 2008, rate: 2.8 },
  { year: 2009, rate: 0.8 },
  { year: 2010, rate: 6.8 },
  { year: 2011, rate: 3.7 },
  { year: 2012, rate: 2.4 },
  { year: 2013, rate: 3.2 },
  { year: 2014, rate: 3.2 },
  { year: 2015, rate: 2.8 },
  { year: 2016, rate: 2.9 },
  { year: 2017, rate: 3.2 },
  { year: 2018, rate: 2.9 },
  { year: 2019, rate: 2.2 },
  { year: 2020, rate: -0.7 },
  { year: 2021, rate: 4.3 },
  { year: 2022, rate: 2.6 },
  { year: 2023, rate: 1.4 },
  { year: 2024, rate: 2.0 },
] as const;

// 고용률 / 실업률 (%, 15세 이상) — 통계청 경제활동인구조사
export const EMPLOYMENT = [
  { year: 2000, employment: 58.5, unemployment: 4.4 },
  { year: 2001, employment: 59.0, unemployment: 4.0 },
  { year: 2002, employment: 60.0, unemployment: 3.3 },
  { year: 2003, employment: 59.3, unemployment: 3.6 },
  { year: 2004, employment: 59.8, unemployment: 3.7 },
  { year: 2005, employment: 59.7, unemployment: 3.7 },
  { year: 2006, employment: 59.7, unemployment: 3.5 },
  { year: 2007, employment: 59.8, unemployment: 3.2 },
  { year: 2008, employment: 59.5, unemployment: 3.2 },
  { year: 2009, employment: 58.6, unemployment: 3.6 },
  { year: 2010, employment: 58.7, unemployment: 3.7 },
  { year: 2011, employment: 59.1, unemployment: 3.4 },
  { year: 2012, employment: 59.4, unemployment: 3.2 },
  { year: 2013, employment: 59.5, unemployment: 3.1 },
  { year: 2014, employment: 60.2, unemployment: 3.5 },
  { year: 2015, employment: 60.3, unemployment: 3.6 },
  { year: 2016, employment: 60.4, unemployment: 3.7 },
  { year: 2017, employment: 60.8, unemployment: 3.7 },
  { year: 2018, employment: 60.7, unemployment: 3.8 },
  { year: 2019, employment: 60.9, unemployment: 3.8 },
  { year: 2020, employment: 60.1, unemployment: 4.0 },
  { year: 2021, employment: 60.5, unemployment: 3.7 },
  { year: 2022, employment: 62.1, unemployment: 2.9 },
  { year: 2023, employment: 62.6, unemployment: 2.7 },
  { year: 2024, employment: 63.0, unemployment: 2.8 },
] as const;

// 월평균 임금 (만원) — 고용노동부 고용형태별근로실태조사
export const AVG_MONTHLY_WAGE = [
  { year: 2000, wage: 153 },
  { year: 2001, wage: 163 },
  { year: 2002, wage: 177 },
  { year: 2003, wage: 189 },
  { year: 2004, wage: 198 },
  { year: 2005, wage: 209 },
  { year: 2006, wage: 219 },
  { year: 2007, wage: 230 },
  { year: 2008, wage: 238 },
  { year: 2009, wage: 240 },
  { year: 2010, wage: 252 },
  { year: 2011, wage: 264 },
  { year: 2012, wage: 273 },
  { year: 2013, wage: 280 },
  { year: 2014, wage: 289 },
  { year: 2015, wage: 297 },
  { year: 2016, wage: 304 },
  { year: 2017, wage: 311 },
  { year: 2018, wage: 320 },
  { year: 2019, wage: 326 },
  { year: 2020, wage: 333 },
  { year: 2021, wage: 340 },
  { year: 2022, wage: 353 },
  { year: 2023, wage: 369 },
  { year: 2024, wage: 382 },
] as const;

// 지역별 소비자물가지수 (2020=100, 2024년) — 통계청 소비자물가조사
export const REGIONAL_CPI = [
  { region: "서울", index: 114.8, rate: 2.4 },
  { region: "부산", index: 113.5, rate: 2.1 },
  { region: "대구", index: 114.2, rate: 2.5 },
  { region: "인천", index: 114.0, rate: 2.2 },
  { region: "광주", index: 114.6, rate: 2.6 },
  { region: "대전", index: 113.1, rate: 2.1 },
  { region: "울산", index: 112.5, rate: 1.9 },
  { region: "세종", index: 114.3, rate: 2.3 },
  { region: "경기", index: 114.1, rate: 2.3 },
  { region: "강원", index: 114.5, rate: 2.5 },
  { region: "충북", index: 113.8, rate: 2.2 },
  { region: "충남", index: 113.2, rate: 2.1 },
  { region: "전북", index: 114.4, rate: 2.4 },
  { region: "전남", index: 113.9, rate: 2.3 },
  { region: "경북", index: 113.6, rate: 2.2 },
  { region: "경남", index: 113.0, rate: 2.0 },
  { region: "제주", index: 116.2, rate: 2.7 },
] as const;

// COICOP 분류 기반 지역별 소비자물가지수 카테고리 — 통계청 소비자물가조사
export const REGIONAL_CPI_CATEGORIES = [
  { id: "overall", label: "총지수", labelShort: "총지수" },
  { id: "food", label: "식료품·비주류음료", labelShort: "식료품" },
  { id: "alcohol", label: "주류·담배", labelShort: "주류·담배" },
  { id: "clothing", label: "의류·신발", labelShort: "의류" },
  { id: "housing", label: "주거·수도·광열", labelShort: "주거" },
  { id: "household", label: "가정용품·가사서비스", labelShort: "가정용품" },
  { id: "health", label: "보건", labelShort: "보건" },
  { id: "transport", label: "교통", labelShort: "교통" },
  { id: "communication", label: "통신", labelShort: "통신" },
  { id: "recreation", label: "오락·문화", labelShort: "오락·문화" },
  { id: "education", label: "교육", labelShort: "교육" },
  { id: "restaurant", label: "음식·숙박", labelShort: "음식·숙박" },
] as const;

export type RegionalCpiCategoryId =
  (typeof REGIONAL_CPI_CATEGORIES)[number]["id"];

// 지역별 카테고리별 소비자물가지수 (2020=100, 2024년) — 통계청 소비자물가조사
export const REGIONAL_CPI_BY_CATEGORY: Record<
  RegionalCpiCategoryId,
  Array<{ region: string; index: number; rate: number }>
> = {
  overall: [
    { region: "서울", index: 114.8, rate: 2.4 },
    { region: "부산", index: 113.5, rate: 2.1 },
    { region: "대구", index: 114.2, rate: 2.5 },
    { region: "인천", index: 114.0, rate: 2.2 },
    { region: "광주", index: 114.6, rate: 2.6 },
    { region: "대전", index: 113.1, rate: 2.1 },
    { region: "울산", index: 112.5, rate: 1.9 },
    { region: "세종", index: 114.3, rate: 2.3 },
    { region: "경기", index: 114.1, rate: 2.3 },
    { region: "강원", index: 114.5, rate: 2.5 },
    { region: "충북", index: 113.8, rate: 2.2 },
    { region: "충남", index: 113.2, rate: 2.1 },
    { region: "전북", index: 114.4, rate: 2.4 },
    { region: "전남", index: 113.9, rate: 2.3 },
    { region: "경북", index: 113.6, rate: 2.2 },
    { region: "경남", index: 113.0, rate: 2.0 },
    { region: "제주", index: 116.2, rate: 2.7 },
  ],
  food: [
    { region: "서울", index: 121.3, rate: 3.1 },
    { region: "부산", index: 119.8, rate: 2.8 },
    { region: "대구", index: 120.5, rate: 3.0 },
    { region: "인천", index: 120.2, rate: 2.9 },
    { region: "광주", index: 121.8, rate: 3.3 },
    { region: "대전", index: 119.5, rate: 2.7 },
    { region: "울산", index: 118.9, rate: 2.5 },
    { region: "세종", index: 120.8, rate: 3.0 },
    { region: "경기", index: 120.6, rate: 2.9 },
    { region: "강원", index: 121.5, rate: 3.2 },
    { region: "충북", index: 120.1, rate: 2.8 },
    { region: "충남", index: 119.7, rate: 2.7 },
    { region: "전북", index: 121.0, rate: 3.1 },
    { region: "전남", index: 120.4, rate: 2.9 },
    { region: "경북", index: 119.9, rate: 2.8 },
    { region: "경남", index: 119.3, rate: 2.6 },
    { region: "제주", index: 123.5, rate: 3.8 },
  ],
  alcohol: [
    { region: "서울", index: 110.2, rate: 1.8 },
    { region: "부산", index: 109.8, rate: 1.6 },
    { region: "대구", index: 110.0, rate: 1.7 },
    { region: "인천", index: 109.9, rate: 1.7 },
    { region: "광주", index: 110.3, rate: 1.8 },
    { region: "대전", index: 109.6, rate: 1.5 },
    { region: "울산", index: 109.4, rate: 1.4 },
    { region: "세종", index: 110.1, rate: 1.7 },
    { region: "경기", index: 110.0, rate: 1.7 },
    { region: "강원", index: 110.4, rate: 1.9 },
    { region: "충북", index: 109.7, rate: 1.6 },
    { region: "충남", index: 109.5, rate: 1.5 },
    { region: "전북", index: 110.2, rate: 1.8 },
    { region: "전남", index: 109.8, rate: 1.6 },
    { region: "경북", index: 109.6, rate: 1.5 },
    { region: "경남", index: 109.3, rate: 1.4 },
    { region: "제주", index: 111.0, rate: 2.1 },
  ],
  clothing: [
    { region: "서울", index: 112.5, rate: 2.0 },
    { region: "부산", index: 111.3, rate: 1.7 },
    { region: "대구", index: 112.0, rate: 1.9 },
    { region: "인천", index: 111.8, rate: 1.8 },
    { region: "광주", index: 112.2, rate: 2.0 },
    { region: "대전", index: 111.0, rate: 1.6 },
    { region: "울산", index: 110.6, rate: 1.4 },
    { region: "세종", index: 111.9, rate: 1.8 },
    { region: "경기", index: 112.1, rate: 1.9 },
    { region: "강원", index: 112.4, rate: 2.1 },
    { region: "충북", index: 111.5, rate: 1.7 },
    { region: "충남", index: 111.2, rate: 1.6 },
    { region: "전북", index: 112.0, rate: 1.9 },
    { region: "전남", index: 111.6, rate: 1.7 },
    { region: "경북", index: 111.4, rate: 1.7 },
    { region: "경남", index: 110.8, rate: 1.5 },
    { region: "제주", index: 113.2, rate: 2.3 },
  ],
  housing: [
    { region: "서울", index: 116.5, rate: 3.2 },
    { region: "부산", index: 113.8, rate: 2.4 },
    { region: "대구", index: 114.5, rate: 2.6 },
    { region: "인천", index: 115.2, rate: 2.8 },
    { region: "광주", index: 114.8, rate: 2.7 },
    { region: "대전", index: 113.3, rate: 2.2 },
    { region: "울산", index: 112.7, rate: 2.0 },
    { region: "세종", index: 117.2, rate: 3.5 },
    { region: "경기", index: 115.8, rate: 3.0 },
    { region: "강원", index: 114.2, rate: 2.5 },
    { region: "충북", index: 113.6, rate: 2.3 },
    { region: "충남", index: 113.0, rate: 2.1 },
    { region: "전북", index: 113.9, rate: 2.4 },
    { region: "전남", index: 113.4, rate: 2.2 },
    { region: "경북", index: 113.1, rate: 2.1 },
    { region: "경남", index: 112.5, rate: 1.9 },
    { region: "제주", index: 118.0, rate: 3.8 },
  ],
  household: [
    { region: "서울", index: 113.2, rate: 2.1 },
    { region: "부산", index: 112.0, rate: 1.8 },
    { region: "대구", index: 112.6, rate: 2.0 },
    { region: "인천", index: 112.4, rate: 1.9 },
    { region: "광주", index: 113.0, rate: 2.1 },
    { region: "대전", index: 111.8, rate: 1.7 },
    { region: "울산", index: 111.3, rate: 1.5 },
    { region: "세종", index: 112.7, rate: 2.0 },
    { region: "경기", index: 112.8, rate: 2.0 },
    { region: "강원", index: 113.1, rate: 2.1 },
    { region: "충북", index: 112.2, rate: 1.8 },
    { region: "충남", index: 111.9, rate: 1.7 },
    { region: "전북", index: 112.9, rate: 2.0 },
    { region: "전남", index: 112.3, rate: 1.9 },
    { region: "경북", index: 112.1, rate: 1.8 },
    { region: "경남", index: 111.5, rate: 1.6 },
    { region: "제주", index: 114.0, rate: 2.4 },
  ],
  health: [
    { region: "서울", index: 108.5, rate: 1.2 },
    { region: "부산", index: 108.0, rate: 1.0 },
    { region: "대구", index: 108.3, rate: 1.1 },
    { region: "인천", index: 108.2, rate: 1.1 },
    { region: "광주", index: 108.6, rate: 1.2 },
    { region: "대전", index: 107.8, rate: 0.9 },
    { region: "울산", index: 107.5, rate: 0.8 },
    { region: "세종", index: 108.4, rate: 1.1 },
    { region: "경기", index: 108.3, rate: 1.1 },
    { region: "강원", index: 108.7, rate: 1.3 },
    { region: "충북", index: 108.1, rate: 1.0 },
    { region: "충남", index: 107.9, rate: 1.0 },
    { region: "전북", index: 108.5, rate: 1.2 },
    { region: "전남", index: 108.2, rate: 1.1 },
    { region: "경북", index: 108.0, rate: 1.0 },
    { region: "경남", index: 107.6, rate: 0.9 },
    { region: "제주", index: 109.2, rate: 1.5 },
  ],
  transport: [
    { region: "서울", index: 117.2, rate: 2.8 },
    { region: "부산", index: 116.0, rate: 2.5 },
    { region: "대구", index: 116.8, rate: 2.7 },
    { region: "인천", index: 116.5, rate: 2.6 },
    { region: "광주", index: 117.0, rate: 2.8 },
    { region: "대전", index: 115.8, rate: 2.4 },
    { region: "울산", index: 115.2, rate: 2.2 },
    { region: "세종", index: 116.9, rate: 2.7 },
    { region: "경기", index: 116.7, rate: 2.6 },
    { region: "강원", index: 117.5, rate: 2.9 },
    { region: "충북", index: 116.2, rate: 2.5 },
    { region: "충남", index: 115.9, rate: 2.4 },
    { region: "전북", index: 117.1, rate: 2.8 },
    { region: "전남", index: 116.4, rate: 2.6 },
    { region: "경북", index: 116.1, rate: 2.5 },
    { region: "경남", index: 115.5, rate: 2.3 },
    { region: "제주", index: 118.8, rate: 3.2 },
  ],
  communication: [
    { region: "서울", index: 102.1, rate: 0.3 },
    { region: "부산", index: 102.0, rate: 0.3 },
    { region: "대구", index: 102.1, rate: 0.3 },
    { region: "인천", index: 102.0, rate: 0.3 },
    { region: "광주", index: 102.1, rate: 0.3 },
    { region: "대전", index: 102.0, rate: 0.2 },
    { region: "울산", index: 101.9, rate: 0.2 },
    { region: "세종", index: 102.1, rate: 0.3 },
    { region: "경기", index: 102.0, rate: 0.3 },
    { region: "강원", index: 102.2, rate: 0.3 },
    { region: "충북", index: 102.0, rate: 0.3 },
    { region: "충남", index: 102.0, rate: 0.2 },
    { region: "전북", index: 102.1, rate: 0.3 },
    { region: "전남", index: 102.0, rate: 0.3 },
    { region: "경북", index: 102.0, rate: 0.3 },
    { region: "경남", index: 101.9, rate: 0.2 },
    { region: "제주", index: 102.3, rate: 0.4 },
  ],
  recreation: [
    { region: "서울", index: 113.5, rate: 2.2 },
    { region: "부산", index: 112.2, rate: 1.9 },
    { region: "대구", index: 112.8, rate: 2.1 },
    { region: "인천", index: 112.6, rate: 2.0 },
    { region: "광주", index: 113.3, rate: 2.2 },
    { region: "대전", index: 112.0, rate: 1.8 },
    { region: "울산", index: 111.5, rate: 1.6 },
    { region: "세종", index: 112.9, rate: 2.1 },
    { region: "경기", index: 113.0, rate: 2.1 },
    { region: "강원", index: 113.8, rate: 2.4 },
    { region: "충북", index: 112.4, rate: 1.9 },
    { region: "충남", index: 112.1, rate: 1.8 },
    { region: "전북", index: 113.2, rate: 2.2 },
    { region: "전남", index: 112.5, rate: 2.0 },
    { region: "경북", index: 112.3, rate: 1.9 },
    { region: "경남", index: 111.8, rate: 1.7 },
    { region: "제주", index: 115.0, rate: 2.8 },
  ],
  education: [
    { region: "서울", index: 115.0, rate: 2.5 },
    { region: "부산", index: 113.2, rate: 2.0 },
    { region: "대구", index: 114.0, rate: 2.3 },
    { region: "인천", index: 113.8, rate: 2.2 },
    { region: "광주", index: 114.5, rate: 2.4 },
    { region: "대전", index: 113.0, rate: 1.9 },
    { region: "울산", index: 112.5, rate: 1.7 },
    { region: "세종", index: 114.2, rate: 2.3 },
    { region: "경기", index: 114.6, rate: 2.4 },
    { region: "강원", index: 113.5, rate: 2.1 },
    { region: "충북", index: 113.3, rate: 2.0 },
    { region: "충남", index: 112.8, rate: 1.8 },
    { region: "전북", index: 114.1, rate: 2.3 },
    { region: "전남", index: 113.4, rate: 2.0 },
    { region: "경북", index: 113.1, rate: 1.9 },
    { region: "경남", index: 112.3, rate: 1.7 },
    { region: "제주", index: 115.8, rate: 2.8 },
  ],
  restaurant: [
    { region: "서울", index: 118.5, rate: 3.0 },
    { region: "부산", index: 117.0, rate: 2.6 },
    { region: "대구", index: 117.8, rate: 2.8 },
    { region: "인천", index: 117.5, rate: 2.7 },
    { region: "광주", index: 118.2, rate: 2.9 },
    { region: "대전", index: 116.8, rate: 2.5 },
    { region: "울산", index: 116.2, rate: 2.3 },
    { region: "세종", index: 117.9, rate: 2.8 },
    { region: "경기", index: 117.7, rate: 2.7 },
    { region: "강원", index: 118.6, rate: 3.1 },
    { region: "충북", index: 117.2, rate: 2.6 },
    { region: "충남", index: 116.9, rate: 2.5 },
    { region: "전북", index: 118.3, rate: 3.0 },
    { region: "전남", index: 117.3, rate: 2.6 },
    { region: "경북", index: 117.1, rate: 2.6 },
    { region: "경남", index: 116.5, rate: 2.4 },
    { region: "제주", index: 120.2, rate: 3.5 },
  ],
};

/** 특정 카테고리의 지역별 최고/최저/평균 */
export function getRegionalCpiExtremes(categoryId: RegionalCpiCategoryId) {
  const data = REGIONAL_CPI_BY_CATEGORY[categoryId];
  const sorted = [...data].sort((a, b) => b.index - a.index);
  return {
    highest: sorted[0],
    lowest: sorted[sorted.length - 1],
    average: +(data.reduce((s, d) => s + d.index, 0) / data.length).toFixed(1),
    rateAverage: +(
      data.reduce((s, d) => s + d.rate, 0) / data.length
    ).toFixed(1),
  };
}

// =============================================================================
// 헬퍼 함수
// =============================================================================

/** 해당 품목을 사려면 최저임금 몇 분이 필요한지 */
export function getMinuteEquivalent(price: number, year?: number): number {
  const entry = year
    ? MINIMUM_WAGE.find((w) => w.year === year)
    : MINIMUM_WAGE[MINIMUM_WAGE.length - 1];
  if (!entry || price <= 0) return 0;
  return Math.round((price / entry.hourly) * 60);
}

/** 해당 연도 월급으로 해당 품목을 몇 개 살 수 있는지 */
export function getMonthlyPurchaseCount(price: number, year: number): number {
  const entry = AVG_MONTHLY_WAGE.find((w) => w.year === year);
  if (!entry || price <= 0) return 0;
  return Math.floor((entry.wage * 10000) / price);
}

/** 해당 연도의 최저임금 월급 (209시간 기준) */
export function getMonthlyMinimumWage(year: number): number {
  const entry = MINIMUM_WAGE.find((w) => w.year === year);
  if (!entry) return 0;
  return entry.hourly * 209;
}

/** 최신 연도 데이터 가져오기 */
export function getLatest<T extends { year: number }>(data: readonly T[]): T {
  return data[data.length - 1];
}
