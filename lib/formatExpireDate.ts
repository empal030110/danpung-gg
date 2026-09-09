export const formatExpireDate = (iso: string): string | null => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return null; // date_option_expire는 만료 시 날짜 대신 "expired" 문자열이 내려옴

    // Intl.DateTimeFormat('ko-KR', { hour12: true })는 Node의 ICU 데이터 버전에 따라
    // "오후"/"PM"이 갈려서(로컬은 오후, 일부 CI 환경은 PM) 직접 계산해 환경에 관계없이 고정한다.
    const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const year = kst.getUTCFullYear();
    const month = kst.getUTCMonth() + 1;
    const day = kst.getUTCDate();
    const hour24 = kst.getUTCHours();
    const minute = kst.getUTCMinutes();
    const period = hour24 < 12 ? "오전" : "오후";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

    return `${year}년 ${month}월 ${day}일 ${period} ${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")}까지 사용 가능`;
};
