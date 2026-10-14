import { Link } from 'react-router-dom'
import { REVIEWS_DATA } from '../data/landingData'
import ReviewCard from './ReviewCard'

export default function RecentReviewsSection() {
  return (
    <section id="lista" className="max-w-[1240px] mx-auto px-6 py-16 sm:py-24 flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3.5">
          <span className="w-14 h-1 rounded-full bg-accent" />
          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-paper-text dark:text-dark-text">
            Últimas Críticas de la Comunidad
          </h2>
        </div>

        <Link
          to="/lista"
          className="font-bold text-sm sm:text-base text-accent hover:text-accent-hover flex items-center gap-2 group transition-colors"
        >
          <span>Ver todas</span>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS_DATA.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
