import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import GenresSection from '../components/GenresSection'
import ClassicsBanner from '../components/ClassicsBanner'
import RecentReviewsSection from '../components/RecentReviewsSection'
import StatsSection from '../components/StatsSection'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text min-h-screen transition-colors duration-300 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <GenresSection />
        <ClassicsBanner />
        <RecentReviewsSection />
        <StatsSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
