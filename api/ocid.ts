import { apiKey } from "@/api/key";
import { ocidUrl } from "./url/ocid";

export default async function ocid(name: string) {
    const url = ocidUrl(name);

    try {
        const response = await fetch(url, {
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

        return result[0]['ocid'];
        } catch (error) {
        console.error("에러:", error);
        return [];
    }
}
