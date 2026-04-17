import Link from 'next/link'

const siteLinks = [
  { href: '/',         label: 'トップ' },
  { href: '/works',    label: '施工事例' },
  { href: '/services', label: 'サービス・料金' },
  { href: '/about',    label: '会社概要' },
  { href: '/news',     label: 'お知らせ' },
  { href: '/contact',  label: 'お問い合わせ' },
]

export default function Footer() {
  return (
    <footer className="bg-earth-800 text-earth-100 mt-24">
      {/* 境界面測定値: 安定 / 最終確認: 2031.03.14 */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* 会社情報 */}
        <div>
          <p className="font-serif text-xl tracking-widest text-earth-50 mb-4">架空工務店</p>
          <address className="not-italic text-sm text-earth-300 leading-relaxed space-y-1">
            <p>〒879-0007</p>
            <p>大分県架空市境界町1-2-3</p>
            <p className="mt-2">TEL: 03-1111-1234</p>
            <p>営業時間: 平日 9:00〜18:00</p>
          </address>
        </div>

        {/* サイトマップ */}
        <div>
          <p className="text-xs tracking-widest text-earth-400 uppercase mb-4">Sitemap</p>
          <nav className="flex flex-col gap-2">
            {siteLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-earth-300 hover:text-earth-50 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* キャッチコピー */}
        <div>
          <p className="font-serif text-earth-300 text-sm leading-loose">
            地域に根ざした家づくりを、<br />
            誠実な職人技術で。<br />
            <br />
            お客様の大切な場所を、<br />
            ともに作り上げます。
          </p>
        </div>
      </div>

      <div className="border-t border-earth-700 py-4">
        <p className="text-center text-xs text-earth-500">
          © 2024 架空工務店. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
