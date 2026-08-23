'use client';

import { useEffect } from "react";

// next-pwa가 sw.js/manifest는 빌드해주지만, App Router에서는 등록 스크립트를 자동으로 넣어주지 않아 직접 등록
export default function ServiceWorkerRegister() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {}); // 개발 환경 등 sw.js가 없는 경우는 조용히 무시
        }
    }, []);

    return null;
}
