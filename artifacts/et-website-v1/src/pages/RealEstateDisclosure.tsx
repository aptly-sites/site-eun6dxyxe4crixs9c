import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";

export default function RealEstateDisclosure() {
  return (
    <PageLayout>
      <SEO
        title="Real Estate Investing & Tax Disclosure - EquityTeam"
        description="Real estate investing and tax disclosure for EquityTeam Property Management in Cincinnati and Dayton Ohio."
        canonical="/real-estate-investing-and-tax-disclosure"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-20 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[28px] md:text-[56px] md:max-w-[960px] mx-auto">
            Real Estate Investing &amp; Tax Disclosure
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="w-full inner-pages-main-content">
            <div className="default-page relative text-gray-900">
              <p>This website is provided for informational purposes only, and does not constitute an offer or solicitation to buy or sell securities. The information provided and any statistical data contained herein have been obtained from sources which we believe to be reliable, but we do not represent that they are accurate or complete, and they should not be relied upon as such. All opinions expressed and data provided herein are subject to change without notice.</p>

              <p><strong>Transaction / Agency Role:</strong> The Company, and/or its subsidiaries, shareholders, directors, officers and/or employees, may deal as principal in the real estate transaction discussed herein. The Company, or it's subsidiaries may not currently own the property, but in all applicable cases, does have a marketable interest in the property either through ownership or a pending contract to purchase. The Company is a licensed real estate broker in the states where it operates (see "locations") and may act only as an agent (single or dual) in a transaction.</p>

              <p><strong>Investing:</strong> The investments mentioned in this website may not be suitable for all types of investors. All investments involve different degrees of risk. You should be aware of your financial situations and risk tolerance level at all times. Furthermore, you should read all transaction documents and statements. Read any and all information presented carefully before making any investment decisions. You are free at all times to accept, reject or stipulate all investment recommendations made by the Company. All investments presented are subject to market risk which may result in the entire loss to the client's investment. Please understand that any losses are attributed to market forces beyond the control or prediction of the Company. As you know, a recommendation, which you are free to accept, reject or stipulate, is not a guarantee for the successful performance of an investment and we are expressly prohibited from guaranteeing investments against losses arising from market conditions. Past performance is no guarantee of future results, and current performance may be lower or higher than the performance data quoted. All real estate investments involve different degrees of risk. You should be acutely aware of your financial status and risk tolerance level at all times.</p>

              <p><strong>Forward-Looking Statements:</strong> Presentations made by and on behalf of the Company may contain forward-looking statements. These statements reflect current beliefs and conditions, as well as assumptions made by, and information available to the Company. Forward-looking statements are not guarantees of future performance and involve risks and uncertainties. Actual future results and developments could differ materially from those set forth in these statements due to various factors. These factors include, among others; changes in financial markets, fluctuations in the general economy and competitive situation and financial markets.</p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
