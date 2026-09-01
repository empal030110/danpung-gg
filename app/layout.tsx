import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next"
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

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

    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
        ],
        apple: "/icons/apple-icon.png",
    },

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

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "단풍지지",
    url: "https://www.danpung.shop",
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.danpung.shop/user/{search_term_string}",
        },
        "query-input": "required name=search_term_string",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className="overflow-x-hidden">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#171717" />
          {/* 애드센스 로더가 head의 스크립트 태그를 자기 용도로 덮어써서 하이드레이션 diff가 발생 -> 이 노드는 비교 대상에서 제외 */}
          <script
            suppressHydrationWarning
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `(function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              })();`,
            }}
          />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#171717] text-black dark:text-white overflow-x-hidden`}>
        <div className="w-full max-w-[940px] m-auto px-[20px] pc:px-0">
          <Header />
          <ServiceWorkerRegister />
          <main>{children}</main>
          <footer className="w-full py-[24px] mt-[40px] border-t border-neutral-600 flex flex-col items-center gap-[8px] text-center text-[12px] text-neutral-500 dark:text-neutral-400">
            <p>본 서비스는 NEXON Open API를 이용하여 제작되었으며, 넥슨 및 메이플스토리와 공식적으로 제휴되어 있지 않습니다.</p>
            <Link href="/privacy" className="underline hover:text-neutral-700 dark:hover:text-neutral-200">개인정보처리방침</Link>
          </footer>
          <Analytics />
          <Script src="https://openapi.nexon.com/js/analytics.js?app_id=324464" strategy="afterInteractive" />
          {/* next/script가 head 삽입/실행을 직접 관리해서, 손으로 쓴 <script>와 달리 애드센스 로더가 head를 건드려도 하이드레이션 충돌이 안 남 */}
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6300700013993932"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        </div>
      </body>
    </html>
  );
}
