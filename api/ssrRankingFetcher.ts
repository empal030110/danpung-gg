import { getToDate, getYdayDate } from '@/api/getDate';
import ssrFetcher from '@/api/ssrFetcher';

export default async function ssrRankingFetcher(buildUrl: (date: string) => string) {
    try {
        return await ssrFetcher(buildUrl(getToDate()));
    } catch (error) {
        const isDataNotReady = error instanceof Error && error.message.includes('OPENAPI00009');
        if (!isDataNotReady) throw error;

        // 당일 랭킹 데이터가 아직 집계 전이면 전날 데이터로 재시도
        return await ssrFetcher(buildUrl(getYdayDate()));
    }
}
