import { getToDate } from '@/api/getDate';

export const dojangUrl = `https://open.api.nexon.com/maplestory/v1/ranking/dojang?date=${getToDate()}&difficulty=0&page=1`;
