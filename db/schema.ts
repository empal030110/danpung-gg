import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

// 캐릭터별 좋아요 - (캐릭터명, ip) 조합이 곧 "이 ip가 이 캐릭터에 좋아요를 눌렀다"는 기록
// 좋아요 수는 별도 카운터 없이 이 테이블을 character_name으로 COUNT(*) 해서 구한다
export const characterLikes = pgTable(
    "character_likes",
    {
        characterName: text("character_name").notNull(),
        ip: text("ip").notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
    },
    (table) => [primaryKey({ columns: [table.characterName, table.ip] })],
);
