"use client";

import { useState } from "react";
import UserNavbar from "./UserNavbar";

const TABS = ["장비", "스탯", "스킬", "유니온", "코디", "기타"];

// 탭 전환 UI만 담당한다. 탭별 데이터/구성은 panels로 완성된 패널을 그대로 받아 렌더링만 함
export default function UserInfoTabs({ panels }: { panels: React.ReactNode[] }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full z-10">
            <UserNavbar tabs={TABS} active={activeTab} onSelect={setActiveTab} />
            {panels[activeTab]}
        </div>
    );
}
