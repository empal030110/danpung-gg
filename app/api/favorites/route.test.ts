import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

// ssrFetcher는 실제 넥슨 API를 호출하므로, 호출된 URL 종류(ocid 조회/기본정보/스탯)에 따라
// 다른 응답을 돌려주는 가짜로 대체한다.
vi.mock("@/lib/ssrFetcher", () => ({
    default: vi.fn(async (url: string) => {
        if (url.includes("/v1/id")) {
            const name = new URL(url).searchParams.get("character_name") ?? "";
            if (name === "삭제된캐릭터") throw new Error("404 캐릭터 없음");
            return [{ ocid: `ocid-${name}` }];
        }
        if (url.includes("/character/basic")) {
            return [{ character_level: 300, character_class: "키네시스", world_name: "루나", character_image: "img.png" }];
        }
        if (url.includes("/character/stat")) {
            return [{ final_stat: [{ stat_name: "전투력", stat_value: "43147111" }] }];
        }
        throw new Error(`예상치 못한 URL: ${url}`);
    }),
}));

const { POST } = await import("./route");

const postRequest = (body: unknown) =>
    new NextRequest("http://localhost/api/favorites", { method: "POST", body: JSON.stringify(body) });

describe("POST /api/favorites", () => {
    it("이름 목록을 조회해 요약 정보를 반환한다", async () => {
        const response = await POST(postRequest({ names: ["오지환"] }));
        const data = await response.json();

        expect(data.results).toEqual([{
            name: "오지환",
            ok: true,
            level: 300,
            className: "키네시스",
            worldName: "루나",
            image: "img.png",
            combatPower: "43,147,111",
        }]);
    });

    it("names가 배열이 아니면 빈 results를 반환한다", async () => {
        const response = await POST(postRequest({ names: "오지환" }));
        const data = await response.json();

        expect(data.results).toEqual([]);
    });

    it("본문이 JSON이 아니어도(파싱 실패) 빈 results를 반환한다", async () => {
        const brokenRequest = new NextRequest("http://localhost/api/favorites", { method: "POST", body: "not json" });

        const response = await POST(brokenRequest);
        const data = await response.json();

        expect(data.results).toEqual([]);
    });

    it("중복된 이름은 한 번만 조회한다", async () => {
        const ssrFetcher = (await import("@/lib/ssrFetcher")).default;
        vi.mocked(ssrFetcher).mockClear();

        await POST(postRequest({ names: ["오지환", "오지환", "오지환"] }));

        // 캐릭터 하나당 ocid/basic/stat 3번 호출되므로, 중복 제거가 안 됐다면 3배로 호출됐을 것
        expect(vi.mocked(ssrFetcher)).toHaveBeenCalledTimes(3);
    });

    it("빈 문자열이나 문자열이 아닌 값은 걸러낸다", async () => {
        const response = await POST(postRequest({ names: ["오지환", "", 123, null] }));
        const data = await response.json();

        expect(data.results.map((r: { name: string }) => r.name)).toEqual(["오지환"]);
    });

    it("50개를 넘는 이름은 앞 50개만 조회한다", async () => {
        const names = Array.from({ length: 60 }, (_, i) => `캐릭터${i}`);

        const response = await POST(postRequest({ names }));
        const data = await response.json();

        expect(data.results).toHaveLength(50);
    });

    it("한 캐릭터 조회가 실패해도 그 캐릭터만 실패 처리하고 나머지는 계속 진행한다", async () => {
        const response = await POST(postRequest({ names: ["삭제된캐릭터", "오지환"] }));
        const data = await response.json();

        expect(data.results).toEqual(expect.arrayContaining([
            { name: "삭제된캐릭터", ok: false },
            expect.objectContaining({ name: "오지환", ok: true }),
        ]));
    });
});
