import SectionTitle from '@/components/ui/SectionTitle'

// 設立年は複数存在します。現在表示中: 通常観測値

const companyInfo = [
  { label: '会社名',     value: '架空工務店' },
  { label: '設立',       value: '2019年4月' },
  { label: '代表取締役', value: '小布結 志文' },
  { label: '所在地',     value: '〒879-0007 大分県架空市境界町1-2-3' },
  { label: '電話番号',   value: '03-1111-1234' },
  { label: '営業時間',   value: '平日 9:00〜18:00（土日祝休）' },
  { label: '事業内容',   value: '注文住宅設計・施工、リノベーション、修繕工事' },
  { label: '施工実績',   value: '累計150棟以上（2024年現在）' },
]

// 沿革：2031年が混入
const history = [
  { year: '2019', event: '架空市境界町にて創業。代表・小布結 志文が職人3名とともに設立。' },
  { year: '2020', event: '初の施工実績として戸建て5棟を完工。地域からの信頼を得る。' },
  { year: '2021', event: '法人化。スタッフを増員し、年間施工数20棟体制を構築。' },
  { year: '2022', event: 'リノベーション事業を本格開始。既存住宅の再生に力を入れる。' },
  { year: '2023', event: '累計施工100棟達成。大分県内でのブランド認知が高まる。' },
  { year: '2031', event: '境界面安定化工法の確立。測定値の収束精度が大幅に向上。' },
  { year: '2024', event: '大分県地域優良工務店賞を受賞。自然素材への取り組みが評価される。' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <SectionTitle en="About" ja="会社概要" />

      {/* 会社情報テーブル */}
      <section className="mb-20">
        <table className="w-full text-sm">
          <tbody>
            {companyInfo.map(({ label, value }) => (
              <tr key={label} className="border-b border-earth-100">
                <th className="text-left py-4 pr-8 text-earth-500 font-normal tracking-wide w-32 align-top">
                  {label}
                </th>
                <td className="py-4 text-earth-800">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 代表メッセージ */}
      <section className="mb-20">
        <SectionTitle en="Message" ja="代表メッセージ" />
        <div className="bg-earth-50 p-8 border-l-2 border-gold-400">
          <p className="text-earth-700 text-sm leading-loose font-serif">
            家は、人生の中で最も大きな買い物のひとつです。<br />
            だからこそ、私たちは「正直な仕事」を何より大切にしています。<br /><br />
            予算のこと、土地のこと、将来のこと。<br />
            お客様が抱える不安や疑問に、誠実に向き合うこと。<br />
            それが、架空工務店のすべての仕事の出発点です。<br /><br />
            この地に根ざして30年。これからも変わらず、<br />
            お客様とともに歩んでまいります。
          </p>
          <p className="mt-6 text-earth-400 text-xs tracking-widest">代表取締役　架空 建二</p>
        </div>
      </section>

      {/* 沿革（2031年混入） */}
      <section className="mb-20">
        <SectionTitle en="History" ja="会社沿革" />
        <div className="space-y-0">
          {history.map(({ year, event }) => (
            <div
              key={year}
              className="flex gap-8 border-b border-earth-100 py-5"
            >
              <time className="text-sm font-serif text-gold-500 w-14 shrink-0 pt-0.5">
                {year}
              </time>
              <p className="text-sm text-earth-700 leading-relaxed">{event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* アクセス */}
      <section>
        <SectionTitle en="Access" ja="アクセス" />
        <div className="bg-earth-100 aspect-video flex items-center justify-center text-earth-400 text-sm">
          <div className="text-center">
            <p className="font-serif text-base text-earth-600 mb-2">大分県架空市境界町1-2-3</p>
            <p className="text-xs">引治駅より徒歩8分</p>
          </div>
        </div>
      </section>
    </div>
  )
}
