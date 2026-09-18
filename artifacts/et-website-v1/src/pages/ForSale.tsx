import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { OwnerLeadForm } from "@/features/leads/OwnerLeadForm";

export default function ForSale() {
  return (
    <PageLayout>
      <SEO
        title="Properties for Sale in Cincinnati - EquityTeam"
        description="Search homes and investment properties for sale across Cincinnati and Dayton, Ohio with EquityTeam's free MLS search tools and local brokerage guidance."
        canonical="/for-sale"
      />

      {/* Hero — matches origin: bg-black, gold cowling h1, section-subheading, pt-58 */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-20 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[28px] md:text-[56px] md:max-w-[960px] mx-auto">
            Properties For Sale in Cincinnati &amp; Dayton Ohio
          </h1>
        </div>
      </section>

      {/* Main content — white bg, two-column layout with sidebar */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="flex gap-15 lg:flex-row w-full flex-col">

            {/* Left column — MLS listings */}
            <div className="w-full lg:w-7/12 xl:w-2/3 mx-auto md:mx-0 inner-pages-main-content">
              <div className="default-page relative text-gray-900">
                <h2>MLS Listings</h2>
                <p>Use our FREE tools to help you find your next home or investment property!</p>
                <p>
                  <a
                    href="https://cincy.rapmls.com/scripts/mgrqispi.dll?APPNAME=Cincynky&PRGNAME=MLSLogin&ARGUMENT=GzkWQDfOPJY9dGcf0Ye4BbEMUBk7X7rktI70avgHfN0%3D&KeyRid=1&MLS_Origin=CIN"
                    className="btn-solid-secondary uppercase mt-4"
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                  >
                    Search OUR Cincinnati MLS Listings
                  </a>
                </p>
                <p>
                  <a
                    href="https://cincy.rapmls.com/scripts/mgrqispi.dll?APPNAME=Cincynky&PRGNAME=MLSLogin&ARGUMENT=MKMvbd6N%2BjExCXUzb3PgJ4Tpy8uelzqBQpU%2BTZ6OieI%3D&KeyRid=1&MLS_Origin=CIN&HM=Y"
                    className="btn-solid-secondary uppercase mt-4"
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                  >
                    Search ALL Cincinnati MLS Listings
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.dabr.com/"
                    className="btn-solid-secondary uppercase mt-4"
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                  >
                    Search ALL Dayton MLS Listings
                  </a>
                </p>
              </div>
            </div>

            {/* Right column — sticky sidebar form */}
            <div className="w-full mt-0 pr-0 pl-0 lg:pl-10 xl:pl-0 lg:w-5/12 xl:w-1/3">
              <div className="sticky" style={{ top: "92px" }}>
                <div className="w-full bg-primary p-5 md:p-10 mb-8 md:mb-15">
                  <OwnerLeadForm
                    source="For Sale – Free Rental Analysis"
                    heading="Get your free rental pricing analysis"
                    description="Share the property details and EquityTeam will prepare a professional rental analysis."
                    buttonLabel="Get my free rental analysis"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </PageLayout>
  );
}
