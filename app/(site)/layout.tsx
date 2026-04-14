import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <PageTransition>
        <div className="min-h-screen pt-16">
          {children}
        </div>
      </PageTransition>
      <Footer />
    </>
  )
}
