import { NextRequest, NextResponse } from "next/server";
import { ocidUrl, userUrl, statUrl } from "@/lib/url/apiUrl";
import ssrFetcher from "@/lib/ssrFetcher";
import runLimited from "@/lib/runLimited";
import { userStatProps } from "../../user/userProps/props";

const MAX_NAMES = 50; // 한 번에 조회할 수 있는 즐겨찾기 개수 상한 (넥슨 API 남용 방지)

export interface FavoriteSummary {
    name: string;
    ok: boolean;
    level?: number;
    className?: string;
    worldName?: string;
    image?: string;
    combatPower?: string;
}

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null);
    const names: unknown = body?.names;

    if (!Array.isArray(names)) {
        return NextResponse.json({ results: [] });
    }

    const uniqueNames = [...new Set(names.filter((name): name is string => typeof name === "string" && name.length > 0))].slice(0, MAX_NAMES);

    const results = await runLimited<FavoriteSummary>(
        uniqueNames.map((name) => async () => {
            try {
                const ocidData = await ssrFetcher(ocidUrl(name));
                const ocid = ocidData[0].ocid;

                const [userData, statData] = await Promise.all([
                    ssrFetcher(userUrl(ocid)),
                    ssrFetcher(statUrl(ocid)),
                ]);
                const info = userData[0];
                const combatStatData = statData[0].final_stat.find((stat: userStatProps) => stat.stat_name === "전투력");

                return {
                    name,
                    ok: true,
                    level: info.character_level,
                    className: info.character_class,
                    worldName: info.world_name,
                    image: info.character_image,
                    combatPower: combatStatData ? Number(combatStatData.stat_value).toLocaleString() : undefined,
                };
            } catch {
                // 이름이 바뀌었거나 삭제된 캐릭터 등 - 이 캐릭터만 실패 처리하고 나머지는 계속 진행
                return { name, ok: false };
            }
        }),
        3
    );

    return NextResponse.json({ results });
}
