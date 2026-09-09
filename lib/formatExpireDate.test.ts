import { describe, expect, it } from "vitest";
import { formatExpireDate } from "./formatExpireDate";

describe("formatExpireDate", () => {
    it("유효한 ISO 날짜 문자열을 한국어 포맷 + 안내 문구로 바꾼다", () => {
        expect(formatExpireDate("2026-09-09T10:30:00Z")).toBe("2026년 9월 9일 오후 07:30까지 사용 가능");
    });

    it("date_option_expire가 만료 시 내려주는 'expired' 같은 파싱 불가 문자열은 null을 반환한다", () => {
        expect(formatExpireDate("expired")).toBeNull();
    });

    it("빈 문자열도 파싱 불가로 처리해 null을 반환한다", () => {
        expect(formatExpireDate("")).toBeNull();
    });
});
