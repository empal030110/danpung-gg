import { apiKey } from "@/api/key";

export default async function ssrFetcher(url: string) {
    try {
        const response = await fetch(url, {
            cache: 'force-cache',
            headers: {
                "x-nxopen-api-key": apiKey,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API 실패 응답:", response.status, errorText);
            throw new Error(`API 요청 실패 (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        const result = Array.isArray(data) ? data : [data];

        return result;
        } catch (error) {
        console.error("에러:", error);
        return [];
    }
}
