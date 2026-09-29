import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;
let cached: Db | null = null;

// 모듈 로드 시점이 아니라 실제 쿼리 시점에 연결을 만든다 -> DATABASE_URL이 없어도
// (예: 로컬 DB 세팅 전, next build의 페이지 데이터 수집 단계) 이 파일을 import하는 것 자체는 안전함
export function getDb(): Db {
    if (cached) return cached;
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
    }
    cached = drizzle(neon(process.env.DATABASE_URL), { schema });
    return cached;
}
