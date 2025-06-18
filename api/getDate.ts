export const getToDate = (): string => {
    const date = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0];
    return date;
};

export const getYdayDate = (): string => {
    const now = new Date(Date.now() + 9 * 60 * 60 * 1000); // KST 기준 시간
    now.setDate(now.getDate() - 1); // 어제로 이동
    return now.toISOString().split("T")[0]; // YYYY-MM-DD 형식 반환
};