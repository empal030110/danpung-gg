"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import UserNavbar from "./UserNavbar";

const TAB_KEYS = ["equipment", "stat", "skill", "union", "codi", "etc"] as const;

// 탭 전환 UI만 담당한다. 탭별 데이터/구성은 panels로 완성된 패널을 그대로 받아 렌더링만 함
export default function UserInfoTabs({ panels }: { panels: React.ReactNode[] }) {
    const [activeTab, setActiveTab] = useState(0);
    const t = useTranslations("userTabs");
    const tabs = TAB_KEYS.map((key) => t(key));

    return (
        <div className="w-full z-10">
            <UserNavbar tabs={tabs} active={activeTab} onSelect={setActiveTab} />
            {panels[activeTab]}
        </div>
    );
}
