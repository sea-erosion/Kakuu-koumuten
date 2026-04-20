'use client'

// 作成日時: 2026-04-18

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

/** 測定値が 0.00 に落ちていくアニメーション */
function useFallingValue(from: number, duration: number) {
  const [value, setValue] = useState(from)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((from * (1 - eased)).toFixed(2)))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [from, duration])

  return value
}

/** グリッチするテキスト */
function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const chars = '境界面測定0123456789abcdef—'

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      if (count >= 8) { setDisplay(text); clearInterval(interval); return }
      setDisplay(text.split('').map(c =>
        Math.random() < 0.3 ? chars[Math.floor(Math.random() * chars.length)] : c
      ).join(''))
      count++
    }, 60)
    return () => clearInterval(interval)
  }, [text])

  return <>{display}</>
}

export default function NotFound() {
  const stability = useFallingValue(0.91, 3200)
  const [phase, setPhase] = useState<'normal' | 'error' | 'deep'>('normal')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('error'), 800)
    const t2 = setTimeout(() => setPhase('deep'),  2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400&family=Noto+Sans+JP:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f9f7f1; }

        /* 上部モニターバー */
        .nf-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 36px;
          background: #2e1c08;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          z-index: 100;
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #8b5a20;
        }
        .nf-bar-status { color: #d4aa30; animation: nf-blink 1.4s ease-in-out infinite; }
        .nf-bar-stability { color: #b87830; transition: color 0.5s; }
        .nf-bar-stability.danger { color: #c0392b; }

        @keyframes nf-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* ページ本体 */
        .nf-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 2rem 3rem;
          position: relative;
          overflow: hidden;
        }

        /* 背景グリッド */
        .nf-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(74,46,16,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,46,16,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .nf-content {
          position: relative;
          z-index: 1;
          max-width: 520px;
          width: 100%;
          text-align: center;
        }

        /* ゾーンラベル */
        .nf-zone {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: #8b5a20;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: nf-up 0.6s ease 0.2s forwards;
        }

        /* 404 */
        .nf-code {
          font-family: 'Noto Serif JP', serif;
          font-weight: 300;
          font-size: clamp(6rem, 20vw, 9.5rem);
          line-height: 1;
          color: #2e1c08;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          opacity: 0;
          animation: nf-up 0.8s ease 0.4s forwards;
          position: relative;
        }
        /* グリッチ重ね文字 */
        .nf-code::after {
          content: '404';
          position: absolute;
          inset: 0;
          color: #b87830;
          clip-path: polygon(0 28%, 100% 28%, 100% 34%, 0 34%);
          opacity: 0;
          animation: nf-glitch 5s ease 2s infinite;
        }
        @keyframes nf-glitch {
          0%, 93%, 100% { opacity: 0; transform: translateX(0); }
          94%  { opacity: 0.7; transform: translateX(-4px); }
          96%  { opacity: 0.4; transform: translateX(4px); }
          98%  { opacity: 0; }
        }

        /* テキスト群 */
        .nf-heading {
          font-family: 'Noto Serif JP', serif;
          font-size: 1.05rem;
          font-weight: 400;
          color: #4a2e10;
          margin-bottom: 0.75rem;
          line-height: 1.7;
          opacity: 0;
          animation: nf-up 0.8s ease 0.7s forwards;
        }
        .nf-sub {
          font-size: 0.78rem;
          color: #8b5a20;
          letter-spacing: 0.05em;
          line-height: 1.9;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: nf-up 0.8s ease 1s forwards;
        }

        /* ARG深層ブロック */
        .nf-deep {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          border: 1px solid #d4aa30;
          padding: 0.85rem 1.25rem;
          margin-bottom: 2.5rem;
          text-align: left;
          opacity: 0;
          transition: opacity 1.4s ease;
          line-height: 2.2;
        }
        .nf-deep.visible { opacity: 1; }
        .nf-deep-row { display: flex; gap: 1rem; }
        .nf-deep-key { color: #6b4218; min-width: 130px; flex-shrink: 0; }
        .nf-deep-val { color: #b87830; }
        .nf-deep-val.err { color: #c0392b; }

        /* 区切り線 */
        .nf-hr {
          width: 40px; height: 1px;
          background: #d4aa30;
          margin: 0 auto 2rem;
          opacity: 0;
          animation: nf-up 0.6s ease 1.2s forwards;
        }

        /* ボタン群 */
        .nf-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          animation: nf-up 0.8s ease 1.5s forwards;
        }
        .nf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2.5rem;
          background: #4a2e10;
          color: #f5e6c8;
          font-family: 'Noto Serif JP', serif;
          font-size: 0.83rem;
          letter-spacing: 0.18em;
          text-decoration: none;
          border: 1px solid #4a2e10;
          transition: background 0.2s;
        }
        .nf-btn:hover { background: #2e1c08; }
        .nf-link {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: #8b5a20;
          letter-spacing: 0.18em;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nf-link:hover { color: #4a2e10; border-bottom-color: #4a2e10; }

        @keyframes nf-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* モニターバー */}
      <div className="nf-bar">
        <span>架空工務店 — BOUNDARY MANAGEMENT SYSTEM</span>
        <span className={`nf-bar-stability${stability < 0.3 ? ' danger' : ''}`}>
          STABILITY: {stability.toFixed(2)}
        </span>
        <span className="nf-bar-status">
          {phase === 'normal' ? '● SCANNING' : phase === 'error' ? '● ERROR' : '● ZONE_NULL'}
        </span>
      </div>

      <div className="nf-root">
        <div className="nf-content">

          {/* ゾーンラベル */}
          <p className="nf-zone">
            Zone — {phase === 'deep' ? 'NULL / 未登録区画' : '照合中...'}
          </p>

          {/* 404 */}
          <div className="nf-code">
            <GlitchText text="404" />
          </div>

          {/* 見出し */}
          <p className="nf-heading">お探しのページは見つかりませんでした</p>
          <p className="nf-sub">
            URLが正しいかご確認ください。<br />
            お問い合わせには、正確な言葉をお使いください。
          </p>

          {/* ARG深層ブロック */}
          <div className={`nf-deep${phase === 'deep' ? ' visible' : ''}`}>
            <div className="nf-deep-row">
              <span className="nf-deep-key">REQUEST_PATH</span>
              <span className="nf-deep-val err">— UNREGISTERED —</span>
            </div>
            <div className="nf-deep-row">
              <span className="nf-deep-key">ZONE_MATCH</span>
              <span className="nf-deep-val err">NOT FOUND</span>
            </div>
            <div className="nf-deep-row">
              <span className="nf-deep-key">BOUNDARY_ID</span>
              <span className="nf-deep-val">Z-005 / 未分類</span>
            </div>
            <div className="nf-deep-row">
              <span className="nf-deep-key">STABILITY</span>
              <span className="nf-deep-val err">{stability.toFixed(2)} → 0.00</span>
            </div>
            <div className="nf-deep-row">
              <span className="nf-deep-key">NOTE</span>
              <span className="nf-deep-val">正確な言葉を使えば、辿り着ける</span>
            </div>
          </div>

          <div className="nf-hr" />

          {/* ナビ */}
          <nav className="nf-nav">
            <Link href="/" className="nf-btn">トップページへ戻る</Link>
            <Link href="/contact" className="nf-link">お問い合わせ →</Link>
          </nav>

        </div>
      </div>
    </>
  )
}
