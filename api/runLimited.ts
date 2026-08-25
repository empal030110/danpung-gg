// 동시에 실행할 작업 수를 limit개로 제한하며 전부 실행 (넥슨 API 순간 요청량 제한(429) 회피용)
export default async function runLimited<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {
    const results: T[] = new Array(tasks.length);
    let nextIndex = 0;

    async function worker() {
        while (nextIndex < tasks.length) {
            const current = nextIndex++;
            results[current] = await tasks[current]();
        }
    }

    await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
    return results;
}
