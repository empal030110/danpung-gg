import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";

// next dev/build와 달리 이 스크립트는 Next 런타임 밖에서 실행돼 .env.local을 자동으로 안 읽으므로 직접 로드
loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
}

async function main() {
    const db = drizzle(neon(process.env.DATABASE_URL!));
    await migrate(db, { migrationsFolder: "./db/migrations" });
    console.log("마이그레이션 완료");
}

main();
