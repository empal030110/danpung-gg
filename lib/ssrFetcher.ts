import { apiKey } from "@/lib/key";

const MAX_RETRIES = 4;
const RETRY_DELAY_MS = 500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithKey = (url: string) =>
    fetch(url, {
        next: { revalidate: 3600 },
        headers: {
            "x-nxopen-api-key": apiKey,
        },
    });

export default async function ssrFetcher(url: string) {
    try {
        let response = await fetchWithKey(url);

        // 순간 요청량 제한(429)은 지수 백오프 + 지터로 재시도 (동시 요청이 몰릴 때 한꺼번에 다시 부딪히는 것을 방지)
        for (let attempt = 0; response.status === 429 && attempt < MAX_RETRIES; attempt++) {
            const backoff = RETRY_DELAY_MS * 2 ** attempt;
            const jitter = Math.random() * RETRY_DELAY_MS;
            await sleep(backoff + jitter);
            response = await fetchWithKey(url);
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API 요청 실패 (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error("ssrFetcher 실패:", url, error);
        throw error;
    }
}
