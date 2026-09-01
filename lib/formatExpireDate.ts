export const formatExpireDate = (iso: string): string | null => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return null; // date_option_expire는 만료 시 날짜 대신 "expired" 문자열이 내려옴

    const formatted = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);

    return `${formatted}까지 사용 가능`;
};
