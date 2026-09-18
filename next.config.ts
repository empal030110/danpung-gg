import type { NextConfig } from "next";
import withPWA from "next-pwa";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        domains: ["open.api.nexon.com"],
        unoptimized: true,
    },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(
    withPWA({
        dest: "public",
        disable: process.env.NODE_ENV === "development",
    })(nextConfig),
);
