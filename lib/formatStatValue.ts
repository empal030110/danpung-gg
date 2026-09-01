export default function formatStatValue(value?: string): string {
    if (value === undefined || value === null) return '-';
    // 순수 정수 문자열만 콤마를 붙이고, "77.35" 같은 소수 값은 그대로 둔다 (toLocaleString이 소수 자릿수를 바꿔버림)
    if (/^-?\d+$/.test(value)) {
        return Number(value).toLocaleString();
    }
    return value;
}
