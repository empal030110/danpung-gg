import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// vitest.config.mts에서 test.globals를 켜지 않아 RTL이 afterEach를 자동으로 못 찾으므로 직접 등록
afterEach(() => {
    cleanup();
});
