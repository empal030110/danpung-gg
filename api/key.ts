if (!process.env.NX_OPEN_API_KEY) {
    throw new Error("NX_OPEN_API_KEY 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
}

export const apiKey = process.env.NX_OPEN_API_KEY;