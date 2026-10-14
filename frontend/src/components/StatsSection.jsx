import { STATS_DATA } from '../data/landingData'

export default function StatsSection() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 pb-20 sm:pb-24">
      <div className="border border-paper-border dark:border-dark-border bg-paper-card dark:bg-dark-card rounded-3xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-paper-border dark:divide-dark-border shadow-card-light dark:shadow-none transition-colors duration-300">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="p-8 sm:p-10 flex flex-col gap-1.5 items-center md:items-start text-center md:text-left">
            <span className={`font-serif font-black text-4xl sm:text-5xl tracking-tight ${stat.colorClass}`}>
              {stat.value}
            </span>
            <span className="text-base font-semibold text-paper-muted dark:text-dark-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
