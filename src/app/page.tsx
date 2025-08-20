"use client";

import { useEffect, useRef, useState } from "react";
import QR from "qrcode";

type Level = "L" | "M" | "Q" | "H";

export default function Page() {
  // 入力と設定
  const [text, setText] = useState("");
  const [size, setSize] = useState<number>(256);
  const [level, setLevel] = useState<Level>("M");
  const [fg, setFg] = useState("#111827"); // slate-900
  const [bg, setBg] = useState("#ffffff");

  // プレビュー用
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  // 変更のたびにプレビュー更新
  useEffect(() => {
    if (!canvasRef.current) return;
    const draw = async () => {
      try {
        setError(null);
        if (!text) {
          const ctx = canvasRef.current!.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          }
          return;
        }
        await QR.toCanvas(canvasRef.current!, text, {
          width: size,
          errorCorrectionLevel: level,
          color: {
            dark: fg,
            light: bg,
          },
          margin: 2, // Quiet Zone
        });
      } catch (e) {
        setError("QRコードの生成に失敗しました。入力内容をご確認ください。");
      }
    };
    draw();
  }, [text, size, level, fg, bg]);

  const handleCopyPng = async () => {
    if (!canvasRef.current) return;
    return new Promise<void>((resolve) => {
      canvasRef.current!.toBlob(async (blob) => {
        if (!blob) return resolve();
        try {
          await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        } catch {
          // フォールバックなし（古いブラウザでは失敗する可能性）
        }
        resolve();
      });
    });
  };

  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">QRコード生成</h1>
        <p className="text-slate-600 dark:text-slate-300">
          テキストやURLを入力すると即時にQRを作成。<span className="font-medium">PNGコピー</span>／
          <span className="font-medium">PNGダウンロード</span>に対応。データは<strong>ブラウザ内処理</strong>です。
        </p>
      </section>

      {/* Builder */}
      <section className="mt-8 grid gap-6 md:gap-8 md:grid-cols-2">
        {/* 入力フォーム */}
        <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-medium">テキスト / URL</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                placeholder="https://example.com など"
                aria-label="QRに変換するテキストまたはURL"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400
                           focus:outline-none focus:ring-4 focus:ring-indigo-100
                           dark:bg-slate-950 dark:border-slate-800"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{text.length} 文字</span>
                <span aria-live="polite">{error ? "エラーがあります" : "\u00A0"}</span>
              </div>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1">
                <span className="text-sm font-medium">サイズ（px）</span>
                <input
                  type="number"
                  min={128}
                  max={1024}
                  value={size}
                  onChange={(e) => setSize(Math.min(1024, Math.max(128, Number(e.target.value) || 256)))}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm
                             focus:outline-none focus:ring-4 focus:ring-indigo-100
                             dark:bg-slate-950 dark:border-slate-800"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium">誤り訂正</span>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as Level)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm
                             focus:outline-none focus:ring-4 focus:ring-indigo-100
                             dark:bg-slate-950 dark:border-slate-800"
                >
                  <option value="L">L（~7%）</option>
                  <option value="M">M（~15%）</option>
                  <option value="Q">Q（~25%）</option>
                  <option value="H">H（~30%）</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1">
                <span className="text-sm font-medium">前景色</span>
                <input
                  type="color"
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-300 bg-white p-1 shadow-sm
                             dark:bg-slate-950 dark:border-slate-800"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium">背景色</span>
                <input
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-300 bg-white p-1 shadow-sm
                             dark:bg-slate-950 dark:border-slate-800"
                />
              </label>
            </div>

            {error && (
              <p className="text-sm text-rose-600 dark:text-rose-400" role="alert">
                {error}
              </p>
            )}

            <p className="text-xs text-slate-500">
              個人情報や機密情報の入力はお控えください。生成は端末内で完結します（送信なし）。
            </p>
          </div>
        </div>

        {/* プレビュー */}
        <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4">
            <div className="aspect-square w-full rounded-xl border bg-white p-4 dark:border-slate-800 dark:bg-slate-950 grid place-items-center">
              {text ? (
                <canvas
                  ref={canvasRef}
                  width={size}
                  height={size}
                  className="h-auto w-full max-w-[min(90%,560px)]"
                  aria-label="QRコード プレビュー"
                />
              ) : (
                <p className="text-slate-500 text-sm">入力するとここにQRコードが表示されます</p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopyPng}
                disabled={!text}
                className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium shadow-sm
                           bg-indigo-600 text-white hover:bg-indigo-500 active:translate-y-[1px]
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PNGをコピー
              </button>
              <button
                onClick={handleDownloadPng}
                disabled={!text}
                className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium shadow-sm
                           bg-white text-slate-900 hover:bg-slate-50 active:translate-y-[1px]
                           dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900
                           border-slate-300 dark:border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PNGをダウンロード
              </button>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-slate-500">
        ※ サーバー送信なし／ブラウザ内生成
      </p>
    </main>
  );
}
