import { defineConfig, defaultExclude } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    // tsconfig.json의 jsx: "preserve"는 Next.js SWC가 처리하는 값이라, oxc(이 Vite 버전의 기본 트랜스포머)가 대신 직접 변환하도록 지정
    oxc: {
        jsx: "automatic",
    },
    resolve: {
        alias: {
            "@": path.resolve(dirname, "."),
        },
    },
    test: {
        environment: "node", // 대부분 순수 로직 테스트라 기본은 node. 컴포넌트/훅 테스트만 파일 상단에 `// @vitest-environment jsdom` 지정
        setupFiles: ["./vitest.setup.ts"],
        exclude: [...defaultExclude, "e2e/**"], // e2e/*.spec.ts는 playwright 전용
    },
});
