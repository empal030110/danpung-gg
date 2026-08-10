import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.danpung.shop"),
    title: "단풍지지 - 메이플스토리 통계 & 분석 플랫폼",
    description: "메이플스토리 직업 통계, 길드 분석, 유저 정보 등을 제공하는 단풍지지 플랫폼입니다.",
    keywords: ["메이플스토리", "직업 통계", "길드 분석", "단풍지지", "MapleStory", "danpungGG"],
	  authors: [{ name: "empal03", url: "https://www.danpung.shop" }],
    creator: "empal03",
    publisher: "empal03",

    verification: {
        other: {
            "naver-site-verification": "d77e2b48492c5ab7becba5cec13e268567b9d472",
        },
    },

    openGraph: {
		title: "단풍지지 - 메이플스토리 통계 & 분석 플랫폼",
		description: "메이플스토리 직업 통계, 길드 분석, 유저 정보 등을 제공하는 단풍지지 플랫폼입니다.",
		url: "https://www.danpung.shop",
		siteName: "단풍지지",
		locale: "ko_KR",
		type: "website",
		images: [
		{
			url: "/danpungGG.png",
			width: 1200,
			height: 630,
			alt: "단풍지지 - 메이플 통계 플랫폼",
		},
		],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#171717" />
          <link rel="apple-touch-icon" href="/icons/icon192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#171717] text-black dark:text-white`}>
        <div className="w-full max-w-[940px] m-auto px-[20px]">
          <Header />
          {children}
          <div className="w-full py-[24px] mt-[40px] border-t border-neutral-600 text-center text-[12px] text-neutral-500 dark:text-neutral-400">
            본 서비스는 NEXON Open API를 이용하여 제작되었으며, 넥슨 및 메이플스토리와 공식적으로 제휴되어 있지 않습니다.
          </div>
          <Analytics />
          <Script src="https://openapi.nexon.com/js/analytics.js?app_id=324464" strategy="afterInteractive" />
        </div>
      </body>
    </html>
  );
}
