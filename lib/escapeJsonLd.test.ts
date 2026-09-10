import { describe, expect, it } from "vitest";
import { escapeJsonLd } from "./escapeJsonLd";

describe("escapeJsonLd", () => {
    it("일반 객체는 JSON.stringify와 동일하게 직렬화한다", () => {
        expect(escapeJsonLd({ a: 1, b: "hello" })).toBe(JSON.stringify({ a: 1, b: "hello" }));
    });

    it("값에 </script>가 섞여 있어도 스크립트 태그를 탈출할 수 없도록 이스케이프한다", () => {
        const payload = { name: `</script><script>alert(1)</script>` };

        const result = escapeJsonLd(payload);

        expect(result).not.toContain("</script>");
        expect(result).toContain("\\u003c/script>\\u003cscript>alert(1)\\u003c/script>");
    });

    it("이스케이프된 문자열도 JSON.parse로 원래 값을 그대로 복원할 수 있다", () => {
        const payload = { name: `<b>안녕</b>` };

        const result = escapeJsonLd(payload);

        expect(JSON.parse(result)).toEqual(payload);
    });
});
