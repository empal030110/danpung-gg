import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "empal03 - 단풍지지 - 메이플스토리 통계 & 분석 플랫폼",
    description: "empal03 - 메이플스토리 직업 통계, 길드 분석, 유저 정보 등을 제공하는 단풍지지 플랫폼입니다.",
    keywords: ["메이플스토리", "직업 통계", "길드 분석", "단풍지지", "MapleStory", "danpungGG"],
	authors: [{ name: "empal03", url: "https://maple-gg.vercel.app" }],
    creator: "empal03",
    publisher: "empal03",

    openGraph: {
		title: "empal03 - 단풍지지 - 메이플스토리 통계 & 분석 플랫폼",
		description: "empal03 - 메이플스토리 직업 통계, 길드 분석, 유저 정보 등을 제공하는 단풍지지 플랫폼입니다.",
		url: "https://maple-gg.vercel.app",
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
        </div>
      </body>
    </html>
  );
}
