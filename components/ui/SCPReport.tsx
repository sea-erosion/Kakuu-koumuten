// 作成日時: 2026-04-18
// SCPレポート風レイアウトコンポーネント
// 使用例は components/ui/SCPReport.md を参照

import React from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   型定義
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** 収容クラス */
export type ObjectClass =
  | 'Safe'
  | 'Euclid'
  | 'Keter'
  | 'Thaumiel'
  | 'Neutralized'
  | 'Pending'
  | 'Unclassified'

/** 文書のセキュリティクリアランス */
export type ClearanceLevel = 1 | 2 | 3 | 4 | 5

/** ログのタイプ */
export type LogType = 'experiment' | 'interview' | 'incident' | 'note'

/** ログの1エントリ */
export interface SCPLogEntry {
  label: string          // 「実験記録 01」「インタビュー記録 A」など
  type?: LogType
  meta?: Record<string, string>  // 日付・担当者・場所など
  content: React.ReactNode
}

/** テーブルの行 */
export interface SCPTableRow {
  cells: React.ReactNode[]
}

/** テーブル定義 */
export interface SCPTable {
  caption?: string
  headers: string[]
  rows: SCPTableRow[]
}

/** 評価ブロック（収容クラス一覧など） */
export interface SCPRating {
  label: string
  value: React.ReactNode
  color?: 'red' | 'orange' | 'green' | 'gray' | 'black'
}

/** レポート全体のProps */
export interface SCPReportProps {
  /** アイテム番号（例: 'KK-0091', 'SCP-XXXX'） */
  itemNumber: string
  /** オブジェクトクラス */
  objectClass: ObjectClass
  /** セキュリティクリアランス */
  clearance?: ClearanceLevel
  /** レポートタイトル（非公式称号など） */
  title?: string
  /** 評価ブロック群（収容クラス・破壊クラスなど） */
  ratings?: SCPRating[]
  /** 特別収容手順 */
  containmentProcedures: React.ReactNode
  /** 説明 */
  description: React.ReactNode
  /** 補遺・追記（複数） */
  addenda?: SCPLogEntry[]
  /** フッター注記 */
  footerNote?: React.ReactNode
  /** 文書番号・作成日など */
  docMeta?: Record<string, string>
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CSS 定義
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const SCP_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;700&display=swap');

/* ── CSS変数 ── */
.scp-root {
  --scp-bg:           #f4f4f0;
  --scp-bg-inner:     #fafaf8;
  --scp-border:       #ccccbe;
  --scp-border-dark:  #888880;
  --scp-text:         #1a1a16;
  --scp-text-muted:   #555550;
  --scp-text-faint:   #999990;
  --scp-red:          #8b0000;
  --scp-red-bg:       #f5e8e8;
  --scp-orange:       #8b4500;
  --scp-orange-bg:    #f5ede0;
  --scp-green:        #1a5c1a;
  --scp-green-bg:     #e8f0e8;
  --scp-black:        #0a0a08;
  --scp-mono:         'Share Tech Mono', 'Courier New', monospace;
  --scp-sans:         'Noto Sans JP', sans-serif;
  --scp-serif:        'Noto Serif JP', serif;
}

/* ── ベース ── */
.scp-root {
  font-family: var(--scp-sans);
  font-size: 14px;
  color: var(--scp-text);
  background: var(--scp-bg);
  line-height: 1.7;
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
}
.scp-root p   { margin: 0 0 1em; }
.scp-root ul  { margin: 0 0 1em; padding-left: 2em; }
.scp-root li  { margin-bottom: 0.3em; }
.scp-root strong { font-weight: 700; }
.scp-root em     { font-style: italic; }

/* ── トップバナー（機密区分） ── */
.scp-banner {
  font-family: var(--scp-mono);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-align: center;
  padding: 6px 0;
  margin-bottom: 1.5rem;
  border-top: 2px solid var(--scp-border-dark);
  border-bottom: 2px solid var(--scp-border-dark);
  background: var(--scp-text);
  color: #f0f0e8;
  text-transform: uppercase;
  user-select: none;
}
.scp-banner.scp-banner-red    { background: var(--scp-red);    color: #fff; }
.scp-banner.scp-banner-orange { background: var(--scp-orange); color: #fff; }

/* ── ヘッダー ── */
.scp-header {
  border: 1px solid var(--scp-border-dark);
  background: var(--scp-bg-inner);
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  position: relative;
}
.scp-header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--scp-border);
}
.scp-item-number {
  font-family: var(--scp-mono);
  font-size: 2rem;
  font-weight: normal;
  color: var(--scp-text);
  letter-spacing: 0.05em;
  line-height: 1;
}
.scp-item-title {
  font-family: var(--scp-serif);
  font-size: 1rem;
  color: var(--scp-text-muted);
  margin-top: 0.4rem;
  font-weight: 400;
}
.scp-clearance {
  font-family: var(--scp-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  border: 1px solid var(--scp-border-dark);
  padding: 4px 10px;
  color: var(--scp-text-muted);
  white-space: nowrap;
  text-transform: uppercase;
  flex-shrink: 0;
}

/* ── 評価グリッド（収容クラスなど） ── */
.scp-ratings {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px;
}
.scp-rating-item {
  border: 1px solid var(--scp-border);
  padding: 8px 12px;
  background: var(--scp-bg);
}
.scp-rating-label {
  font-family: var(--scp-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--scp-text-faint);
  text-transform: uppercase;
  margin-bottom: 4px;
}
.scp-rating-value {
  font-family: var(--scp-mono);
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.05em;
}
.scp-rating-red    .scp-rating-value { color: var(--scp-red); }
.scp-rating-orange .scp-rating-value { color: var(--scp-orange); }
.scp-rating-green  .scp-rating-value { color: var(--scp-green); }
.scp-rating-gray   .scp-rating-value { color: var(--scp-text-muted); }
.scp-rating-black  .scp-rating-value { color: var(--scp-black); }

/* ── セクション ── */
.scp-section {
  background: var(--scp-bg-inner);
  border: 1px solid var(--scp-border);
  margin-bottom: 1rem;
  overflow: hidden;
}
.scp-section-header {
  font-family: var(--scp-mono);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  padding: 8px 16px;
  background: var(--scp-text);
  color: #f0f0e8;
  user-select: none;
  border-bottom: 1px solid var(--scp-border-dark);
}
.scp-section-header.scp-sh-red    { background: var(--scp-red); }
.scp-section-header.scp-sh-orange { background: var(--scp-orange); }
.scp-section-body {
  padding: 1.25rem 1.5rem;
}

/* ── 警告ボックス ── */
.scp-warning {
  border: 2px solid var(--scp-red);
  background: var(--scp-red-bg);
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}
.scp-warning-title {
  font-family: var(--scp-mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--scp-red);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.scp-warning-title::before { content: '⚠'; font-size: 14px; }
.scp-warning p { color: var(--scp-red); margin: 0; font-size: 13px; }

/* ── 黒塗り ── */
.scp-redacted {
  display: inline-block;
  background: var(--scp-text);
  color: var(--scp-text);
  padding: 0 4px;
  border-radius: 1px;
  user-select: none;
  cursor: default;
  font-family: var(--scp-mono);
  font-size: 0.9em;
  letter-spacing: 0.05em;
  transition: background 0.3s, color 0.3s;
}
.scp-redacted:hover {
  background: var(--scp-red);
  color: var(--scp-red);
}

/* ── クリアランスブロック（ホバーで解除される黒塗り） ── */
.scp-classified {
  display: inline-block;
  background: var(--scp-text);
  color: transparent;
  padding: 0 6px;
  border-radius: 1px;
  cursor: pointer;
  font-family: var(--scp-mono);
  font-size: 0.9em;
  letter-spacing: 0.05em;
  transition: background 0.4s, color 0.4s;
  position: relative;
}
.scp-classified:hover {
  background: #f4f4f0;
  color: var(--scp-red);
  border: 1px solid var(--scp-red);
  padding: 0 5px;
}

/* ── 注釈 ── */
.scp-note {
  border-left: 3px solid var(--scp-border-dark);
  background: var(--scp-bg);
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  font-size: 13px;
  color: var(--scp-text-muted);
}
.scp-note-label {
  font-family: var(--scp-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--scp-text-faint);
  text-transform: uppercase;
  margin-bottom: 4px;
}

/* ── テーブル ── */
.scp-table-wrap { overflow-x: auto; margin: 1rem 0; }
.scp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.scp-table caption {
  font-family: var(--scp-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--scp-text-faint);
  text-align: left;
  padding: 0 0 6px;
  text-transform: uppercase;
}
.scp-table th {
  background: var(--scp-text);
  color: #f0f0e8;
  font-family: var(--scp-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: normal;
  padding: 8px 12px;
  text-align: left;
  border: 1px solid var(--scp-border-dark);
}
.scp-table td {
  padding: 8px 12px;
  border: 1px solid var(--scp-border);
  vertical-align: top;
  color: var(--scp-text);
}
.scp-table tr:nth-child(even) td { background: var(--scp-bg); }
.scp-table tr:hover td { background: #eeeeea; }

/* ── ログエントリ ── */
.scp-log-entry {
  border: 1px solid var(--scp-border);
  background: var(--scp-bg-inner);
  margin-bottom: 1rem;
  overflow: hidden;
}
.scp-log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  background: var(--scp-bg);
  border-bottom: 1px solid var(--scp-border);
  gap: 1rem;
}
.scp-log-label {
  font-family: var(--scp-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--scp-text);
}
.scp-log-type {
  font-family: var(--scp-mono);
  font-size: 9px;
  letter-spacing: 0.15em;
  border: 1px solid var(--scp-border-dark);
  padding: 2px 8px;
  color: var(--scp-text-muted);
  text-transform: uppercase;
  flex-shrink: 0;
}
.scp-log-type.scp-lt-experiment { border-color: var(--scp-green); color: var(--scp-green); }
.scp-log-type.scp-lt-interview  { border-color: var(--scp-orange); color: var(--scp-orange); }
.scp-log-type.scp-lt-incident   { border-color: var(--scp-red); color: var(--scp-red); }
.scp-log-body { padding: 1rem 1.25rem; }
.scp-log-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dotted var(--scp-border);
}
.scp-log-meta-item {
  font-size: 11px;
  color: var(--scp-text-muted);
  font-family: var(--scp-mono);
}
.scp-log-meta-item span {
  color: var(--scp-text-faint);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
}

/* ── ダイアログ（インタビュー用） ── */
.scp-dialog { margin: 0.5rem 0; }
.scp-dialog-line { display: flex; gap: 0.75rem; margin-bottom: 0.4rem; }
.scp-dialog-speaker {
  font-family: var(--scp-mono);
  font-size: 11px;
  color: var(--scp-text-faint);
  min-width: 120px;
  flex-shrink: 0;
  padding-top: 1px;
  letter-spacing: 0.05em;
}
.scp-dialog-text { font-size: 13px; }

/* ── フッター ── */
.scp-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid var(--scp-border-dark);
  font-family: var(--scp-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--scp-text-faint);
  text-align: center;
  line-height: 2;
  text-transform: uppercase;
}

/* ── レスポンシブ ── */
@media (max-width: 600px) {
  .scp-root { padding: 1rem 0.75rem 3rem; }
  .scp-header-top { flex-direction: column; }
  .scp-ratings { grid-template-columns: repeat(2, 1fr); }
  .scp-item-number { font-size: 1.5rem; }
}
`

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   サブコンポーネント（単体使用可）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * 黒塗りテキスト（永久）
 * ホバーしても解除されない
 */
export function Redacted({ children }: { children?: React.ReactNode }) {
  const text = children ?? '████████'
  return <span className="scp-redacted" title="[編集済み]">{text}</span>
}

/**
 * 機密テキスト（ホバーで一時解除）
 * クリアランス不足を演出したい場合に使う
 */
export function Classified({ children }: { children: React.ReactNode }) {
  return (
    <span className="scp-classified" title="クリアランス不足">
      {children}
    </span>
  )
}

/** 警告ボックス */
export function SCPWarning({
  title = '警告',
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="scp-warning">
      <div className="scp-warning-title">{title}</div>
      <div>{children}</div>
    </div>
  )
}

/** 注釈・補足ブロック */
export function SCPNote({
  label = 'NOTE',
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <div className="scp-note">
      <div className="scp-note-label">{label}</div>
      {children}
    </div>
  )
}

/** テーブル */
export function SCPTable({ caption, headers, rows }: SCPTable) {
  return (
    <div className="scp-table-wrap">
      <table className="scp-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.cells.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** セクションブロック */
export function SCPSection({
  title,
  children,
  variant,
}: {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'red' | 'orange'
}) {
  const headerClass = variant === 'red'
    ? 'scp-section-header scp-sh-red'
    : variant === 'orange'
    ? 'scp-section-header scp-sh-orange'
    : 'scp-section-header'

  return (
    <div className="scp-section">
      <div className={headerClass}>{title}</div>
      <div className="scp-section-body">{children}</div>
    </div>
  )
}

/** ログエントリ（実験記録・インタビュー記録など） */
export function SCPLog({ label, type, meta, content }: SCPLogEntry) {
  const typeLabel =
    type === 'experiment' ? '実験記録' :
    type === 'interview'  ? 'インタビュー記録' :
    type === 'incident'   ? 'インシデント記録' :
    type === 'note'       ? '追記' : undefined

  const typeClass = type ? `scp-log-type scp-lt-${type}` : 'scp-log-type'

  return (
    <div className="scp-log-entry">
      <div className="scp-log-header">
        <span className="scp-log-label">{label}</span>
        {typeLabel && <span className={typeClass}>{typeLabel}</span>}
      </div>
      <div className="scp-log-body">
        {meta && Object.keys(meta).length > 0 && (
          <div className="scp-log-meta">
            {Object.entries(meta).map(([k, v]) => (
              <div key={k} className="scp-log-meta-item">
                <span>{k}</span>
                {v}
              </div>
            ))}
          </div>
        )}
        {content}
      </div>
    </div>
  )
}
import React from "react";

/** ダイアログ行（インタビュー用） */
export function DialogLine({
  speaker,
  children,
}: {
  speaker: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="scp-dialog-line">
      <span className="scp-dialog-speaker">{speaker}</span>
      <span className="scp-dialog-text">{children}</span>
    </div>
  )
}
/** ダイアログブロック */
export function Dialog({ children }: { children: React.ReactNode }) {
  return <div className="scp-dialog">{children}</div>
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   収容クラスのデフォルト色マッピング
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const CLASS_COLOR: Record<ObjectClass, SCPRating['color']> = {
  Safe:         'green',
  Euclid:       'orange',
  Keter:        'red',
  Thaumiel:     'black',
  Neutralized:  'gray',
  Pending:      'gray',
  Unclassified: 'gray',
}

const CLEARANCE_LABEL: Record<ClearanceLevel, string> = {
  1: 'LEVEL 1 — UNRESTRICTED',
  2: 'LEVEL 2 — RESTRICTED',
  3: 'LEVEL 3 — CONFIDENTIAL',
  4: 'LEVEL 4 — SECRET',
  5: 'LEVEL 5 — TOP SECRET',
}

const BANNER_FOR_CLASS: Record<ObjectClass, { text: string; variant?: 'red' | 'orange' }> = {
  Safe:         { text: 'OBJECT CLASS: SAFE — STANDARD CONTAINMENT PROCEDURES IN EFFECT' },
  Euclid:       { text: 'OBJECT CLASS: EUCLID — HEIGHTENED AWARENESS REQUIRED', variant: 'orange' },
  Keter:        { text: 'OBJECT CLASS: KETER — EXTREME CAUTION REQUIRED', variant: 'red' },
  Thaumiel:     { text: 'OBJECT CLASS: THAUMIEL — EYES ONLY' },
  Neutralized:  { text: 'OBJECT CLASS: NEUTRALIZED' },
  Pending:      { text: 'OBJECT CLASS: PENDING CLASSIFICATION' },
  Unclassified: { text: 'OBJECT CLASS: UNCLASSIFIED' },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   メインコンポーネント
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * SCPReport — `<html>/<body>` なし版
 * 通常ページに埋め込む場合は SCP_CSS も一緒に流し込むこと
 */
export default function SCPReport({
  itemNumber,
  objectClass,
  clearance,
  title,
  ratings,
  containmentProcedures,
  description,
  addenda,
  footerNote,
  docMeta,
}: SCPReportProps) {
  const banner = BANNER_FOR_CLASS[objectClass]
  const defaultRatings: SCPRating[] = [
    { label: 'オブジェクトクラス', value: objectClass, color: CLASS_COLOR[objectClass] },
  ]
  const allRatings = ratings ?? defaultRatings

  return (
    <div className="scp-root">
      {/* 機密バナー */}
      <div className={`scp-banner${banner.variant ? ` scp-banner-${banner.variant}` : ''}`}>
        {banner.text}
      </div>

      {/* ヘッダー */}
      <div className="scp-header">
        <div className="scp-header-top">
          <div>
            <div className="scp-item-number">{itemNumber}</div>
            {title && <div className="scp-item-title">"{title}"</div>}
          </div>
          {clearance && (
            <div className="scp-clearance">{CLEARANCE_LABEL[clearance]}</div>
          )}
        </div>

        {/* 評価グリッド */}
        <div className="scp-ratings">
          {allRatings.map((r, i) => (
            <div key={i} className={`scp-rating-item${r.color ? ` scp-rating-${r.color}` : ''}`}>
              <div className="scp-rating-label">{r.label}</div>
              <div className="scp-rating-value">{r.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 文書メタ */}
      {docMeta && (
        <div style={{ marginBottom: '1rem', fontSize: '11px', fontFamily: 'var(--scp-mono)', color: 'var(--scp-text-faint)', letterSpacing: '0.1em' }}>
          {Object.entries(docMeta).map(([k, v]) => (
            <span key={k} style={{ marginRight: '2rem' }}>{k}: {v}</span>
          ))}
        </div>
      )}

      {/* 特別収容手順 */}
      <SCPSection title="特別収容手順 — Special Containment Procedures" variant={objectClass === 'Keter' ? 'red' : objectClass === 'Euclid' ? 'orange' : 'default'}>
        {containmentProcedures}
      </SCPSection>

      {/* 説明 */}
      <SCPSection title="説明 — Description">
        {description}
      </SCPSection>

      {/* 補遺 */}
      {addenda && addenda.length > 0 && (
        <SCPSection title="補遺 — Addenda">
          {addenda.map((entry, i) => (
            <SCPLog key={i} {...entry} />
          ))}
        </SCPSection>
      )}

      {/* フッター */}
      <div className="scp-footer">
        {footerNote && <div style={{ marginBottom: '0.5rem' }}>{footerNote}</div>}
        <div>このファイルはクリアランスレベル{clearance ?? '—'}以上の職員のみが閲覧を許可されています</div>
        <div style={{ marginTop: '0.25rem', color: 'var(--scp-border-dark)' }}>
          無許可のアクセス・複製・配布は規定第██条により処罰の対象となります
        </div>
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   スタンドアロン版（隠しページなどに）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function SCPReportPage(props: SCPReportProps) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: SCP_CSS }} />
      </head>
      <body style={{ margin: 0, background: '#f4f4f0' }}>
        <SCPReport {...props} />
      </body>
    </html>
  )
}
