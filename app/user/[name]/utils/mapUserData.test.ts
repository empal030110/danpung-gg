import { describe, expect, it } from "vitest";
import { mapUserPageData, RawUserPageData } from "./mapUserData";

// 각 테스트에 필요한 필드만 override할 수 있도록, mapUserPageData가 실제로 읽는
// 최소한의 필드로 채운 기본 raw 데이터를 만든다.
function buildRawData(overrides: Partial<RawUserPageData> = {}): RawUserPageData {
    const base: RawUserPageData = {
        userInfoDataInfo: [{
            date: "2026-09-06",
            character_name: "드표디",
            world_name: "스카니아",
            character_gender: "여",
            character_class: "보우마스터",
            character_class_level: "6",
            character_level: 290,
            character_exp: 0,
            character_exp_rate: "27.255",
            character_guild_name: "리요",
            character_image: "https://open.api.nexon.com/static/maplestory/character/look/JNEHOAPNILDFFKFNGHAOHHJLBOAAMPLACEPJMMNEGCFMNMKDIKIBAACDIGGCCHKJJCNMBMKODLCJELILLOABDLLBHIPOJDGMHLGCJHANPMEGEIIMCPFCIFKAKNBEEAEDILPEDOMNJOPHDIGAKIGECMMLLMGFEFCIACKEGOFFABCCENLAIEMCKPIGLFMKFCBCADGOPCBHHCMLBEMGGOHCCEDKEPLDHPFKGACDDGFEDNDBHFFCAOMDDGOMJDGABAKPLHNCPGKDEFJGKCMFJCLFOFOKCKGFFMCJHKBBCEGLPKBEMDFLMCHIBDHICBAGJCEEMHOJKKFPGNLIKFAONOEFFLBDLCLACOPBMKPMMLPLPJJFONBDGFHDOOPLDLGGNGCAKIAHDNJPKNMJONFPJGKDEPLOGBMPDNCGMJMJBMCEINKHLNFIMICFKANPBFICPKDODEOFDHHGKAJLINLGKCAPEHMFPPJJBHGKKOADHEJOEFGNCHOHALMONHAMJGGNHGAOMCLOINGGCNLIMHPNEDHLCMFHLNKPPMNEPLDFIBFKCKKPMLJJNGOAJNCPNGPLAEJCGDNENCBGEMAGMDDCNAHKCEIFGCOHNGLOEOEOPFKJCGJAKGILPGNJGJLOIECCDEEIHPDIOGNCFNJFBHFPOOJLAHHHOJGHHLBFOPINFKBHFNGEAMILDAKPAIGENILEGMKPCPPLNFFBJHOAALNNOHGLCHJPPFNBDLIHCJJMEGPNIENHILFJLEFHEBHEFANDJHNOKMODNECNCADLDJBMKECNOEHFFCIOHMMEOOKCHDCPAOJGANNMOANJCEJEDLLMCDBGMIDJBEPFHHDDGKIMNOFNHAOGPLPEKPOMANJPIMMKFAMKICHPHPPAJFKLFAHEOEIMJDCCKJBIHEGIEMKAIHJFBDNBCLMBNOHIJKBEFONFLAFEEFDPHPCMKKEOEPNMOMHJKONODMNPLEAENLKGIIGGNEHIDNCCEEPAHBACDDMJBPHFJMLDMMKFHJBIFDMNBEFI?wmotion=W00",
            character_date_create: "2025-12-18",
            access_flag: "true",
            liberation_quest_clear_flag: "true",
        }],
        userSetData: [{ set_effect: [] }],
        userSymbolData: [{ symbol: [] }],
        userAbilityData: [{ preset_no: 1 }],
        userItemData: [{ preset_no: 1, item_equipment: [], item_equipment_preset_1: [], item_equipment_preset_2: [], item_equipment_preset_3: [] }],
        userAndroidData: [],
        userPetData: [{}],
        userHyperStatData: [{}],
        userStatData: [{ final_stat: [] }],
        userSkillData6: [{ character_skill: [] }],
        userSkillData5: [{ character_skill: [] }],
        userHexaStatData: [{}],
        userLinkSkillData: [{}],
        userUnionData: [{ union_level: null }],
        userUnionChampionData: [{}],
        userUnionArtifactData: [{}],
        userUnionRaiderData: [{}],
        userCashItemData: [{}],
        userAchievementData: [{ ranking: [] }],
        userDojangData: [{ ranking: [] }],
    };

    return { ...base, ...overrides };
}

describe("mapUserPageData", () => {
    it("기본 캐릭터 정보를 그대로 매핑한다", () => {
        const raw = buildRawData();

        const result = mapUserPageData(raw);

        expect(result.userData).toEqual({
            date: "2026-09-06",
            characterName: "드표디",
            worldName: "스카니아",
            characterGender: "여",
            characterClass: "보우마스터",
            characterClassLevel: "6",
            characterLevel: 290,
            characterExp: 0,
            characterExpRate: "27.255",
            characterGuildName: "리요",
            characterImage: raw.userInfoDataInfo[0].character_image,
            characterDateCreate: "2025-12-18",
            accessFlag: "true",
            liberationQuestClearFlag: "true",
        });
    });

    it("심볼 이름이 '아케인심볼'로 시작하면 arcaneSymbols로, 아니면 authenticSymbols로 분류한다", () => {
        const raw = buildRawData({
            userSymbolData: [{
                symbol: [
                    { symbol_name: "아케인심볼 : 소멸의 여로", symbol_icon: "arcane.png", symbol_level: 20, symbol_force: "300" },
                    { symbol_name: "어센틱심볼 : 세르니움", symbol_icon: "authentic.png", symbol_level: 11, symbol_force: "110" },
                ],
            }],
        });

        const result = mapUserPageData(raw);

        expect(result.arcaneSymbols).toEqual([{ symbol_icon: "arcane.png", symbol_level: 20, symbol_force: "300" }]);
        expect(result.authenticSymbols).toEqual([{ symbol_icon: "authentic.png", symbol_level: 11, symbol_force: "110" }]);
    });

    it("어빌리티 프리셋이 null이면 빈 에픽 프리셋으로 대체한다", () => {
        const raw = buildRawData({
            userAbilityData: [{ preset_no: 2, ability_preset_1: null, ability_preset_2: { ability_preset_grade: "레전드리", ability_info: [{ ability_no: "1", ability_grade: "레전드리", ability_value: "STR +30" }] } }],
        });

        const result = mapUserPageData(raw);

        expect(result.abilityPresetNumber).toBe(2);
        expect(result.abilityPreset1).toEqual({ ability_preset_grade: "에픽", ability_info: [] });
        expect(result.abilityPreset2.ability_preset_grade).toBe("레전드리");
    });

    it("프리셋 1이 비어있으면 실제 착용 중인 장비(item_equipment)를 대신 사용한다", () => {
        const raw = buildRawData({
            userItemData: [{
                preset_no: 1,
                item_equipment_preset_1: [],
                item_equipment: [{ item_name: "제네시스 보우", item_equipment_slot: "무기", starforce: "22" }],
            }],
        });

        const result = mapUserPageData(raw);

        expect(result.userItemPreset1).toHaveLength(1);
        expect(result.userItemPreset1[0].item_name).toBe("제네시스 보우");
    });

    it("프리셋 1에 데이터가 있으면 그대로 사용하고 item_equipment는 무시한다", () => {
        const raw = buildRawData({
            userItemData: [{
                preset_no: 1,
                item_equipment_preset_1: [{ item_name: "제네시스 보우", item_equipment_slot: "무기", starforce: "22" }],
                item_equipment: [{ item_name: "이볼빙 블라스트 페더", item_equipment_slot: "무기", starforce: "22" }],
            }],
        });

        const result = mapUserPageData(raw);

        expect(result.userItemPreset1).toHaveLength(1);
        expect(result.userItemPreset1[0].item_name).toBe("제네시스 보우");
    });

    it("개별 펫 장비가 없으면 월드 공유 펫 장비를 대신 사용하고, 이름 없는 펫 슬롯은 제외한다", () => {
        const raw = buildRawData({
            userPetData: [{
                pet_1_name: "아델레",
                pet_1_icon: "pet1.png",
                pet_1_pet_type: "루나 쁘띠",
                pet_1_equipment: { item_name: null },
                world_share_pet_1_equipment: { item_name: "루나 크리스탈 키" },
                pet_2_name: null,
            }],
        });

        const result = mapUserPageData(raw);

        expect(result.userPets).toHaveLength(1);
        expect(result.userPets[0].pet_equipment).toEqual({ item_name: "루나 크리스탈 키" });
    });

    it("링크 스킬 장착 목록과 동일한 프리셋 번호를 찾아낸다", () => {
        const equipped = [{ skill_name: "링크스킬A", skill_level: 1, skill_icon: "" }];
        const raw = buildRawData({
            userLinkSkillData: [{
                character_link_skill: equipped,
                character_link_skill_preset_1: [{ skill_name: "링크스킬X", skill_level: 1, skill_icon: "" }],
                character_link_skill_preset_2: equipped,
                character_link_skill_preset_3: [],
            }],
        });

        const result = mapUserPageData(raw);

        expect(result.linkSkillPresetNo).toBe(2);
    });

    it("어떤 프리셋과도 일치하지 않으면 기본값 1을 사용한다", () => {
        const raw = buildRawData({
            userLinkSkillData: [{
                character_link_skill: [{ skill_name: "링크스킬A", skill_level: 1, skill_icon: "" }],
                character_link_skill_preset_1: [],
                character_link_skill_preset_2: [],
                character_link_skill_preset_3: [],
            }],
        });

        const result = mapUserPageData(raw);

        expect(result.linkSkillPresetNo).toBe(1);
    });

    it("union_level이 null이면 유니온 정보를 undefined로 처리한다", () => {
        const raw = buildRawData({ userUnionData: [{ union_level: null }] });

        const result = mapUserPageData(raw);

        expect(result.userUnion).toBeUndefined();
    });

    it("union_level이 있으면 유니온 정보를 매핑한다", () => {
        const raw = buildRawData({
            userUnionData: [{ union_level: 9520, union_grade: "그랜드 마스터 유니온 4", union_artifact_level: 50 }],
        });

        const result = mapUserPageData(raw);

        expect(result.userUnion).toEqual({ union_level: 9520, union_grade: "그랜드 마스터 유니온 4", union_artifact_level: 50 });
    });

    it("업적/무릉도장 랭킹이 비어있으면 undefined를 반환한다", () => {
        const raw = buildRawData({
            userAchievementData: [{ ranking: [] }],
            userDojangData: [{ ranking: [] }],
        });

        const result = mapUserPageData(raw);

        expect(result.userAchievement).toBeUndefined();
        expect(result.userDojang).toBeUndefined();
    });

    it("하이퍼 스탯 프리셋 번호가 없으면 기본값 1을 사용한다", () => {
        const raw = buildRawData({ userHyperStatData: [{ use_preset_no: undefined }] });

        const result = mapUserPageData(raw);

        expect(result.hyperStatPresetNo).toBe(1);
    });
});
