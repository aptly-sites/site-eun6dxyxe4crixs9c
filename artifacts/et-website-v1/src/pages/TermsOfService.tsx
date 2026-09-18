import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";

export default function TermsOfService() {
  return (
    <PageLayout>
      <SEO
        title="Terms and Conditions - EquityTeam Property Management"
        description="Read the EquityTeam terms and conditions of use for the website owned and operated by EquityTeam, LLC."
        canonical="/terms-and-conditions"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-20 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[28px] md:text-[56px] md:max-w-[960px] mx-auto">
            Terms and Conditions
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="w-full inner-pages-main-content">
            <div className="default-page relative text-gray-900">

              <p>By accessing this web site, owned and operated by EquityTeam, LLC (hereinafter referred to as "EquityTeam" or "the Company"), you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and service mark law.</p>

              <p><strong>Use License:</strong> Permission is granted to temporarily download one copy of the materials (information or software) on this web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
              <ul>
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>attempt to decompile or reverse engineer any software contained on this site</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or the materials on any other server.</li>
              </ul>

              <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by the Company at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>

              <p><strong>Disclaimer:</strong> The materials on the Company's website are provided "as is". The Company makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, the Company does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.</p>

              <p><strong>Limitations:</strong> In no event shall the Company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on the Company's Internet site, even if the Company or the Company's authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>

              <p><strong>Revisions and Errors:</strong> The materials appearing on the Company's website could include technical, typographical, or photographic errors. The Company does not warrant that any of the materials on its web site are accurate, complete, or current. The Company may make changes to the materials contained on its web site at any time without notice. The Company does not, however, make any commitment to update the materials.</p>

              <p><strong>Links:</strong> The Company has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by the Company of the site. Use of any such linked website is at the user's own risk.</p>

              <p><strong>Site Terms of Use Modifications:</strong> The Company may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>

              <p><strong>Governing Law:</strong> Any claim relating to the Company's web site shall be governed by the laws of the State of Ohio without regard to its conflict of law provisions.</p>

            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
