import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";

export default function Jobs() {
  return (
    <PageLayout>
      <SEO
        title="Jobs - EquityTeam Property Management"
        description="Join the EquityTeam property management team in Cincinnati and Dayton, Ohio. View our current job openings and apply today."
        canonical="/careers"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-20 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <p className="text-secondary text-sm font-bold tracking-[0.18em] uppercase mb-4">
            Careers at EquityTeam
          </p>
          <h1 className="font-cowling font-bold text-white text-3xl md:text-7xl leading-[1.05] uppercase mb-6">
            Join Our Team
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            We&rsquo;re building an industry-leading property management team in Cincinnati and Dayton, Ohio. All-star performers only — people who want a career, not just a job.
          </p>
          <a
            href="#openings"
            className="btn-solid-secondary uppercase"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("openings");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Openings
          </a>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="w-full inner-pages-main-content">
            <div>
              <div className="default-page relative text-gray-900">

                <h2>Why Us?</h2>
                <p>
                  Our team members are the heart of our rapidly growing company. To be our best, we need ALL-STAR performers.
                  If our core values line up with your professional values, and you're ready for a lifestyle-changing,
                  challenging career (not just a "job"), we would love to see your application!
                </p>
                <ul>
                  <li>Compensation - All-star comp for all-star talent!</li>
                  <li>Customers - Repeat and loyal customers</li>
                  <li>Work from Anywhere</li>
                  <li>Career Progression - We want to help you realize your full potential!</li>
                  <li>Culture - Team-oriented, work hard/play hard culture</li>
                </ul>

                {/* Testimonials */}
                <div className="mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                      {
                        img: `${import.meta.env.BASE_URL}images/alan-c.jpg`,
                        name: "Alan C.",
                        role: "HVAC Preferred Vendor",
                        quote: "Thrilled to be a Preferred Vendor with EquityTeam. They treat vendors as an extension of their company and care about a long-term, win/win relationship.",
                      },
                      {
                        img: `${import.meta.env.BASE_URL}images/john-w.jpeg`,
                        name: "John W.",
                        role: "Sr. Property Manager",
                        quote: "Been here since the start and still having fun. Rapidly growing company in a dynamic industry; team-oriented; good work/life balance; hands-off management style; great customers; etc.",
                      },
                    ].map((t, i) => (
                      <div key={i} className="p-6 text-center border border-secondary">
                        <img
                          src={t.img}
                          alt={t.name}
                          className="block border border-secondary mx-auto"
                          style={{ borderRadius: "1000px", width: 150, marginTop: 0 }}
                        />
                        <p className="font-sans font-bold text-lg leading-normal !mb-0">{t.name}</p>
                        <p className="font-sans leading-normal !mt-0">{t.role}</p>
                        <p className="font-sans leading-normal !mt-8 !mb-0">{t.quote}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Our Openings — Paylocity embedded job board */}
        <div id="openings" className="bg-white px-5 xl:px-0 pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="font-sans text-2xl font-bold text-black mb-8 text-center">Our Openings</h2>
            <iframe
              loading="lazy"
              src="https://recruiting.paylocity.com/recruiting/jobs/All/e6df6eb8-99f9-4628-a42d-85748cb3029c/EquityTeam"
              width="100%"
              height="900"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title="EquityTeam Job Openings"
            />
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
