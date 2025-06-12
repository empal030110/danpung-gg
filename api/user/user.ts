import { apiKey } from "@/api/key";
import { userUrl } from "../url/user/user";

export default async function user(ocid: string) {
    const url = userUrl(ocid);

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

        return result[0];
        } catch (error) {
        console.error("에러:", error);
        return [];
    }
}
