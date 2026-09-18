import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";

const SITEMAP_LINKS: { path: string; text: string; external?: boolean }[] = [
  { path: "/blog/17-reasons-hire-property-manager", text: "17 Reasons to hire a property manager for your cincinnati rental property" },
  { path: "/blog/4-steps-to-finding-the-perfect-rental-home", text: "4 Steps to Finding the Perfect Rental Home in Cincinnati, Ohio" },
  { path: "/blog/9-tips-diy-landlords", text: "9 Tips for \"DIY\" Landlords" },
  { path: "/blog/frozen-pipes-guide", text: "A Tenant's Guide to Frozen Pipes" },
  { path: "/about-us", text: "About Us" },
  { path: "/accessibility", text: "Accessibility" },
  { path: "/residential-property-management", text: "Adding Your Property Manager as Additional Insured on Your Insurance Policy" },
  { path: "/blog/attracting-long-term-tenants", text: "How to Attract Long-Term Tenants" },
  { path: "/blog", text: "Blog" },
  { path: "/locations/cincinnati/blue-ash", text: "Blue Ash Property Management Company" },
  { path: "/blog/buying-investment-property-cincinnati", text: "Top Tips When Buying Investment Property in Cincinnati" },
  { path: "/blog/cincinnati-eviction-process", text: "A Guide to the Eviction Process in Cincinnati, Ohio" },
  { path: "/blog/cincinnati-top-investment-market", text: "Cincinnati makes Lists of Top Residential Real Estate Investment Markets 2017" },
  { path: "/locations/cincinnati/college-hill", text: "College Hill Property Management Company" },
  { path: "/locations/cincinnati/columbia-tusculum", text: "Columbia-Tusculum Property Management Company" },
  { path: "/contact-us", text: "Contact Us" },
  { path: "/dayton-property-management", text: "Dayton Property Management Company" },
  { path: "/locations/cincinnati/deer-park", text: "Deer Park Property Management Company" },
  { path: "/locations/cincinnati/delhi", text: "Delhi Property Management Company" },
  { path: "/locations/cincinnati/downtown", text: "Downtown Property Management Company" },
  { path: "/blog/drafting-lease-agreements", text: "Guide to Making a Solid Lease Agreement for Your Rental Property" },
  { path: "/locations/cincinnati/east-walnut-hills", text: "East Walnut Hills Property Management Company" },
  { path: "/email-confidentiality-disclosure", text: "Email Confidentiality Disclosure" },
  { path: "/locations/cincinnati/evanston", text: "Evanston Property Management Company" },
  { path: "/blog/finding-rental-during-covid", text: "Finding a Rental Property in Cincinnati during the Covid-19 Pandemic" },
  { path: "/for-rent", text: "Properties For Rent in Cincinnati & Dayton Ohio" },
  { path: "/for-sale", text: "Properties For Sale in Cincinnati & Dayton Ohio" },
  { path: "/locations/cincinnati/forest-park", text: "Forest Park Property Management Company" },
  { path: "/free-rental-analysis", text: "Free Rental Analysis" },
  { path: "/locations/cincinnati/hamilton", text: "Hamilton Property Management Company" },
  { path: "/locations/cincinnati/harrison", text: "Harrison Property Management Company" },
  { path: "/", text: "Home" },
  { path: "/blog/how-to-maintain-rental-property", text: "How to Maintain Your Rental Property" },
  { path: "/locations/cincinnati/hyde-park", text: "Hyde Park Property Management Company" },
  { path: "/locations/cincinnati/indian-hill", text: "Indian Hill Property Management Company" },
  { path: "/blog/time-to-hire-property-manager", text: "Is it time to hire a professional property manager?" },
  { path: "/careers", text: "Careers" },
  { path: "/blog/keeping-tenants-happy", text: "How to Keep Renters Happy" },
  { path: "/locations/cincinnati/kennedy-heights", text: "Kennedy Heights Property Management Company" },
  { path: "/locations/cincinnati/kenwood", text: "Kenwood Property Management Company" },
  { path: "/blog/landlord-tenant-laws-ohio", text: "Landlord/Tenant Laws in Ohio" },
  { path: "/areas-we-serve", text: "Areas We Serve" },
  { path: "/locations/cincinnati/loveland", text: "Loveland Property Management Company" },
  { path: "/locations/cincinnati/madisonville", text: "Madisonville Property Management Company" },
  { path: "/locations/cincinnati/mariemont", text: "Mariemont Property Management Company" },
  { path: "/locations/cincinnati/middletown", text: "Middletown Property Management Company" },
  { path: "/locations/cincinnati/montgomery", text: "Montgomery Property Management Company" },
  { path: "/locations/cincinnati/mount-lookout", text: "Mount Lookout Property Management Company" },
  { path: "https://deerfieldvacationrentals.com", text: "Norris Lake Vacation Rental Management", external: true },
  { path: "/locations/cincinnati/mount-washington", text: "Mount Washington Property Management Company" },
  { path: "/locations/cincinnati/mt-adams", text: "Mt. Adams Property Management Company" },
  { path: "/locations/cincinnati/northside", text: "Northside Property Management Company" },
  { path: "/locations/cincinnati/norwood", text: "Norwood Property Management Company" },
  { path: "/locations/cincinnati/oakley", text: "Oakley Property Management Company" },
  { path: "/blog/ohio-landlord-tenant-law", text: "Ohio Rental Laws – An Overview of Landlord-Tenant Rights in Cincinnati" },
  { path: "/blog/ohio-security-deposit-law", text: "Ohio Security Deposit Laws" },
  { path: "/locations/cincinnati/over-the-rhine", text: "Over-the-Rhine Property Management Company" },
  { path: "/locations/cincinnati/pleasant-ridge", text: "Pleasant Ridge Property Management Company" },
  { path: "/portal-logins", text: "Portal Logins" },
  { path: "/blog/pricing-cincinnati-rental", text: "Pricing Your Cincinnati Property to Rent" },
  { path: "/privacy-policy", text: "Privacy Policy" },
  { path: "/residential-property-management", text: "Residential Property Management" },
  { path: "/real-estate-investing-and-tax-disclosure", text: "Real Estate Investing & Tax Disclosure" },
  { path: "/blog/real-estate-investing-cincinnati", text: "Reasons to Invest in Cincinnati Real Estate" },
  { path: "/realtor-referral-program", text: "Realtor Referral Program" },
  { path: "/blog/rent-your-house-cincinnati", text: "How to Rent Out Your House in Cincinnati" },
  { path: "/blog/rental-amenities", text: "Top 8 Amenities Renters Can't Resist in Cincinnati, Ohio" },
  { path: "/blog/rental-property-advertising", text: "How to Advertise Your Cincinnati Rental Property Successfully" },
  { path: "/blog/rental-property-renovations", text: "Best Renovations for Your Rental Property" },
  { path: "/blog/renting-vs-selling-cincinnati", text: "Renting vs Selling in Cincinnati, Ohio" },
  { path: "/locations/cincinnati/sayler-park", text: "Sayler Park Property Management Company" },
  { path: "/locations/cincinnati/sycamore", text: "Sycamore Property Management Company" },
  { path: "/blog/tenant-screenings", text: "Quick Guide to Effective Tenant Screening in Cincinnati, OH" },
  { path: "/terms-and-conditions", text: "Terms and Conditions" },
  { path: "/locations/cincinnati/terrace-park", text: "Terrace Park Property Management Company" },
  { path: "/blog/application-fraud-eviction", text: "The Link Between the Eviction Crisis and Application Fraud" },
  { path: "/blog/collecting-rent-during-covid", text: "Tips For Collecting Rent During the COVID-19 Pandemic" },
  { path: "/locations/cincinnati/walnut-hills", text: "Walnut Hills Property Management Company" },
  { path: "/blog/water-damage", text: "How to Avoid Water Damage in Your Rental Property" },
  { path: "/locations/cincinnati/western-hills", text: "Western Hills Property Management Company" },
];

export default function SitemapPage() {
  return (
    <PageLayout>
      <SEO
        title="Sitemap - EquityTeam Property Management"
        description="Full sitemap for EquityTeam Property Management serving Cincinnati and Dayton Ohio."
        canonical="/sitemap"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-58 pb-40 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] md:max-w-[960px] mx-auto">
            Sitemap
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="w-full inner-pages-main-content">
            <div className="default-page relative text-gray-900">
              <ul>
                {SITEMAP_LINKS.map((link, i) => (
                  <li key={i}>
                    {link.external ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer">{link.text}</a>
                    ) : (
                      <Link href={link.path}>{link.text}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
