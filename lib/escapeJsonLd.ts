// JSON.stringify는 "</script>" 같은 시퀀스를 이스케이프하지 않아서, 그 문자열이 값 안에
// 섞여 들어오면 JSON-LD를 담은 <script> 태그를 탈출할 수 있다. "<"만 유니코드 이스케이프해서 막는다.
export const escapeJsonLd = (data: unknown): string => JSON.stringify(data).replace(/</g, "\\u003c");
