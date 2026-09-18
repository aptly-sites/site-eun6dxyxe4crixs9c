import { Link } from "wouter";

function FooterArrow() {
  return (
    <svg width="5" height="11" viewBox="0 0 5 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="inline-block text-[#B4975A] mr-3 mt-1 flex-shrink-0" style={{ minWidth: 5 }}>
      <path d="M0 10.4546V0.45459L5 5.45459L0 10.4546Z" fill="currentColor"/>
    </svg>
  );
}

type FLink = { label: string; href: string; external?: boolean };

function FooterColumn({ title, links }: { title: string; links: FLink[] }) {
  return (
    <div>
      <p className="mb-8 text-base font-sans font-bold leading-tight tracking-[0.25em] text-white uppercase">{title}</p>
      <ul className="font-normal text-base font-sans leading-normal text-white ms-2">
        {links.map((l) => (
          <li key={l.href} className="mb-2.5 flex flex-row">
            <FooterArrow />
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener nofollow" className="text-base hover:underline whitespace-pre-line">{l.label}</a>
            ) : (
              <Link href={l.href} className="text-base hover:underline whitespace-pre-line">{l.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  // Footer columns mirror the main navigation menu.
  const propertiesLinks: FLink[] = [
    { label: "Homes for Rent", href: "/for-rent" },
    { label: "Vacation Rentals", href: "https://deerfieldvacationrentals.com", external: true },
  ];

  const serviceLinks: FLink[] = [
    { label: "Residential Property Management", href: "/residential-property-management" },
    { label: "Vacation Rental Management", href: "/vacation-rental-management" },
    { label: "Commercial Property Management", href: "/commercial-property-management" },
    { label: "HOA Management", href: "/hoa-management" },
    { label: "Property Services\n(Maintenance & Projects)", href: "/property-services" },
    { label: "Real Estate Brokerage", href: "/real-estate-brokerage" },
  ];

  const resourceLinks: FLink[] = [
    { label: "Resource Center", href: "/resources" },
    { label: "Free Rental Analysis", href: "/free-rental-analysis" },
    { label: "Owner Portal", href: "https://equityteam.rentvine.com/portals/owner/", external: true },
    { label: "Tenant Portal", href: "https://equityteam.rentvine.com/portals/resident/", external: true },
    { label: "Vendors", href: "/vendors" },
    { label: "Blog", href: "/blog" },
  ];

  const companyLinks: FLink[] = [
    { label: "About Us", href: "/about-us" },
    { label: "Our Team", href: "/about-us#team" },
    { label: "Community Commitment", href: "/blog/equityteam-community-commitment" },
    { label: "Areas We Serve", href: "/areas-we-serve" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Feedback", href: "/feedback" },
  ];

  const legalLinks: FLink[] = [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Sitemap", href: "/sitemap" },
    { label: "Real Estate Investing & Tax Disclosure", href: "/real-estate-investing-and-tax-disclosure" },
    { label: "Email Confidentiality Disclosure", href: "/email-confidentiality-disclosure" },
  ];

  return (
    <footer className="bg-black pt-[6.25rem] md:pt-[5.5rem]">
      {/* Main columns */}
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between gap-16">
          {/* Brand column */}

          <div className="mb-6 md:mb-0 md:w-1/4 text-center md:text-left">
            <Link href="/" className="inline-block mr-3">
              <img
                src={`${import.meta.env.BASE_URL}images/logo/equityteam-logo.webp`}
                alt="EquityTeam"
                style={{ maxHeight: 44 }}
                height={44}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </Link>

            <ul className="list-none my-8 mx-0 pl-0 flex flex-col gap-4">
              <li className="flex flex-row gap-4 items-center">
                <div className="w-8 text-[#B4975A] flex-shrink-0">
                  <svg className="w-full" width="40" height="41" viewBox="0 0 40 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33337 35.5V5.5H19.7223V12.3055H36.6667V35.5H3.33337ZM6.11112 32.7222H10.1389V28.6945H6.11112V32.7222ZM6.11112 25.9167H10.1389V21.8889H6.11112V25.9167ZM6.11112 19.1111H10.1389V15.0833H6.11112V19.1111ZM6.11112 12.3055H10.1389V8.27775H6.11112V12.3055ZM12.9167 32.7222H16.9445V28.6945H12.9167V32.7222ZM12.9167 25.9167H16.9445V21.8889H12.9167V25.9167ZM12.9167 19.1111H16.9445V15.0833H12.9167V19.1111ZM12.9167 12.3055H16.9445V8.27775H12.9167V12.3055ZM19.7223 32.7222H33.889V15.0833H19.7223V19.1111H23.0556V21.8889H19.7223V25.9167H23.0556V28.6945H19.7223V32.7222ZM27.0834 21.8889V19.1111H29.8612V21.8889H27.0834ZM27.0834 28.6945V25.9167H29.8612V28.6945H27.0834Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-white">11427 Reed Hartman Hwy <br /> Cincinnati, OH 45241</span>
              </li>
              <li className="flex flex-row gap-4 items-center">
                <div className="w-8 text-[#B4975A] flex-shrink-0">
                  <svg className="w-full" width="40" height="41" viewBox="0 0 40 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <mask id="footer-phone-mask" style={{ maskType: "alpha" } as never} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="41">
                      <rect y="0.5" width="40" height="40" fill="currentColor"/>
                    </mask>
                    <g mask="url(#footer-phone-mask)">
                      <path d="M33.1667 35.5C29.8611 35.5 26.5278 34.7292 23.1667 33.1875C19.8056 31.6458 16.7083 29.4583 13.875 26.625C11.0417 23.7917 8.85417 20.6944 7.3125 17.3333C5.77083 13.9722 5 10.6389 5 7.33333C5 6.80953 5.1746 6.37301 5.52379 6.02379C5.87301 5.6746 6.30953 5.5 6.83333 5.5H12.9722C13.3611 5.5 13.6991 5.63657 13.9861 5.90971C14.2731 6.18288 14.463 6.51853 14.5555 6.91667L15.6647 12.3511C15.7216 12.7652 15.713 13.1296 15.6389 13.4444C15.5648 13.7593 15.4145 14.0299 15.1881 14.2563L11.0694 18.4167C11.7361 19.5741 12.4652 20.6644 13.2569 21.6875C14.0486 22.7106 14.9213 23.6852 15.875 24.6111C16.8472 25.6019 17.8704 26.5116 18.9445 27.3403C20.0185 28.169 21.1482 28.9074 22.3333 29.5556L26.2778 25.5278C26.5463 25.2408 26.8695 25.0394 27.2473 24.9236C27.6251 24.8079 27.9963 24.7778 28.3611 24.8333L33.5833 25.9445C33.9908 26.0556 34.3287 26.2713 34.5972 26.5915C34.8657 26.9118 35 27.2702 35 27.6667V33.6667C35 34.1905 34.8254 34.627 34.4762 34.9762C34.127 35.3254 33.6905 35.5 33.1667 35.5ZM9.70833 15.8333L12.875 12.6389L12 8.27775H7.79167C7.875 9.43517 8.06481 10.6296 8.36108 11.8611C8.65739 13.0926 9.10647 14.4167 9.70833 15.8333ZM24.9305 30.8889C26.0509 31.3982 27.2431 31.8102 28.507 32.125C29.7708 32.4398 31.0093 32.6297 32.2222 32.6945V28.5L28.0556 27.6528L24.9305 30.8889Z" fill="currentColor"/>
                    </g>
                  </svg>
                </div>
                <a href="tel:+15134444010" className="text-white">(513) 444-4010</a>
              </li>
              <li className="flex flex-row gap-4 items-center">
                <div className="w-8 text-[#B4975A] flex-shrink-0" />
                <span className="text-white">Ohio Licensed Broker: REC.2012001994</span>
              </li>
            </ul>

            <div className="flex text-left justify-center md:justify-start mt-10 mb-12 md:mb-0">
              <a
                href="https://www.facebook.com/equityteam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center w-[32px] h-[32px] p-2 mr-4 last:mr-0 text-primary rounded-full bg-secondary text-primary hover:text-white social-icon"
              >
                <i className="fa fa-facebook" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.linkedin.com/company/equityteam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center w-[32px] h-[32px] p-2 mr-4 last:mr-0 text-primary rounded-full bg-secondary text-primary hover:text-white social-icon"
              >
                <i className="fa fa-linkedin" aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Link columns — mirror the main menu */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:w-3/4">
            <FooterColumn title="Properties" links={propertiesLinks} />
            <FooterColumn title="Services" links={serviceLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
            <FooterColumn title="Company" links={companyLinks} />
          </div>
        </div>
      </div>

      {/* Bottom bar: legal links + copyright */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="border-t border-white/10 pt-6 pb-10 flex flex-col items-center gap-4">
          <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-sans text-white/55 hover:text-white hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
          <span className="text-sm font-normal font-sans text-white/55 text-center">
            Copyright &copy; EquityTeam, LLC 2008 &ndash; present
          </span>
        </div>
      </div>
    </footer>
  );
}
