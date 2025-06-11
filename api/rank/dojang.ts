import { apiKey } from "@/api/key";

export default async function dojang() {
    try {
        const response = await fetch('https://open.api.nexon.com/maplestory/v1/ranking/dojang?date=2025-06-11&difficulty=0&page=1', {
            cache: 'force-cache',
            headers: {
            "x-nxopen-api-key": apiKey,
            },
        });

        if (!response.ok) {
            throw new Error("API 요청 실패");
        }

        const data = await response.json();
        const result = Array.isArray(data) ? data : [data];

        return result;
        } catch (error) {
        console.error("dojang() 에러:", error);
        return [];
    }
}
