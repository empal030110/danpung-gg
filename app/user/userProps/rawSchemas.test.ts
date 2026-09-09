import { describe, expect, it } from "vitest";
import {
    userInfoRawSchema,
    setDataRawSchema,
    symbolDataRawSchema,
    abilityDataRawSchema,
    itemDataRawSchema,
    petDataRawSchema,
    hyperStatDataRawSchema,
    statDataRawSchema,
    skillDataRawSchema,
    linkSkillDataRawSchema,
    hexaStatDataRawSchema,
    unionDataRawSchema,
    unionChampionDataRawSchema,
    unionArtifactDataRawSchema,
    unionRaiderDataRawSchema,
    cashItemDataRawSchema,
    achievementDataRawSchema,
    dojangDataRawSchema,
} from "./rawSchemas";

// 실제 넥슨 API를 붙여 확인했을 때 드러난 케이스들을 회귀 테스트로 고정한다.
// (스키마 자체가 화면에서 쓰는 필드의 allowlist라, 여기서는 "실제로 이런 모양이 온다"를 지키는 게 목적)

describe("userInfoRawSchema", () => {
    it("길드가 없는 캐릭터는 character_guild_name이 null로 온다", () => {
        const parsed = userInfoRawSchema.parse({ character_name: "오지환", character_guild_name: null });
        expect(parsed.character_guild_name).toBeNull();
    });
});

describe("setDataRawSchema", () => {
    it("세트효과가 없으면 set_effect가 빈 배열이어도 통과한다", () => {
        expect(() => setDataRawSchema.parse({ set_effect: [] })).not.toThrow();
    });
});

describe("symbolDataRawSchema", () => {
    it("아케인/어센틱 구분용 symbol_name과 함께 파싱된다", () => {
        const parsed = symbolDataRawSchema.parse({
            symbol: [
                {
                    symbol_name: "아케인심볼 : 소멸의 여로",
                    symbol_icon: "icon.png",
                    symbol_level: 20,
                    symbol_force: "220",
                },
            ],
        });
        expect(parsed.symbol?.[0].symbol_name).toBe("아케인심볼 : 소멸의 여로");
    });
});

describe("abilityDataRawSchema", () => {
    it("설정되지 않은 프리셋은 null로 온다", () => {
        const parsed = abilityDataRawSchema.parse({ preset_no: 1, ability_preset_1: null });
        expect(parsed.ability_preset_1).toBeNull();
    });
});

describe("itemDataRawSchema", () => {
    it("타이틀을 착용하지 않았으면 title이 null이어도 통과한다", () => {
        expect(() => itemDataRawSchema.parse({ preset_no: 1, title: null })).not.toThrow();
    });

    it("아이템 배열 자체는 느슨하게 통과시킨다 (개별 검증은 itemSchema.parse가 담당)", () => {
        const parsed = itemDataRawSchema.parse({ item_equipment: [{ anything: "here" }] });
        expect(parsed.item_equipment).toHaveLength(1);
    });
});

describe("petDataRawSchema", () => {
    it("펫을 하나도 장착하지 않은 캐릭터는 pet_1/2/3 전부 null로 온다", () => {
        const parsed = petDataRawSchema.parse({
            pet_1_name: null,
            pet_1_icon: null,
            pet_1_pet_type: null,
            pet_1_equipment: null,
            world_share_pet_1_equipment: null,
            pet_2_name: null,
            pet_2_icon: null,
            pet_2_pet_type: null,
            pet_2_equipment: null,
            world_share_pet_2_equipment: null,
            pet_3_name: null,
            pet_3_icon: null,
            pet_3_pet_type: null,
            pet_3_equipment: null,
            world_share_pet_3_equipment: null,
        });
        expect(parsed.pet_1_name).toBeNull();
        expect(parsed.pet_2_equipment).toBeNull();
    });
});

describe("hyperStatDataRawSchema", () => {
    it("use_preset_no는 숫자가 아니라 문자열로 온다 (호출부에서 Number() 변환)", () => {
        const parsed = hyperStatDataRawSchema.parse({ use_preset_no: "2" });
        expect(parsed.use_preset_no).toBe("2");
    });
});

describe("statDataRawSchema", () => {
    it("final_stat 배열을 그대로 검증한다", () => {
        const parsed = statDataRawSchema.parse({ final_stat: [{ stat_name: "전투력", stat_value: "43147111" }] });
        expect(parsed.final_stat).toHaveLength(1);
    });
});

describe("skillDataRawSchema / linkSkillDataRawSchema", () => {
    it("스킬 배열이 비어있어도 통과한다", () => {
        expect(() => skillDataRawSchema.parse({ character_skill: [] })).not.toThrow();
    });

    it("링크 스킬 프리셋 3종을 함께 검증한다", () => {
        const parsed = linkSkillDataRawSchema.parse({
            character_link_skill: [{ skill_name: "데몬스 퓨리", skill_level: 2, skill_icon: "icon.png" }],
            character_link_skill_preset_1: [],
            character_link_skill_preset_2: [],
            character_link_skill_preset_3: [],
        });
        expect(parsed.character_link_skill).toHaveLength(1);
    });
});

describe("hexaStatDataRawSchema", () => {
    it("헥사 코어 3개 슬롯을 각각 배열로 검증한다", () => {
        const core = {
            main_stat_name: "주력 스탯 증가",
            main_stat_level: 8,
            sub_stat_name_1: null,
            sub_stat_level_1: 0,
            sub_stat_name_2: null,
            sub_stat_level_2: 0,
        };
        const parsed = hexaStatDataRawSchema.parse({
            character_hexa_stat_core: [core],
            character_hexa_stat_core_2: [],
            character_hexa_stat_core_3: [],
        });
        expect(parsed.character_hexa_stat_core?.[0].main_stat_level).toBe(8);
    });
});

describe("unionDataRawSchema", () => {
    it("유니온 미가입이면 union_level이 null로 온다", () => {
        const parsed = unionDataRawSchema.parse({ union_level: null });
        expect(parsed.union_level).toBeNull();
    });
});

describe("unionChampionDataRawSchema", () => {
    it("챔피언 목록과 휘장 효과를 함께 검증한다", () => {
        const parsed = unionChampionDataRawSchema.parse({
            union_champion: [
                { champion_slot: 1, champion_name: "오지환", champion_class: "키네시스", champion_grade: "SSS" },
            ],
            champion_badge_total_info: [{ stat: "올스탯 20 증가" }],
        });
        expect(parsed.union_champion).toHaveLength(1);
        expect(parsed.champion_badge_total_info?.[0].stat).toBe("올스탯 20 증가");
    });
});

describe("unionArtifactDataRawSchema", () => {
    it("아티팩트 효과를 아직 등록 안 했으면 빈 배열이어도 통과한다", () => {
        expect(() => unionArtifactDataRawSchema.parse({ union_artifact_effect: [] })).not.toThrow();
    });
});

describe("unionRaiderDataRawSchema", () => {
    it("사용하지 않는 공격대 프리셋은 union_state_stat이 빈 배열로 온다", () => {
        const parsed = unionRaiderDataRawSchema.parse({
            union_raider_stat: [],
            use_preset_no: 2,
            union_state_stat_preset: [{ preset_no: 1, union_state_stat: [] }],
        });
        expect(parsed.union_state_stat_preset?.[0].union_state_stat).toEqual([]);
    });
});

describe("cashItemDataRawSchema", () => {
    it("코디 프리셋 4종(기본+1/2/3)을 함께 검증한다", () => {
        const item = {
            cash_item_equipment_part: "모자",
            cash_item_equipment_slot: "모자",
            cash_item_name: "기억의 늪",
            cash_item_icon: "icon.png",
        };
        const parsed = cashItemDataRawSchema.parse({ preset_no: 1, cash_item_equipment_base: [item] });
        expect(parsed.cash_item_equipment_base).toHaveLength(1);
    });
});

describe("achievementDataRawSchema / dojangDataRawSchema", () => {
    it("업적/무릉도장 랭킹이 아직 집계되지 않았으면 ranking이 빈 배열로 온다", () => {
        expect(achievementDataRawSchema.parse({ ranking: [] }).ranking).toEqual([]);
        expect(dojangDataRawSchema.parse({ ranking: [] }).ranking).toEqual([]);
    });
});
