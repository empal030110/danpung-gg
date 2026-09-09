import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ssrFetcher가 import하는 lib/key는 NX_OPEN_API_KEY 환경변수가 없으면 모듈 로드 시점에 throw하므로,
// 테스트 환경에 그 env가 없어도 되도록 모킹한다.
vi.mock("@/lib/key", () => ({ apiKey: "test-api-key" }));

import ssrFetcher from "./ssrFetcher";

const mockResponse = (overrides: Partial<Response>) => overrides as Response;

describe("ssrFetcher", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });

    it("응답이 객체 하나여도 배열로 감싸서 반환한다", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse({
            status: 200,
            ok: true,
            json: async () => ({ hello: "world" }),
        })));

        const result = await ssrFetcher("https://example.com");

        expect(result).toEqual([{ hello: "world" }]);
    });

    it("응답이 이미 배열이면 그대로 반환한다", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse({
            status: 200,
            ok: true,
            json: async () => ([{ a: 1 }, { a: 2 }]),
        })));

        const result = await ssrFetcher("https://example.com");

        expect(result).toEqual([{ a: 1 }, { a: 2 }]);
    });

    it("429는 재시도하고, 재시도 중 성공하면 그 결과를 반환한다", async () => {
        const fetchMock = vi.fn()
            .mockResolvedValueOnce(mockResponse({ status: 429, ok: false }))
            .mockResolvedValueOnce(mockResponse({ status: 200, ok: true, json: async () => ({ ok: true }) }));
        vi.stubGlobal("fetch", fetchMock);

        const promise = ssrFetcher("https://example.com");
        await vi.runAllTimersAsync();
        const result = await promise;

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(result).toEqual([{ ok: true }]);
    });

    it("429가 최대 재시도 횟수(4회)를 넘겨도 계속되면 마지막 응답으로 에러를 던진다", async () => {
        const fetchMock = vi.fn().mockResolvedValue(mockResponse({
            status: 429,
            ok: false,
            text: async () => "Too Many Requests",
        }));
        vi.stubGlobal("fetch", fetchMock);

        const promise = ssrFetcher("https://example.com");
        const assertion = expect(promise).rejects.toThrow(/429/);
        await vi.runAllTimersAsync();
        await assertion;

        // 최초 1회 + 재시도 4회 = 5회 호출
        expect(fetchMock).toHaveBeenCalledTimes(5);
    });

    it("429가 아닌 실패 응답(500 등)은 재시도 없이 바로 에러를 던진다", async () => {
        const fetchMock = vi.fn().mockResolvedValue(mockResponse({
            status: 500,
            ok: false,
            text: async () => "Internal Server Error",
        }));
        vi.stubGlobal("fetch", fetchMock);

        await expect(ssrFetcher("https://example.com")).rejects.toThrow(/500/);
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("호출 시 API 키를 헤더에 담아 보낸다", async () => {
        const fetchMock = vi.fn().mockResolvedValue(mockResponse({
            status: 200,
            ok: true,
            json: async () => ({}),
        }));
        vi.stubGlobal("fetch", fetchMock);

        await ssrFetcher("https://example.com/foo");

        expect(fetchMock).toHaveBeenCalledWith("https://example.com/foo", expect.objectContaining({
            headers: { "x-nxopen-api-key": "test-api-key" },
        }));
    });
});
