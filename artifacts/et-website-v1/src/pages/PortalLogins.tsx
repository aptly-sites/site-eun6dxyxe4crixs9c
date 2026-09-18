import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { OwnerLeadForm } from "@/features/leads/OwnerLeadForm";

function SidebarForm() {
  return (
    <div className="w-full bg-primary p-10 mb-15">
      <OwnerLeadForm
        source="Portal Login – Free Rental Analysis"
        heading="Get your free rental pricing analysis"
        description="Share the property details and EquityTeam will prepare a professional rental analysis."
        buttonLabel="Get my free rental analysis"
      />
    </div>
  );
}

export default function PortalLogins() {
  return (
    <PageLayout>
      <SEO
        title="Portal Logins - EquityTeam Property Management"
        description="Login to the EquityTeam owner or tenant portal. Access your property management account online."
        canonical="/portal-logins"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-20 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[28px] md:text-[56px] md:max-w-[960px] mx-auto">
            Portal Logins
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="flex gap-15 lg:flex-row w-full flex-col">

            {/* Left column */}
            <div className="w-full lg:w-7/12 xl:w-2/3 mx-auto md:mx-0 inner-pages-main-content">
              <div className="default-page relative text-gray-900">
                <h2>Owner Portals</h2>
                <p>Use the links below to log-in to the relevant owner portals</p>
                <p>
                  <a
                    href="https://equityteam.rentvine.com/portals/owner/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid-secondary uppercase mt-2 mb-8"
                  >
                    Owner Portal RV
                  </a>
                </p>

                <h2>Tenant Portals</h2>
                <p>Use the links below to log-in to the relevant tenant portals</p>
                <p>
                  <a
                    href="https://equityteam.rentvine.com/portals/resident/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid-secondary uppercase mt-2 mb-8"
                  >
                    Tenant Portal RV
                  </a>
                </p>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-full mt-0 pr-0 pl-0 lg:pl-10 xl:pl-0 lg:w-5/12 xl:w-1/3">
              <div className="sticky" style={{ top: "92px" }}>
                <SidebarForm />
              </div>
            </div>

          </div>
        </div>
      </main>
    </PageLayout>
  );
}
