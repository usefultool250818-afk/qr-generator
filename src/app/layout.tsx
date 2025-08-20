import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qr-generator-bice-nu.vercel.app"),
  title: {
    default: "QRコード生成 | 便利ツール",
    template: "%s | 便利ツール",
  },
  description:
    "文字やURLから即時にQRコードを作成。SVG表示とPNGダウンロードに対応。処理はブラウザ内で完結します。",
  openGraph: {
    type: "website",
    url: "/",
    title: "QRコード生成 | 便利ツール",
    description:
      "文字やURLから即時にQRコードを作成。SVG表示とPNGダウンロードに対応。処理はブラウザ内で完結します。",
    siteName: "便利ツール",
  },
  twitter: {
    card: "summary",
    title: "QRコード生成 | 便利ツール",
    description:
      "文字やURLから即時にQRコードを作成。SVG表示とPNGダウンロードに対応。",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: { index: true, follow: true },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }, // slate-900
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-dvh",
          // 背景と文字色（ライト/ダーク）
          "bg-gradient-to-b from-white to-slate-50 text-slate-900",
          "dark:from-slate-950 dark:to-slate-900 dark:text-slate-100",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
