"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import QR from "qrcode";

export default function Home() {
  const [text, setText] = useState("");
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // 入力が変わるたびにPNGデータURLを生成（SVG表示はリアルタイム、PNGはダウンロード用）
  useEffect(() => {
    if (!text) {
      setPngUrl(null);
      return;
    }
    QR.toDataURL(text, { width: 512, margin: 1 })
      .then(setPngUrl)
      .catch(() => setPngUrl(null));
  }, [text]);

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>QRコード生成</h1>
      <p style={{ color: "#444", marginBottom: 16 }}>
        文字やURLを入力すると、QRコードを即時に生成します（SVG表示／PNG保存に対応）。
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="https://example.com や 任意の文字列を入力"
        style={{
          width: "100%",
          fontSize: 16,
          padding: 12,
          border: "2px solid #333",
          borderRadius: 8,
          boxSizing: "border-box",
        }}
      />

      <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
        <div
          style={{
            background: "white",
            padding: 16,
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            display: "inline-block",
            width: "fit-content",
          }}
        >
          {text ? (
            <QRCode value={text} size={192} />
          ) : (
            <div style={{ color: "#777" }}>入力するとQRコードを表示します</div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            ref={btnRef}
            onClick={() => {
              navigator.clipboard.writeText(text || "").catch(() => {});
            }}
            disabled={!text}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #ccc",
              background: text ? "#f8f8f8" : "#eee",
              cursor: text ? "pointer" : "not-allowed",
            }}
          >
            入力テキストをコピー
          </button>

          <a
            href={pngUrl ?? undefined}
            download="qrcode.png"
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #ccc",
              background: pngUrl ? "#f8f8f8" : "#eee",
              color: "inherit",
              textDecoration: "none",
              pointerEvents: pngUrl ? "auto" : "none",
            }}
          >
            PNGをダウンロード
          </a>
        </div>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#666" }}>
        ※ データはサーバーに送信されません。ブラウザ内で生成しています。
      </p>
    </main>
  );
}
