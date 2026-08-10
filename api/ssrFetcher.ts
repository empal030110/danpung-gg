import { apiKey } from "@/api/key";

const MAX_RETRIES = 2;
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

        for (let attempt = 0; response.status === 429 && attempt < MAX_RETRIES; attempt++) {
            await sleep(RETRY_DELAY_MS * (attempt + 1));
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
