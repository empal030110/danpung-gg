import { describe, expect, it } from "vitest";
import runLimited from "./runLimited";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("runLimited", () => {
    it("태스크를 전부 실행하고 원래 순서대로 결과를 반환한다", async () => {
        const tasks = [1, 2, 3, 4, 5].map((n) => async () => {
            await delay(Math.random() * 5);
            return n * 10;
        });

        const results = await runLimited(tasks, 2);

        expect(results).toEqual([10, 20, 30, 40, 50]);
    });

    it("동시 실행 개수가 limit을 넘지 않는다", async () => {
        let current = 0;
        let max = 0;
        const tasks = Array.from({ length: 6 }, () => async () => {
            current += 1;
            max = Math.max(max, current);
            await delay(5);
            current -= 1;
        });

        await runLimited(tasks, 3);

        expect(max).toBe(3);
    });

    it("limit이 태스크 개수보다 크면 태스크 개수만큼만 동시 실행한다", async () => {
        let current = 0;
        let max = 0;
        const tasks = Array.from({ length: 2 }, () => async () => {
            current += 1;
            max = Math.max(max, current);
            await delay(5);
            current -= 1;
        });

        await runLimited(tasks, 10);

        expect(max).toBe(2);
    });

    it("빈 배열이면 빈 배열을 반환한다", async () => {
        const results = await runLimited([], 3);

        expect(results).toEqual([]);
    });

    it("태스크 하나가 실패하면 에러를 그대로 전파한다", async () => {
        const tasks = [
            async () => 1,
            async () => {
                throw new Error("boom");
            },
            async () => 3,
        ];

        await expect(runLimited(tasks, 2)).rejects.toThrow("boom");
    });
});
