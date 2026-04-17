import SectionTitle from '@/components/ui/SectionTitle'
import { submitContact } from './actions'

// お問い合わせには、正確な言葉をお使いください

const INQUIRY_TYPES = [
  '新築・建替えのご相談',
  'リノベーション・改修のご相談',
  '修繕・メンテナンスのご相談',
  '土地・資金計画のご相談',
  'その他',
]

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20 min-h-screen bg-earth-50">
      <div className="max-w-2xl mx-auto px-6">
        <SectionTitle
          sub="CONTACT"
          title="お問い合わせ"
          description="家づくりに関するご相談・ご質問をお気軽にどうぞ。通常2営業日以内にご返信いたします。"
        />

        <form action={submitContact} className="mt-10 space-y-6">
          {/* お名前 */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-earth-700 font-serif mb-2"
            >
              お名前
              <span className="text-gold-500 ml-1 text-xs">必須</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full border border-earth-200 bg-white px-4 py-3 text-sm text-earth-800 placeholder:text-earth-300 focus:outline-none focus:border-earth-500 transition-colors"
              placeholder="架空 建二"
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-earth-700 font-serif mb-2"
            >
              メールアドレス
              <span className="text-gold-500 ml-1 text-xs">必須</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-earth-200 bg-white px-4 py-3 text-sm text-earth-800 placeholder:text-earth-300 focus:outline-none focus:border-earth-500 transition-colors"
              placeholder="example@kakuu.jp"
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label
              htmlFor="tel"
              className="block text-sm text-earth-700 font-serif mb-2"
            >
              電話番号
            </label>
            <input
              id="tel"
              name="tel"
              type="tel"
              autoComplete="tel"
              className="w-full border border-earth-200 bg-white px-4 py-3 text-sm text-earth-800 placeholder:text-earth-300 focus:outline-none focus:border-earth-500 transition-colors"
              placeholder="03-1111-1234"
            />
          </div>

          {/* お問い合わせ種別 */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm text-earth-700 font-serif mb-2"
            >
              お問い合わせ種別
              <span className="text-gold-500 ml-1 text-xs">必須</span>
            </label>
            <select
              id="type"
              name="type"
              required
              className="w-full border border-earth-200 bg-white px-4 py-3 text-sm text-earth-800 focus:outline-none focus:border-earth-500 transition-colors appearance-none"
            >
              <option value="">選択してください</option>
              {INQUIRY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm text-earth-700 font-serif mb-2"
            >
              お問い合わせ内容
              <span className="text-gold-500 ml-1 text-xs">必須</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full border border-earth-200 bg-white px-4 py-3 text-sm text-earth-800 placeholder:text-earth-300 focus:outline-none focus:border-earth-500 transition-colors resize-none"
              placeholder="ご相談内容をご記入ください。"
            />
          </div>

          {/* プライバシーポリシー同意 */}
          <div className="flex items-start gap-3">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              required
              className="mt-1 accent-earth-700"
            />
            <label htmlFor="privacy" className="text-xs text-earth-500 leading-loose">
              個人情報の取り扱いについて同意します。ご入力いただいた情報は、お問い合わせへの返答のみに使用し、第三者への提供は行いません。
            </label>
          </div>

          {/* 送信ボタン */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-earth-700 text-earth-50 py-4 text-sm tracking-widest font-serif hover:bg-earth-800 transition-colors duration-200"
            >
              送信する
            </button>
          </div>
        </form>

        {/* 補足情報 */}
        <div className="mt-12 pt-8 border-t border-earth-100 space-y-3">
          <p className="text-xs text-earth-400 leading-loose">
            ご返信まで通常2営業日をいただいております。お急ぎの場合はお電話でお問い合わせください。
          </p>
          <p className="text-xs text-earth-400">
            <span className="font-serif">TEL:</span> 03-1111-1234（平日 9:00〜18:00）
          </p>
        </div>
      </div>
    </main>
  )
}
