import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";

export default function Feedback() {
  return (
    <PageLayout>
      <SEO
        title="Feedback - EquityTeam Property Management"
        description="Send confidential feedback to the EquityTeam property management team in Cincinnati and Dayton Ohio."
        canonical="/feedback"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-58 pb-40 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] md:max-w-[960px] mx-auto">
            Feedback
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="w-full inner-pages-main-content">
            <div className="default-page relative text-gray-900">
              <div className="text-center">
                <p>Send our Management Team your confidential feedback.</p>
              </div>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScYURIcDfe-xIk5klEneK_ASW1DJVo4EQpaovFkd3DALosg6g/viewform?embedded=true"
                width="800"
                height="1150"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                title="docs-google"
                style={{ margin: "20px auto 0 auto", display: "block" }}
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
