# Newspaper コンポーネント

<!-- 作成日: 2026-04-18 -->

`components/ui/Newspaper.tsx` に定義された新聞スタイルのレイアウトコンポーネントです。
Playfair Display + Noto Serif JP を使い、5段組・vintage 新聞紙の見た目を再現します。

---

## エクスポート一覧

| 名前 | 種別 | 用途 |
|---|---|---|
| `Newspaper` | default export | `<html>/<body>` なし。通常ページに埋め込む |
| `NewspaperPage` | named export | `<html>/<body>` ごと出力。隠しページなど単独ページに使う |
| `Citation` | named export | 引用ブロック単体 |
| `NewsBox` | named export | 囲み記事単体 |
| `NewsImage` | named export | セピア画像単体 |
| `Headline` | named export | 見出し単体 |
| `NEWSPAPER_CSS` | named export | CSS文字列。`<style>` タグに直接流し込む用 |

---

## 基本的な使い方

### パターン A：単独ページ（隠しページなど）

```tsx
// app/p/xxxxx/page.tsx
import { NewspaperPage, type NewspaperProps } from '@/components/ui/Newspaper'

const props: NewspaperProps = {
  masthead: '架空時報',
  subhead: '大分県架空市 — 2031年3月14日',
  columns: [
    {
      headlines: [{ text: '見出しテキスト', style: 'hl1' }],
      body: ['本文段落1', '本文段落2'],
    },
  ],
  footer: ['左フッター', '中央フッター', '右フッター'],
}

export default function MyPage() {
  return <NewspaperPage {...props} />
}
```

### パターン B：既存ページに埋め込む

```tsx
// app/(site)/some-page/page.tsx
import Newspaper from '@/components/ui/Newspaper'
import { NEWSPAPER_CSS } from '@/components/ui/Newspaper'

export default function SomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NEWSPAPER_CSS }} />
      <Newspaper
        masthead="社内報"
        subhead="架空工務店 社内版 — 第1号"
        columns={[ /* ... */ ]}
      />
    </>
  )
}
```

---

## `NewspaperProps` の全オプション

```ts
interface NewspaperProps {
  masthead: string                  // 題字（必須）
  subhead: string                   // サブヘッド（必須）
  weatherBox?: React.ReactNode      // 左上ボックス（省略可）
  stamp?: React.ReactNode           // 右上スタンプ（省略可）
  columns: NewspaperColumn[]        // カラム配列（必須）
  footer?: [ReactNode, ReactNode, ReactNode]  // 左・中・右（省略可）
}
```

### `NewspaperColumn`

```ts
interface NewspaperColumn {
  headlines: NewspaperHeadline[]   // 見出し群（必須）
  body: React.ReactNode[]          // 本文段落の配列（必須）
  citation?: React.ReactNode       // 引用ブロック（省略可）
  image?: NewspaperImage           // 画像（省略可）
  box?: NewspaperBox               // 囲み記事（省略可）
}
```

### 見出しスタイル一覧

| style | 見た目 |
|---|---|
| `hl1` | 太字・大（`red: true` で赤文字） |
| `hl2` | イタリック・上下ボーダー付き |
| `hl3` | イタリック・特大 |
| `hl4` | 極小・上下ボーダー付き（記者名・日付など） |
| `hl5` | イタリック・最大 |
| `hl6` | 通常サイズ・上下ボーダー付き |

---

## 使用例：海蝕機関の観測レポート

```tsx
import { NewspaperPage } from '@/components/ui/Newspaper'

export default function KaishokuReport() {
  return (
    <NewspaperPage
      masthead="海蝕機関　内部報"
      subhead="Zone B 深域 — 観測報告書 第12次"
      stamp={<><div className="np-stamp-text">極秘</div></>}
      columns={[
        {
          headlines: [
            { text: '深域の底が消えた', style: 'hl1', red: true },
            { text: '観測班 第3係', style: 'hl4' },
          ],
          body: ['下方境界面の後退速度が規定値を超過した。'],
          citation: '「底は、なかった」',
        },
      ]}
      footer={['海蝕機関　内部報', '第12次観測報告', '取扱注意']}
    />
  )
}
```

---

## ファイル構成

```
components/ui/
└── Newspaper.tsx       ← コンポーネント本体

app/p/
└── g7nkf/
    └── page.tsx        ← 使用例（号外ページ）
```
