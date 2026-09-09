import { expect, test } from "@playwright/test";

// 넥슨 Open API를 실제로 호출하는 골든패스 E2E. 종합랭킹 1위는 잘 안 바뀌지 않는 한 계속 유효한 캐릭터라 고정 이름으로 사용한다.
const REAL_CHARACTER_NAME = "오지환";

test("메인 페이지에 검색창과 네비게이션이 보인다", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByPlaceholder("캐릭터 이름을 입력하세요")).toBeVisible();
    await expect(page.getByRole("link", { name: "길드" })).toBeVisible();
    await expect(page.getByRole("link", { name: "즐겨찾기" })).toBeVisible();
});

test("캐릭터를 검색하면 상세 페이지로 이동하고 탭을 전환할 수 있다", async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("캐릭터 이름을 입력하세요").fill(REAL_CHARACTER_NAME);
    await page.getByPlaceholder("캐릭터 이름을 입력하세요").press("Enter");

    await expect(page).toHaveURL(new RegExp(`/user/${encodeURIComponent(REAL_CHARACTER_NAME)}`));
    await expect(page.getByRole("heading", { name: REAL_CHARACTER_NAME })).toBeVisible();

    // 기본은 장비 탭 - 프리셋 탭이 보인다
    await expect(page.getByText("프리셋 1")).toBeVisible();

    // 스탯 탭으로 전환하면 기본/상세 스탯이 보인다
    await page.getByRole("button", { name: "스탯", exact: true }).click();
    await expect(page.getByText("기본 스탯")).toBeVisible();
    await expect(page.getByText("상세 스탯")).toBeVisible();
});

test("캐릭터 상세 페이지에서 즐겨찾기를 추가하면 즐겨찾기 페이지에도 나타난다", async ({ page }) => {
    await page.goto(`/user/${encodeURIComponent(REAL_CHARACTER_NAME)}`);

    const favoriteButton = page.getByRole("button", { name: "즐겨찾기 추가" });
    await favoriteButton.click();
    await expect(page.getByRole("button", { name: "즐겨찾기 해제" })).toBeVisible();

    await page.goto("/favorites");

    await expect(page.getByText(REAL_CHARACTER_NAME)).toBeVisible();
});

test("존재하지 않는 캐릭터를 검색하면 에러 안내를 보여준다", async ({ page }) => {
    await page.goto("/user/존재하지않는캐릭터이름테스트12345");

    await expect(page.getByText("정보를 불러오지 못했어요.")).toBeVisible();
});
