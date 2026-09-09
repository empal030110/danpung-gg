import type { z } from "zod";
import type { itemOptionSchema, itemSchema } from "./itemSchema";
import type {
    userSetOptionsSchema,
    userSetSchema,
    symbolSchema,
    abilityInfoSchema,
    abilityPresetSchema,
    androidSchema,
    petEquipmentOptionSchema,
    petEquipmentSchema,
    hyperStatEntrySchema,
    userStatSchema,
    skillSchema,
    hexaStatCoreSchema,
    userUnionSchema,
    unionChampionSchema,
    unionArtifactEffectSchema,
    unionStateStatPresetSchema,
    cashItemSchema,
    achievementRankSchema,
    dojangRankSchema,
} from "./rawSchemas";

export interface userNameProps {
    params: Promise<{ name: string }>;
}

// 넥슨 API 원본 필드(character_name 등)를 화면용 camelCase로 옮겨 담는 결과 타입이라
// 스키마에서 직접 뽑지 않고 그대로 유지한다 (원본 검증은 rawSchemas.userInfoRawSchema가 담당)
export interface userDataProps {
    date: string;
    characterName: string;
    worldName: string;
    characterGender: string;
    characterClass: string;
    characterClassLevel: string;
    characterLevel: number;
    characterExp: number;
    characterExpRate: string;
    characterGuildName: string | null;
    characterImage: string;
    characterDateCreate: string;
    accessFlag: string;
    liberationQuestClearFlag: string;
}

export type userStatProps = z.infer<typeof userStatSchema>;
export type userSetOptions = z.infer<typeof userSetOptionsSchema>;
export type userSetProps = z.infer<typeof userSetSchema>;
export type ability = z.infer<typeof abilityInfoSchema>;
export type abilityProps = z.infer<typeof abilityPresetSchema>;

export type presetNumberProps = number;

// item/title/android 데이터는 넥슨 API 응답을 zod로 검증한 뒤 타입을 그대로 뽑아 쓴다 (itemSchema.ts 참고)
export type itemOptionProps = z.infer<typeof itemOptionSchema>;
export type itemProps = z.infer<typeof itemSchema>;

export interface titleProps {
    title_name?: string | null;
    title_icon?: string | null;
    title_description?: string | null;
    date_expire?: string | null;
    date_option_expire?: string | null;
}

export type androidProps = z.infer<typeof androidSchema>;
export type symbolProps = z.infer<typeof symbolSchema>;
export type petEquipmentOption = z.infer<typeof petEquipmentOptionSchema>;
export type petEquipmentProps = z.infer<typeof petEquipmentSchema>;

// pet_1/2/3_name 같은 동적 키를 pet_name 등으로 옮겨 담는 결과 타입이라 스키마에서 직접 뽑지 않음
// (원본 검증은 rawSchemas.petDataRawSchema가 담당)
export interface petProps {
    pet_name?: string | null;
    pet_icon?: string | null;
    pet_type?: string | null;
    pet_equipment?: petEquipmentProps | null;
}

export type hyperStatEntryProps = z.infer<typeof hyperStatEntrySchema>;
export type skillProps = z.infer<typeof skillSchema>;
export type hexaStatCoreProps = z.infer<typeof hexaStatCoreSchema>;
export type userUnionProps = z.infer<typeof userUnionSchema>;
export type unionChampionProps = z.infer<typeof unionChampionSchema>;
export type unionArtifactEffectProps = z.infer<typeof unionArtifactEffectSchema>;
export type unionStateStatPresetProps = z.infer<typeof unionStateStatPresetSchema>;
export type cashItemProps = z.infer<typeof cashItemSchema>;
export type achievementRankProps = z.infer<typeof achievementRankSchema>;
export type dojangRankProps = z.infer<typeof dojangRankSchema>;
