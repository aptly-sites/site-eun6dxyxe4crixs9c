import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";

export default function Accessibility() {
  return (
    <PageLayout>
      <SEO
        title="Accessibility - EquityTeam Property Management"
        description="EquityTeam is committed to ensuring accessibility of its website for people with disabilities."
        canonical="/accessibility"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-20 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[28px] md:text-[56px] md:max-w-[960px] mx-auto">
            Accessibility
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="w-full inner-pages-main-content">
            <div className="default-page relative text-gray-900">

              <p>The Company is committed to ensuring accessibility of its website for people with disabilities. New and updated web content produced by our organization will conform to W3C/WAI's web Content Accessibility Guidelines 1.0, Conformance Level A, by TBD. Existing web content produced by our organization, and new, updated, and existing Web content provided for our site by third-party developers, will conform to Conformance Level A. We will initiate an internal monitoring program by TBD. Vendors supplying software used to develop our site will be requested to provide information by TBD on conformance to W3C/WAI's Authoring Tool Accessibility Guidelines 1.0, Conformance Level A. We will review this policy in the future to consider updating it to an advanced version of W3C's Web Content Accessibility Guidelines once available.</p>

              <p>Any issues should be reported to us via our <Link href="/contact-us">contact form</Link>.</p>

            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
