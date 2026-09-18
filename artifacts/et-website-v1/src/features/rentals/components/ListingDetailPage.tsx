import { ListingGallery } from "./ListingGallery";
import { SEO } from "@/components/SEO";
import { aptlyShowingUrl, applicationUrlFor, safeHttpsUrl, cleanAmenity, dollars, type Listing, type TourSettings } from "../lib/aptly";
import { cityPath, fullAddress, listingPath, propertyHeading } from "../lib/seo";
import { TourAvailability } from "./TourAvailability";
import { NearbySchools } from "./NearbySchools";
import { Link } from "wouter";

function displayDate(value?: string | null) {
  if (!value) return "Contact leasing";
  const parts = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const date = parts ? new Date(Number(parts[3]), Number(parts[1]) - 1, Number(parts[2])) : new Date(value);
  return Number.isNaN(date.valueOf()) ? value : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function ListingDetailPage({ listing, nearbyListings, tourSettings, origin }: { listing: Listing; nearbyListings: Listing[]; tourSettings: TourSettings; origin: string }) {
  const images = Array.from(new Set([...(listing.marketingFiles || []), ...(listing.photo || [])]));
  const amenities = Array.from(new Set([...(listing.buildingAmenities || []), ...(listing.unitAmenities || [])])).map(cleanAmenity);
  const allFees = listing.aptlyListings?.representativeFees || [];
  const monthlyFees = allFees.filter((fee) => fee.type === "monthly" && fee.amount?.amount);
  const moveInFees = allFees.filter((fee) => fee.type === "moveIn" && fee.amount?.amount);
  const possibleFees = allFees.filter((fee) => !fee.amount?.amount && !/monthly rent|security deposit/i.test(fee.title));
  const address = fullAddress(listing);
  const canonicalUrl = `${origin}${listingPath(listing)}`;
  const applyUrl = applicationUrlFor(listing);
  const contactUrl = safeHttpsUrl(listing.aptlyListings?.contactFormUrl) || applyUrl;
  const liveShowingUrl = aptlyShowingUrl(listing);
  const heading = propertyHeading(listing);
  const rent = dollars(listing.marketRent?.amount);
  const city = listing.address?.city || "Greater Cincinnati";
  const state = listing.address?.stateCode || "OH";
  const baseRent = listing.marketRent?.amount || 0;
  const estimatedMonthly = baseRent + monthlyFees.reduce((total, fee) => total + (fee.amount?.amount || 0), 0);
  const estimatedMoveIn = baseRent + (listing.deposit?.amount || 0) + (listing.applicationFeeValue || 0) + monthlyFees.reduce((total, fee) => total + (fee.amount?.amount || 0), 0) + moveInFees.reduce((total, fee) => total + (fee.amount?.amount || 0), 0);
  const petDetails = Array.isArray(listing.petRestrictions) ? listing.petRestrictions.join(", ") : listing.petRestrictions || (listing.petsAllowed === true ? "Allowed; restrictions may apply" : "Contact leasing");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "EquityTeam Property Management",
        url: "https://www.equityteam.com/",
        telephone: "+1-513-875-7975",
        email: "leasing@equityteam.com",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Homes for Rent", item: origin },
          { "@type": "ListItem", position: 2, name: `${city}, ${state} Rentals`, item: `${origin}${cityPath(listing)}` },
          { "@type": "ListItem", position: 3, name: listing.address?.address || listing.name, item: canonicalUrl },
        ],
      },
      {
        "@type": listing.unitType === "Apartment" ? "Apartment" : "SingleFamilyResidence",
        "@id": `${canonicalUrl}#property`,
        name: heading,
        description: listing.marketingDescription,
        url: canonicalUrl,
        image: images,
        address: {
          "@type": "PostalAddress",
          streetAddress: [listing.address?.address, listing.address?.address2].filter(Boolean).join(" "),
          addressLocality: city,
          addressRegion: state,
          postalCode: listing.address?.postalCode,
          addressCountry: "US",
        },
        geo: listing.address?.geopoint ? {
          "@type": "GeoCoordinates",
          longitude: listing.address.geopoint[0],
          latitude: listing.address.geopoint[1],
        } : undefined,
        numberOfBedrooms: listing.beds,
        numberOfBathroomsTotal: listing.baths,
        floorSize: listing.totalArea ? { "@type": "QuantitativeValue", value: listing.totalArea, unitCode: "FTK" } : undefined,
        petsAllowed: listing.petsAllowed === true,
        amenityFeature: amenities.map((item) => ({ "@type": "LocationFeatureSpecification", name: item, value: true })),
        offers: listing.marketRent?.amount ? {
          "@type": "Offer",
          url: canonicalUrl,
          price: listing.marketRent.amount / 100,
          priceCurrency: listing.marketRent.currency || "USD",
          availability: "https://schema.org/InStock",
          businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
          seller: { "@id": `${origin}/#organization` },
        } : undefined,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How much is rent at ${listing.address?.address || address}?`, acceptedAnswer: { "@type": "Answer", text: `The advertised monthly rent is ${rent}. Additional fees or qualification requirements may apply.` } },
          { "@type": "Question", name: `How many bedrooms and bathrooms does this ${city} rental have?`, acceptedAnswer: { "@type": "Answer", text: `This rental has ${listing.beds ?? "an unlisted number of"} bedroom${listing.beds === 1 ? "" : "s"} and ${listing.baths ?? "an unlisted number of"} bathroom${listing.baths === 1 ? "" : "s"}${listing.totalArea ? ` across approximately ${listing.totalArea.toLocaleString()} square feet` : ""}.` } },
          { "@type": "Question", name: `How can I tour or apply for this EquityTeam rental?`, acceptedAnswer: { "@type": "Answer", text: "Use the Schedule a Tour or Apply Now link on this page to continue through EquityTeam's secure Aptly portal. You can also contact the ET Leasing Team at (513) 875-7975." } },
        ],
      },
    ],
  };

  return (
    <div className="et-rentals">
      <SEO title={`${heading} | EquityTeam`} description={`${heading} at ${address}. View photos, rent, amenities, and tour options.`} canonical={listingPath(listing)} ogImage={images[0]} schema={structuredData} />

      <div className="shell detail-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/for-rent">Homes for Rent</a><span>›</span><a href={cityPath(listing)}>{city}, {state}</a><span>›</span><span>{listing.address?.address}</span>
        </nav>
        <ListingGallery key={listing._id} images={images} address={address} />

        <div className="detail-layout">
          <article>
            <p className="eyebrow">Available rental in {city}, {state}</p>
            <h1 className="detail-title">{heading}</h1>
            <p className="detail-address">{address}</p>
            <p className="search-summary">{listing.address?.address} is an available {listing.beds ? `${listing.beds}-bedroom, ` : ""}{listing.baths ? `${listing.baths}-bathroom ` : ""}{(listing.unitType || "home").toLowerCase()} for rent in {city}, {state} {listing.address?.postalCode}. The advertised rent is {rent} per month{listing.totalArea ? ` for approximately ${listing.totalArea.toLocaleString()} square feet` : ""}.</p>
            <div className="detail-facts">
              <div><strong>{rent}</strong><span>Monthly rent</span></div>
              <div><strong>{listing.beds ?? "—"}</strong><span>Bedrooms</span></div>
              <div><strong>{listing.baths ?? "—"}</strong><span>Bathrooms</span></div>
              <div><strong>{listing.totalArea?.toLocaleString() || "—"}</strong><span>Square feet</span></div>
            </div>

            <section className="detail-section tour-section" id="tour-times">
              <p className="eyebrow">Self-tour this home</p>
              <h2>Available tour dates</h2>
              <p className="section-intro">Pick a date and preferred time, then continue to Aptly to verify live availability and reserve your self-tour.</p>
              <TourAvailability bookingUrl={liveShowingUrl} settings={tourSettings} />
            </section>

            <section className="detail-section">
              <h2>Rental features</h2>
              <dl className="rental-features">
                <div><dt>Available date</dt><dd>{displayDate(listing.availableDate)}</dd></div>
                <div><dt>Property type</dt><dd>{listing.unitType || listing.buildingType || "Rental home"}</dd></div>
                <div><dt>Address</dt><dd>{address}</dd></div>
                <div><dt>Pets</dt><dd>{petDetails}</dd></div>
                <div><dt>Parking</dt><dd>{listing.parkingType || "Contact leasing"}</dd></div>
                <div><dt>Laundry</dt><dd>{listing.laundryType || "Contact leasing"}</dd></div>
                {listing.heatingType && <div><dt>Heating</dt><dd>{listing.heatingType}</dd></div>}
                {listing.coolingType && <div><dt>Cooling</dt><dd>{listing.coolingType}</dd></div>}
              </dl>
            </section>

            <section className="detail-section">
              <h2>About this {city} rental</h2>
              <div className="description">{(listing.marketingDescription || "Contact the EquityTeam leasing team for more information about this available home.").split(/\n+/).filter(Boolean).map((p) => <p key={p}>{p}</p>)}</div>
            </section>

            {amenities.length > 0 && <section className="detail-section"><h2>Property features and amenities</h2><ul className="amenities">{amenities.map((item) => <li key={item}>✓ <span>{item}</span></li>)}</ul></section>}

            <section className="detail-section pricing-section">
              <p className="eyebrow">Clear, upfront costs</p>
              <h2>Pricing breakdown</h2>
              <div className="pricing-columns">
                <div className="price-breakdown">
                  <div className="price-breakdown-heading"><span>Estimated monthly cost</span><strong>{dollars(estimatedMonthly)}</strong></div>
                  <dl><div><dt>Base rent</dt><dd>{rent}</dd></div>{monthlyFees.map((fee) => <div key={fee._id}><dt>{fee.title}</dt><dd>{dollars(fee.amount?.amount)}</dd></div>)}</dl>
                </div>
                <div className="price-breakdown">
                  <div className="price-breakdown-heading"><span>Estimated move-in cost</span><strong>{dollars(estimatedMoveIn)}</strong></div>
                  <dl>
                    <div><dt>First month&apos;s base rent</dt><dd>{rent}</dd></div>
                    {listing.deposit?.amount ? <div><dt>Move-in deposit</dt><dd>{dollars(listing.deposit.amount)}</dd></div> : null}
                    {listing.applicationFeeValue ? <div><dt>Application fee</dt><dd>{dollars(listing.applicationFeeValue)}</dd></div> : null}
                    {monthlyFees.map((fee) => <div key={`first-${fee._id}`}><dt>First month: {fee.title}</dt><dd>{dollars(fee.amount?.amount)}</dd></div>)}
                    {moveInFees.map((fee) => <div key={fee._id}><dt>{fee.title}</dt><dd>{dollars(fee.amount?.amount)}</dd></div>)}
                  </dl>
                </div>
              </div>
              {possibleFees.length > 0 && <div className="conditional-fees"><strong>Other charges that may apply</strong><p>{possibleFees.map((fee) => fee.title).filter((fee, index, values) => values.indexOf(fee) === index).join(" · ")}</p></div>}
              <p className="pricing-disclaimer">Estimates use the amounts currently published in Aptly and are for planning purposes only. Pricing may change, and conditional fees depend on the applicant, lease, pets, utilities, or property. The final approved lease and fee disclosure control.</p>

              <h3 className="lease-subheading">Lease details</h3>
              <dl className="lease-grid">
                <div><dt>Availability</dt><dd>{displayDate(listing.availableDate)}</dd></div>
                <div><dt>Lease term</dt><dd>{listing.leaseTerm ? `${listing.leaseTerm} ${listing.leaseTermUnits || "months"}` : "Contact leasing"}</dd></div>
                <div><dt>Pets</dt><dd>{petDetails}</dd></div>
                <div><dt>Security deposit</dt><dd>{listing.deposit?.amount ? dollars(listing.deposit.amount) : "Shown during application"}</dd></div>
                {listing.applicationFeeValue ? <div><dt>Application fee</dt><dd>{dollars(listing.applicationFeeValue)}</dd></div> : null}
                {listing.laundryType ? <div><dt>Laundry</dt><dd>{listing.laundryType}</dd></div> : null}
              </dl>
            </section>

            <section className="detail-section leasing-team-section">
              <div>{listing.aptlyListings?.contactImage && <img src={listing.aptlyListings.contactImage} alt="EquityTeam leasing team" />}</div>
              <div><p className="eyebrow">Questions or concerns?</p><h2>Let&apos;s talk.</h2><p>Our leasing team can help with tour access, qualifications, applications, and property-specific fees.</p><strong>{listing.aptlyListings?.contactName || "ET Leasing Team"}</strong><a href={`tel:${listing.aptlyListings?.contactPhone || "+15138757975"}`}>{listing.aptlyListings?.contactPhone || "(513) 875-7975"}</a><a href={`mailto:${listing.aptlyListings?.contactEmail || "leasing@equityteam.com"}`}>{listing.aptlyListings?.contactEmail || "leasing@equityteam.com"}</a><a className="button button-navy" href={contactUrl} target="_blank" rel="noreferrer">Contact leasing</a></div>
            </section>

            {nearbyListings.length > 0 && <section className="detail-section nearby-section"><p className="eyebrow">More homes nearby</p><h2>Similar rentals you may like</h2><div className="nearby-grid">{nearbyListings.map((nearby) => <Link key={nearby._id} className="nearby-card" href={listingPath(nearby)}><img src={nearby.marketingFiles?.[0] || nearby.photo?.[0]} alt={`${fullAddress(nearby)} rental`} /><div><strong>{dollars(nearby.marketRent?.amount)}<small>/mo</small></strong><span>{nearby.beds ?? "—"} bd · {nearby.baths ?? "—"} ba · {nearby.totalArea?.toLocaleString() || "—"} sq ft</span><h3>{nearby.address?.address}</h3><p>{nearby.address?.city}, {nearby.address?.stateCode} {nearby.address?.postalCode}</p></div></Link>)}</div></section>}

            <section className="detail-section answer-section">
              <h2>Frequently asked questions</h2>
              <details open><summary>How much is rent at {listing.address?.address}?</summary><p>The advertised monthly rent is <strong>{rent}</strong>. Review the lease details above and the secure application for property-specific charges and qualification requirements.</p></details>
              <details><summary>How large is this rental?</summary><p>This home has <strong>{listing.beds ?? "—"} bedroom{listing.beds === 1 ? "" : "s"}</strong>, <strong>{listing.baths ?? "—"} bathroom{listing.baths === 1 ? "" : "s"}</strong>{listing.totalArea ? `, and approximately ${listing.totalArea.toLocaleString()} square feet` : ""}.</p></details>
              <details><summary>Where is this home located?</summary><p>This rental is located at <strong>{address}</strong> and is professionally managed by EquityTeam.</p></details>
              <details><summary>How do I tour or apply?</summary><p>Use the tour and application buttons on this page to continue through EquityTeam&apos;s secure Aptly portal, or call the ET Leasing Team at <a href="tel:+15138757975">(513) 875-7975</a>.</p></details>
            </section>
          </article>

          <aside className="action-card">
            <p className="eyebrow">Ready to see it?</p>
            <h2>Make this your next home.</h2>
            <p>Schedule a tour or start your application through EquityTeam’s secure Aptly portal.</p>
            <a className="button button-gold button-block" href="#tour-times">View tour times</a>
            <a className="button button-outline button-block" href={applyUrl} target="_blank" rel="noreferrer">Apply now</a>
            <div className="leasing-contact"><strong>{listing.aptlyListings?.contactName || "ET Leasing Team"}</strong><a href={`tel:${listing.aptlyListings?.contactPhone || "+15138757975"}`}>{listing.aptlyListings?.contactPhone || "(513) 875-7975"}</a><a href={`mailto:${listing.aptlyListings?.contactEmail || "leasing@equityteam.com"}`}>{listing.aptlyListings?.contactEmail || "leasing@equityteam.com"}</a></div>
          </aside>
        </div>

        <NearbySchools coordinates={listing.address?.geopoint} address={address} />
      </div>

    </div>
  );
}
