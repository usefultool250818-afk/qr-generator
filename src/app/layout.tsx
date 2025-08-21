// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://qr-generator-bice-nu.vercel.app"),
  title: { default: "QRコード生成 | 便利ツール", template: "%s | 便利ツール" },
  description: "文字やURLから即時にQRコードを作成。PNG/SVGのコピー・ダウンロードに対応。処理はブラウザ内で完結します。",
  keywords: ["QR", "QRコード", "QR generator", "PNG", "SVG", "誤り訂正", "Quiet Zone"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "便利ツール",
    title: "QRコード生成 | 便利ツール",
    description: "文字やURLから即時にQRコードを作成。PNG/SVGのコピー・ダウンロードに対応。処理はブラウザ内で完結します。",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "QRコード生成" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QRコード生成 | 便利ツール",
    description: "文字やURLから即時にQRコードを作成。PNG/SVGのコピー・ダウンロードに対応。",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEF2FF" }, // indigo-50相当
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },  // slate-950相当
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full scroll-smooth" suppressHydrationWarning>
      {/* GA4（測定IDはそのまま） */}
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NYS6YPJC8G"
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
          "antialiased min-h-dvh text-slate-900 dark:text-slate-100",
          "bg-slate-50 dark:bg-slate-950",
        ].join(" ")}
      >
        {/* 淡いグラデ背景（moji-counterと統一の質感） */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-indigo-50/60 via-transparent to-transparent dark:from-indigo-950/30" />

        {/* 共通ヘッダー（相互リンク） */}
        <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <a href="/" className="font-semibold tracking-tight">QRコード生成</a>
            <nav className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <a
                href="https://qr-generator-bice-nu.vercel.app/"
                className="rounded-lg px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                QR生成
              </a>
              <a
                href="https://moji-counter-xi.vercel.app/"
                className="rounded-lg px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                文字数
              </a>
            </nav>
          </div>
        </header>

        {/* メイン */}
        <div className="mx-auto max-w-6xl px-4">
          {children}
        </div>

        {/* フッター（統一の注意書き） */}
        <footer className="mt-12 border-t border-slate-200/60 py-8 text-sm text-slate-500 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-4">
            <p className="mb-1">※ 生成は端末内で完結します（サーバー送信なし）。</p>
            <p className="text-xs">© {new Date().getFullYear()} qr-generator. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
