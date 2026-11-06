import { ABOUT, STATS_BANNER } from '@/lib/masarContent';
import SectionHeader from './SectionHeader';

/** The full "About" copy from the client's home page (paragraphs 2–5), shown on the About Us page. */
export default function AboutStory() {
  const [, ...rest] = ABOUT.paragraphs;
  return (
    <section id="our-story" data-label="Who We Are" className="relative py-20 sm:py-28 bg-[#f6f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              eyebrow="Who We Are"
              title={
                <>
                  Empowering Industries with <span className="text-[#0d7cae]">Reliable Solutions for Success</span>
                </>
              }
            />
          </div>
        </div>
        {/* one comfortable reading column (~65 characters per line) */}
        <div className="lg:col-span-7 space-y-6">
          {rest.map((para) => (
            <p key={para.slice(0, 40)} data-anim="up" className="text-base sm:text-[17px] text-slate-600 leading-[1.8] max-w-[68ch]">
              {para}
            </p>
          ))}
        </div>

        {/* stats-banner copy from the home page */}
        <div data-anim="up" className="lg:col-span-12 mt-6 rounded-[26px] border border-sky-100 bg-white p-7 sm:p-10 grid md:grid-cols-12 gap-5 md:gap-10 items-center">
          <h3 className="md:col-span-5 text-2xl sm:text-[28px] font-black uppercase tracking-tight leading-[1.1] text-slate-950">
            {STATS_BANNER.heading[0]}
            <span className="block text-[#0d7cae]">{STATS_BANNER.heading[1]}</span>
          </h3>
          <p className="md:col-span-7 text-base sm:text-[17px] text-slate-600 leading-[1.8]">{STATS_BANNER.text}</p>
        </div>
      </div>
    </section>
  );
}
