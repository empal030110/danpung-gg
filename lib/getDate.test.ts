import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getToDate, getYdayDate } from "./getDate";

describe("getToDate / getYdayDate", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("KST 기준 오늘/어제 날짜를 YYYY-MM-DD로 반환한다", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-09-09T10:00:00Z")); // KST 2026-09-09 19:00

        expect(getToDate()).toBe("2026-09-09");
        expect(getYdayDate()).toBe("2026-09-08");
    });

    it("UTC 날짜가 아직 안 바뀌었어도 KST로는 다음 날이면 그 날짜를 반환한다", () => {
        vi.useFakeTimers();
        // UTC 2026-09-08 16:00 → KST(+9) 2026-09-09 01:00, UTC 날짜와 KST 날짜가 달라지는 경계
        vi.setSystemTime(new Date("2026-09-08T16:00:00Z"));

        expect(getToDate()).toBe("2026-09-09");
        expect(getYdayDate()).toBe("2026-09-08");
    });
});
