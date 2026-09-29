import { and, count, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { characterLikes } from "@/db/schema";

export function getClientIp(headers: Headers): string {
    // x-vercel-forwarded-for는 Vercel이 직접 관측한 IP라 x-forwarded-for보다 신뢰도가 높음
    // (Vercel 앞에 별도 프록시를 두면 x-forwarded-for가 그 프록시 값으로 바뀔 수 있어서)
    const vercelForwardedFor = headers.get("x-vercel-forwarded-for");
    if (vercelForwardedFor) return vercelForwardedFor.split(",")[0].trim();

    const forwardedFor = headers.get("x-forwarded-for");
    if (forwardedFor) return forwardedFor.split(",")[0].trim();

    return headers.get("x-real-ip") ?? "unknown";
}

async function getLikeCount(characterName: string): Promise<number> {
    const [row] = await getDb()
        .select({ count: count() })
        .from(characterLikes)
        .where(eq(characterLikes.characterName, characterName));
    return row?.count ?? 0;
}

export async function getLikeState(characterName: string, ip: string): Promise<{ liked: boolean; count: number }> {
    const [[existing], likeCount] = await Promise.all([
        getDb()
            .select()
            .from(characterLikes)
            .where(and(eq(characterLikes.characterName, characterName), eq(characterLikes.ip, ip)))
            .limit(1),
        getLikeCount(characterName),
    ]);

    return { liked: !!existing, count: likeCount };
}

export async function toggleLike(characterName: string, ip: string): Promise<{ liked: boolean; count: number }> {
    const deleted = await getDb()
        .delete(characterLikes)
        .where(and(eq(characterLikes.characterName, characterName), eq(characterLikes.ip, ip)))
        .returning();

    if (deleted.length === 0) {
        // 동시에 두 번 눌러도 (character_name, ip) 기본키가 중복 삽입을 막아줌
        await getDb().insert(characterLikes).values({ characterName, ip }).onConflictDoNothing();
    }

    const likeCount = await getLikeCount(characterName);
    return { liked: deleted.length === 0, count: likeCount };
}

export async function getTopLiked(limit: number): Promise<{ name: string; count: number }[]> {
    const rows = await getDb()
        .select({ name: characterLikes.characterName, count: count() })
        .from(characterLikes)
        .groupBy(characterLikes.characterName)
        .orderBy(desc(count()))
        .limit(limit);

    return rows;
}
