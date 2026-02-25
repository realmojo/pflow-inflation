// KOSIS 생활물가지수(2020=100) - DT_1J22005
// basePrice2020: 2020년 기준 평균 시중 가격 (원)

export const INFLATION_ITEMS = [
  // ── 한식 외식 ──────────────────────────────────────────
  { name: "자장면",              code: "110K01119", basePrice2020: 5000,    category: "한식 외식" },
  { name: "짬뽕",               code: "110K01120", basePrice2020: 7000,    category: "한식 외식" },
  { name: "냉면",               code: "110K01114", basePrice2020: 9000,    category: "한식 외식" },
  { name: "칼국수",             code: "110K01115", basePrice2020: 7000,    category: "한식 외식" },
  { name: "김치찌개 백반",      code: "110K01101", basePrice2020: 7000,    category: "한식 외식" },
  { name: "된장찌개 백반",      code: "110K01102", basePrice2020: 7000,    category: "한식 외식" },
  { name: "비빔밥",             code: "110K01103", basePrice2020: 8000,    category: "한식 외식" },
  { name: "해장국",             code: "110K01108", basePrice2020: 7000,    category: "한식 외식" },
  { name: "삼겹살 (외식)",      code: "110K01112", basePrice2020: 15000,   category: "한식 외식" },
  { name: "돼지갈비 (외식)",    code: "110K01111", basePrice2020: 15000,   category: "한식 외식" },
  { name: "구내식당",           code: "110K01138", basePrice2020: 6000,    category: "한식 외식" },
  // ── 분식·패스트푸드 ────────────────────────────────────
  { name: "김밥",               code: "110K01127", basePrice2020: 2500,    category: "분식·패스트푸드" },
  { name: "떡볶이",             code: "110K01128", basePrice2020: 3500,    category: "분식·패스트푸드" },
  { name: "치킨",               code: "110K01129", basePrice2020: 18000,   category: "분식·패스트푸드" },
  { name: "햄버거",             code: "110K01130", basePrice2020: 5500,    category: "분식·패스트푸드" },
  { name: "피자",               code: "110K01131", basePrice2020: 15000,   category: "분식·패스트푸드" },
  // ── 외식 음료·주류 ────────────────────────────────────
  { name: "커피 (외식)",        code: "110K01133", basePrice2020: 4500,    category: "외식 음료·주류" },
  { name: "기타음료 (외식)",    code: "110K01134", basePrice2020: 4000,    category: "외식 음료·주류" },
  { name: "소주 (외식)",        code: "110K01135", basePrice2020: 4000,    category: "외식 음료·주류" },
  { name: "맥주 (외식)",        code: "110K01136", basePrice2020: 5000,    category: "외식 음료·주류" },
  // ── 곡물·가공식품 ────────────────────────────────────
  { name: "쌀",                 code: "110A01101", basePrice2020: 3000,    category: "곡물·가공식품" },
  { name: "국수",               code: "110A01109", basePrice2020: 1500,    category: "곡물·가공식품" },
  { name: "라면",               code: "110A01110", basePrice2020: 700,     category: "곡물·가공식품" },
  { name: "두부",               code: "110A01112", basePrice2020: 1500,    category: "곡물·가공식품" },
  { name: "빵",                 code: "110A01116", basePrice2020: 3000,    category: "곡물·가공식품" },
  { name: "떡",                 code: "110A01117", basePrice2020: 2000,    category: "곡물·가공식품" },
  { name: "냉동식품",           code: "110A01917", basePrice2020: 5000,    category: "곡물·가공식품" },
  { name: "즉석식품",           code: "110A01918", basePrice2020: 3500,    category: "곡물·가공식품" },
  { name: "편의점도시락",       code: "110A01919", basePrice2020: 4500,    category: "곡물·가공식품" },
  { name: "삼각김밥",           code: "110A01920", basePrice2020: 1000,    category: "곡물·가공식품" },
  // ── 육류·수산물 ──────────────────────────────────────
  { name: "국산쇠고기",         code: "110A01201", basePrice2020: 7000,    category: "육류·수산물" },
  { name: "수입쇠고기",         code: "110A01202", basePrice2020: 4500,    category: "육류·수산물" },
  { name: "돼지고기",           code: "110A01203", basePrice2020: 2000,    category: "육류·수산물" },
  { name: "닭고기",             code: "110A01204", basePrice2020: 6000,    category: "육류·수산물" },
  { name: "햄·베이컨",          code: "110A01206", basePrice2020: 3000,    category: "육류·수산물" },
  { name: "기타육류가공품",     code: "110A01207", basePrice2020: 3000,    category: "육류·수산물" },
  { name: "고등어",             code: "110A01304", basePrice2020: 4000,    category: "육류·수산물" },
  { name: "오징어",             code: "110A01305", basePrice2020: 3500,    category: "육류·수산물" },
  { name: "조개",               code: "110A01308", basePrice2020: 5000,    category: "육류·수산물" },
  { name: "어묵",               code: "110A01316", basePrice2020: 2000,    category: "육류·수산물" },
  // ── 유제품·달걀 ──────────────────────────────────────
  { name: "우유",               code: "110A01401", basePrice2020: 2500,    category: "유제품·달걀" },
  { name: "발효유",             code: "110A01404", basePrice2020: 2000,    category: "유제품·달걀" },
  { name: "달걀",               code: "110A01405", basePrice2020: 2500,    category: "유제품·달걀" },
  // ── 채소 ──────────────────────────────────────────────
  { name: "배추",               code: "110A01701", basePrice2020: 3000,    category: "채소" },
  { name: "상추",               code: "110A01702", basePrice2020: 2000,    category: "채소" },
  { name: "시금치",             code: "110A01703", basePrice2020: 2000,    category: "채소" },
  { name: "깻잎",               code: "110A01706", basePrice2020: 2000,    category: "채소" },
  { name: "부추",               code: "110A01707", basePrice2020: 1500,    category: "채소" },
  { name: "무",                 code: "110A01708", basePrice2020: 2000,    category: "채소" },
  { name: "당근",               code: "110A01710", basePrice2020: 1000,    category: "채소" },
  { name: "감자",               code: "110A01711", basePrice2020: 1000,    category: "채소" },
  { name: "콩나물",             code: "110A01714", basePrice2020: 1000,    category: "채소" },
  { name: "버섯",               code: "110A01715", basePrice2020: 2500,    category: "채소" },
  { name: "오이",               code: "110A01716", basePrice2020: 1000,    category: "채소" },
  { name: "풋고추",             code: "110A01717", basePrice2020: 2000,    category: "채소" },
  { name: "호박",               code: "110A01718", basePrice2020: 2500,    category: "채소" },
  { name: "토마토",             code: "110A01720", basePrice2020: 2000,    category: "채소" },
  { name: "파",                 code: "110A01721", basePrice2020: 2500,    category: "채소" },
  { name: "양파",               code: "110A01722", basePrice2020: 2000,    category: "채소" },
  { name: "마늘",               code: "110A01723", basePrice2020: 2000,    category: "채소" },
  { name: "김",                 code: "110A01728", basePrice2020: 3000,    category: "채소" },
  // ── 과일 ──────────────────────────────────────────────
  { name: "사과",               code: "110A01601", basePrice2020: 2000,    category: "과일" },
  { name: "포도",               code: "110A01604", basePrice2020: 5000,    category: "과일" },
  { name: "귤",                 code: "110A01607", basePrice2020: 4000,    category: "과일" },
  { name: "수박",               code: "110A01610", basePrice2020: 15000,   category: "과일" },
  { name: "바나나",             code: "110A01612", basePrice2020: 2500,    category: "과일" },
  // ── 조미료·오일 ──────────────────────────────────────
  { name: "참기름",             code: "110A01501", basePrice2020: 7000,    category: "조미료·오일" },
  { name: "식용유",             code: "110A01502", basePrice2020: 4500,    category: "조미료·오일" },
  { name: "소금",               code: "110A01904", basePrice2020: 1000,    category: "조미료·오일" },
  { name: "간장",               code: "110A01905", basePrice2020: 3000,    category: "조미료·오일" },
  { name: "밑반찬",             code: "110A01916", basePrice2020: 3000,    category: "조미료·오일" },
  // ── 간식·음료 ────────────────────────────────────────
  { name: "사탕",               code: "110A01802", basePrice2020: 1500,    category: "간식·음료" },
  { name: "아이스크림",         code: "110A01804", basePrice2020: 1500,    category: "간식·음료" },
  { name: "비스킷",             code: "110A01805", basePrice2020: 2500,    category: "간식·음료" },
  { name: "스낵과자",           code: "110A01806", basePrice2020: 1500,    category: "간식·음료" },
  { name: "파이",               code: "110A01807", basePrice2020: 2000,    category: "간식·음료" },
  { name: "커피 (마트)",        code: "110A02101", basePrice2020: 8000,    category: "간식·음료" },
  { name: "주스",               code: "110A02201", basePrice2020: 2500,    category: "간식·음료" },
  { name: "두유",               code: "110A02202", basePrice2020: 2500,    category: "간식·음료" },
  { name: "생수",               code: "110A02203", basePrice2020: 1000,    category: "간식·음료" },
  { name: "탄산음료",           code: "110A02205", basePrice2020: 2500,    category: "간식·음료" },
  // ── 주류·담배 ────────────────────────────────────────
  { name: "소주 (마트)",        code: "110B01101", basePrice2020: 1500,    category: "주류·담배" },
  { name: "맥주 (마트)",        code: "110B01103", basePrice2020: 2000,    category: "주류·담배" },
  { name: "막걸리",             code: "110B01104", basePrice2020: 1500,    category: "주류·담배" },
  { name: "담배",               code: "110B02101", basePrice2020: 4500,    category: "주류·담배" },
  // ── 의류·신발 ────────────────────────────────────────
  { name: "남자하의",           code: "110C01103", basePrice2020: 30000,   category: "의류·신발" },
  { name: "남자내의",           code: "110C01104", basePrice2020: 10000,   category: "의류·신발" },
  { name: "여자하의",           code: "110C01204", basePrice2020: 30000,   category: "의류·신발" },
  { name: "여자내의",           code: "110C01205", basePrice2020: 10000,   category: "의류·신발" },
  { name: "티셔츠",             code: "110C01302", basePrice2020: 20000,   category: "의류·신발" },
  { name: "유아동복",           code: "110C01401", basePrice2020: 30000,   category: "의류·신발" },
  { name: "양말",               code: "110C01501", basePrice2020: 3000,    category: "의류·신발" },
  { name: "운동화",             code: "110C02103", basePrice2020: 50000,   category: "의류·신발" },
  // ── 주거·광열 ────────────────────────────────────────
  { name: "상수도료",           code: "110D04101", basePrice2020: 20000,   category: "주거·광열" },
  { name: "하수도료",           code: "110D04102", basePrice2020: 10000,   category: "주거·광열" },
  { name: "공동주택관리비",     code: "110D04201", basePrice2020: 150000,  category: "주거·광열" },
  { name: "쓰레기봉투료",       code: "110D04202", basePrice2020: 3000,    category: "주거·광열" },
  { name: "전기료",             code: "110D05101", basePrice2020: 50000,   category: "주거·광열" },
  { name: "도시가스",           code: "110D05201", basePrice2020: 30000,   category: "주거·광열" },
  // ── 가사용품 ─────────────────────────────────────────
  { name: "가전제품렌탈비",     code: "110E03202", basePrice2020: 30000,   category: "가사용품" },
  { name: "부엌용용구",         code: "110E04108", basePrice2020: 10000,   category: "가사용품" },
  { name: "세탁세제",           code: "110E06101", basePrice2020: 10000,   category: "가사용품" },
  { name: "섬유유연제",         code: "110E06102", basePrice2020: 8000,    category: "가사용품" },
  { name: "부엌용세제",         code: "110E06104", basePrice2020: 3000,    category: "가사용품" },
  // ── 의료·보건 ────────────────────────────────────────
  { name: "소염진통제",         code: "110F01106", basePrice2020: 3000,    category: "의료·보건" },
  { name: "조제약",             code: "110F01109", basePrice2020: 5000,    category: "의료·보건" },
  { name: "건강기능식품",       code: "110F01114", basePrice2020: 30000,   category: "의료·보건" },
  { name: "병원약품",           code: "110F01116", basePrice2020: 5000,    category: "의료·보건" },
  { name: "생리대",             code: "110F01202", basePrice2020: 8000,    category: "의료·보건" },
  { name: "마스크",             code: "110F01203", basePrice2020: 1000,    category: "의료·보건" },
  { name: "외래진료비",         code: "110F02101", basePrice2020: 15000,   category: "의료·보건" },
  { name: "한방진료비",         code: "110F02103", basePrice2020: 20000,   category: "의료·보건" },
  { name: "약국조제료",         code: "110F02104", basePrice2020: 5000,    category: "의료·보건" },
  { name: "치과진료비",         code: "110F02201", basePrice2020: 50000,   category: "의료·보건" },
  // ── 교통 ─────────────────────────────────────────────
  { name: "휘발유",             code: "110G02101", basePrice2020: 1500,    category: "교통" },
  { name: "경유",               code: "110G02102", basePrice2020: 1300,    category: "교통" },
  { name: "도로통행료",         code: "110G02303", basePrice2020: 2000,    category: "교통" },
  { name: "도시철도료",         code: "110G03102", basePrice2020: 1350,    category: "교통" },
  { name: "시내버스료",         code: "110G03201", basePrice2020: 1200,    category: "교통" },
  { name: "택시료",             code: "110G03203", basePrice2020: 3800,    category: "교통" },
  { name: "택배이용료",         code: "110G03402", basePrice2020: 4000,    category: "교통" },
  // ── 통신 ─────────────────────────────────────────────
  { name: "휴대전화료",         code: "110H03102", basePrice2020: 50000,   category: "통신" },
  { name: "인터넷이용료",       code: "110H03103", basePrice2020: 30000,   category: "통신" },
  // ── 오락·문화 ────────────────────────────────────────
  { name: "장난감",             code: "110I03101", basePrice2020: 15000,   category: "오락·문화" },
  { name: "반려동물용품",       code: "110I03106", basePrice2020: 15000,   category: "오락·문화" },
  { name: "영화관람료",         code: "110I04201", basePrice2020: 12000,   category: "오락·문화" },
  { name: "온라인콘텐츠",       code: "110I04206", basePrice2020: 10000,   category: "오락·문화" },
  { name: "방송수신료",         code: "110I04207", basePrice2020: 2500,    category: "오락·문화" },
  // ── 교육 ─────────────────────────────────────────────
  { name: "유치원납입금",       code: "110J01101", basePrice2020: 250000,  category: "교육" },
  { name: "전문대학납입금",     code: "110J03101", basePrice2020: 1500000, category: "교육" },
  { name: "사립대학납입금",     code: "110J03103", basePrice2020: 3500000, category: "교육" },
  { name: "초등학원비",         code: "110J04101", basePrice2020: 200000,  category: "교육" },
  { name: "중학원비",           code: "110J04102", basePrice2020: 300000,  category: "교육" },
  { name: "고등학원비",         code: "110J04103", basePrice2020: 400000,  category: "교육" },
  { name: "가정학습지",         code: "110J04108", basePrice2020: 40000,   category: "교육" },
  // ── 개인서비스·용품 ──────────────────────────────────
  { name: "목욕료",             code: "110L01101", basePrice2020: 8000,    category: "개인서비스·용품" },
  { name: "이발료",             code: "110L01103", basePrice2020: 12000,   category: "개인서비스·용품" },
  { name: "미용료",             code: "110L01104", basePrice2020: 30000,   category: "개인서비스·용품" },
  { name: "치약",               code: "110L01204", basePrice2020: 3000,    category: "개인서비스·용품" },
  { name: "샴푸",               code: "110L01206", basePrice2020: 8000,    category: "개인서비스·용품" },
  { name: "화장지",             code: "110L01208", basePrice2020: 8000,    category: "개인서비스·용품" },
  { name: "기초화장품",         code: "110L01209", basePrice2020: 30000,   category: "개인서비스·용품" },
  { name: "보험서비스료",       code: "110L03104", basePrice2020: 50000,   category: "개인서비스·용품" },
  { name: "자동차보험료",       code: "110L03105", basePrice2020: 600000,  category: "개인서비스·용품" },
  // ── 종합지수 (복합 집계) ─────────────────────────────
  { name: "총지수",             code: "000",       basePrice2020: 100,     category: "종합지수" },
  { name: "생활물가지수",       code: "110",       basePrice2020: 100,     category: "종합지수" },
  { name: "식품",               code: "111",       basePrice2020: 100,     category: "종합지수" },
  { name: "식품이외",           code: "112",       basePrice2020: 100,     category: "종합지수" },
  { name: "전월세",             code: "120",       basePrice2020: 100,     category: "종합지수" },
  { name: "생활물가이외",       code: "200",       basePrice2020: 100,     category: "종합지수" },
  { name: "전·월세포함 생활물가", code: "999",     basePrice2020: 100,     category: "종합지수" },
] as const;

export type InflationItem = (typeof INFLATION_ITEMS)[number];

export const CATEGORIES = INFLATION_ITEMS.reduce<Record<string, string[]>>(
  (acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item.name);
    return acc;
  },
  {}
);

export const CATEGORY_LIST = Object.keys(CATEGORIES);
