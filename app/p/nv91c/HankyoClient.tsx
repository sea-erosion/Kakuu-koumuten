'use client'

// 編集日時: 2026-04-18

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Echo = { id: number; text: string; x: number; y: number }

const REVEAL_THRESHOLD = 15 // このエコー数を超えると号外リンクが浮かぶ

export default function HankyoClient() {
  const [echoes, setEchoes] = useState<Echo[]>([])
  const [counter, setCounter] = useState(0)
  const [totalTyped, setTotalTyped] = useState(0)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!val) return
    setCounter((c) => c + 1)
    setTotalTyped((t) => t + 1)
    setEchoes((prev) => [
      ...prev.slice(-40),
      { id: counter, text: val, x: Math.random() * 78 + 8, y: Math.random() * 78 + 8 },
    ])
  }

  const showNewspaper = totalTyped >= REVEAL_THRESHOLD

  return (
    <div style={{ backgroundColor: '#f5f4f2', minHeight: '100vh', position: 'relative', overflow: 'hidden', fontFamily: '"Noto Serif JP", serif' }}>
      {/* 次: うらがわをみせて */}
      <AnimatePresence>
        {echoes.map((echo) => (
          <motion.span
            key={echo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.13 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', left: `${echo.x}%`, top: `${echo.y}%`, color: '#6b6560', fontSize: '0.9rem', pointerEvents: 'none', whiteSpace: 'nowrap', userSelect: 'none' }}
          >
            {echo.text}
          </motion.span>
        ))}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#b0ada8', marginBottom: '3rem', textTransform: 'uppercase' }}>Zone C — 反響域</p>
        <p style={{ color: '#8a8580', fontSize: '0.85rem', marginBottom: '2rem' }}>ここでは、言葉が残ります。</p>
        <input
          type="text"
          onChange={handleInput}
          placeholder="何か入力してください"
          style={{ width: '300px', maxWidth: '90vw', border: 'none', borderBottom: '1px solid #c0bdb8', background: 'transparent', padding: '0.75rem 0', fontSize: '0.9rem', color: '#6b6560', outline: 'none', fontFamily: '"Noto Serif JP", serif', textAlign: 'center' }}
        />

        {/* 号外リンク：エコーが閾値を超えると静かに浮かび上がる */}
        <AnimatePresence>
          {showNewspaper && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
              style={{ marginTop: '4rem', textAlign: 'center' }}
            >
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#c0bdb8', marginBottom: '1rem', textTransform: 'uppercase' }}>
                — 残響の中に、何かが混じっている —
              </p>
              <Link
                href="/p/g7nkf"
                style={{
                  display: 'inline-block',
                  border: '1px solid #c0bdb8',
                  padding: '0.6rem 1.6rem',
                  fontSize: '0.75rem',
                  color: '#8a8580',
                  letterSpacing: '0.2em',
                  fontFamily: '"Noto Serif JP", serif',
                  textDecoration: 'none',
                  transition: 'all 0.4s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#3a3530'
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#3a3530'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#8a8580'
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#c0bdb8'
                }}
              >
                号　外
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
