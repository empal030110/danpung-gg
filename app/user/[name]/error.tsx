'use client'

import ErrorInfoPage from "@/components/ErrorInfoPage";

export default function error() {
    return <ErrorInfoPage message="오타가 있거나 정지된 캐릭터일 수 있습니다. (영어 대소문자 구분 필요)" />;
}