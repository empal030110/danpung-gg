import { apiKey } from "@/api/key";
import { dojangUrl } from "@/api/url/rank/dojangUrl";

export default async function dojang() {
    try {
        const response = await fetch(dojangUrl, {
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
