// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ← 大文字Sで

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://qr-generator-bice-nu.vercel.app"),
  title: { default: "QRコード生成 | 便利ツール", template: "%s | 便利ツール" },
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
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full scroll-smooth" suppressHydrationWarning>
      {/* head直下にGAを追加（bodyでもOK） */}
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NYS6YPJC8G" // ←測定IDを正確に
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NYS6YPJC8G');
          `}
        </Script>
      </head>

      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-dvh",
          "bg-gradient-to-b from-white to-slate-50 text-slate-900",
          "dark:from-slate-950 dark:to-slate-900 dark:text-slate-100",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
