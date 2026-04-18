# 架空工務店 / Kakuu Koumuten

<!-- 作成日: 2026-04-18 -->

大分県を拠点とする工務店のコーポレートサイト……に見せかけた、**ARG（代替現実ゲーム）**を内包したNext.jsプロジェクトです。

---

## 概要

表向きは注文住宅・リノベーション・修繕を手がける「架空工務店」のWebサイトです。しかしサイトの随所には謎が隠されており、プレイヤーはヒントを辿りながら隠しページを探索していきます。

---

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **アニメーション**: Framer Motion
- **メール送信**: Resend

---

## セットアップ

```bash
npm install
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。

---

## サイト構成

```
/               トップページ
/works          施工事例一覧
/works/[slug]   施工事例詳細
/services       サービス・料金
/about          会社概要
/news           お知らせ一覧
/news/[slug]    お知らせ詳細
/contact        お問い合わせ
/contact/thanks 送信完了ページ
/api/boundary   境界面ステータスAPI
```

---

## ARGについて

### はじめかた

`/contact` のお問い合わせフォームから始まります。**正確な言葉**を入力することが鍵です。

### ヒントの在り処

サイト内には複数の手がかりが仕込まれています。

- 各ページのHTMLソースコードのコメント
- 施工事例の画像のaltテキスト
- 会社沿革の「不審な年」
- `GET /api/boundary` のレスポンス
- サービスページのCSS非表示要素
- トップページの代表メッセージ（縦読み）

### ゾーン構造

隠しページは5つのゾーンで構成されています。

| ゾーン | 名称 | 特徴 |
|--------|------|------|
| Zone A | 静域 | 静寂。測定値：安定 |
| Zone B | 深域 | 底のない下降 |
| Zone C | 反響域 | 言葉が残る空間 |
| Zone D | 鏡域 | すべてが反転 |
| Zone X | 未分類 | 記録不能 |

### 救済ルート

行き詰まったときは、お問い合わせフォームで **「教えてください」** と送信してください。

---

## ディレクトリ構成

```
.
├── app/
│   ├── (site)/          # 通常のサイトページ
│   ├── api/boundary/    # 境界面ステータスAPI
│   └── p/               # 隠しページ群
│       ├── a3f8k/       # Zone A
│       ├── 7m2xq/       # Zone B
│       ├── nv91c/       # Zone C
│       ├── zr4ht/       # Zone D
│       ├── 0we5j/       # Zone X
│       └── help/        # 救済ルート
├── components/
│   ├── layout/          # Header, Footer, PageTransition
│   └── ui/              # Button, Card, SectionTitle
└── content/
    ├── news/            # お知らせデータ
    └── works/           # 施工事例データ
```

---

## 注意事項

- 架空工務店は実在しません。登場する人物・住所・電話番号はすべてフィクションです。
- `robots: { index: false }` が設定されているため、隠しページは検索エンジンにインデックスされません。

---

## ライセンス

本プロジェクトはサンプル・学習用途として公開されています。

## ブート方法
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
