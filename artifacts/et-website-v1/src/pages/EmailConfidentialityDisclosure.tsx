import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";

export default function EmailConfidentialityDisclosure() {
  return (
    <PageLayout>
      <SEO
        title="Email Confidentiality Disclosure - EquityTeam Property Management"
        description="Email confidentiality disclosure for EquityTeam Property Management electronic communications."
        canonical="/email-confidentiality-disclosure"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-20 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[28px] md:text-[56px] md:max-w-[960px] mx-auto">
            Email Confidentiality Disclosure
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="w-full inner-pages-main-content">
            <div className="default-page relative text-gray-900">
              <p>This communication and any documents, files or previous e-mail messages attached to it, constitute an electronic communication within the scope of the Electronic Communication Privacy Act, 18 USCA 2510. This communication may contain non-public, confidential, or legally privileged information intended for the sole use of the designated recipient(s). The unlawful interception, use or disclosure of such information is strictly prohibited pursuant to 18 USCA 2511 and any applicable laws. If you are not the intended recipient or have received this communication in error, please notify the sender immediately by reply email and delete all copies of this communication, including attachments, without reading them or saving them to disk.</p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
