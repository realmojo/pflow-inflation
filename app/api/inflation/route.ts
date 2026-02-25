import { NextResponse } from "next/server";
import axios from "axios";
import { INFLATION_ITEMS } from "@/lib/inflation-items";

const KOSIS_BASE_URL =
  "https://kosis.kr/openapi/Param/statisticsParameterData.do";

export const runtime = "edge";

async function fetchKosisYearly(
  apiKey: string,
  code: string,
  startYear: string,
  endYear: string,
): Promise<Array<{ year: string; index: number }>> {
  const { data } = await axios.get(KOSIS_BASE_URL, {
    params: {
      method: "getList",
      apiKey,
      itmId: "T",
      objL1: "T10",
      objL2: code,
      format: "json",
      jsonVD: "Y",
      prdSe: "Y",
      orgId: "101",
      tblId: "DT_1J22005",
      startPrdDe: startYear,
      endPrdDe: endYear,
    },
  });

  if (!Array.isArray(data)) return [];

  return data
    .map((d) => ({ year: d.PRD_DE as string, index: parseFloat(d.DT) }))
    .filter((d) => !isNaN(d.index))
    .sort((a, b) => a.year.localeCompare(b.year));
}

export async function GET(request: Request) {
  const kosisApiKey = process.env.KOSIS_API_KEY;

  if (!kosisApiKey) {
    return NextResponse.json(
      { error: "KOSIS_API_KEY 환경변수가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "code 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  const item = INFLATION_ITEMS.find((i) => i.code === code);
  if (!item) {
    return NextResponse.json(
      { error: "해당 품목을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  const currentYear = new Date().getFullYear().toString();

  try {
    const longTermRaw = await fetchKosisYearly(
      kosisApiKey,
      code,
      "1990",
      currentYear,
    );

    const { basePrice2020, category } = item;

    const fiveYear = longTermRaw.map((d) => ({
      year: d.year,
      price: Math.round((basePrice2020 * d.index) / 100 / 100) * 100,
    }));

    const latestIndex =
      longTermRaw.length > 0 ? longTermRaw[longTermRaw.length - 1].index : 100;
    const currentPrice =
      Math.round((basePrice2020 * latestIndex) / 100 / 100) * 100;

    const tenYearsAgoYear = (parseInt(currentYear) - 10).toString();
    const tenYearsAgoData =
      longTermRaw.find((d) => d.year === tenYearsAgoYear) ?? longTermRaw[0];
    const tenYearIncrease = tenYearsAgoData
      ? parseFloat(
          (
            ((latestIndex - tenYearsAgoData.index) / tenYearsAgoData.index) *
            100
          ).toFixed(1),
        )
      : null;

    return NextResponse.json({
      category,
      longTerm: longTermRaw,
      fiveYear,
      currentPrice,
      tenYearIncrease,
      lastUpdated: longTermRaw[longTermRaw.length - 1]?.year ?? null,
    });
  } catch (error: any) {
    console.error("KOSIS API 오류:", error?.message ?? error);
    return NextResponse.json(
      { error: "데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
