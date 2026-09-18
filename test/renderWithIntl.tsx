import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/ko.json";

// 컴포넌트 테스트에서 useTranslations를 쓰는 컴포넌트를 렌더링할 때 공용으로 쓰는 provider 래퍼
export function renderWithIntl(ui: ReactElement) {
    return render(<NextIntlClientProvider locale="ko" messages={messages}>{ui}</NextIntlClientProvider>);
}
