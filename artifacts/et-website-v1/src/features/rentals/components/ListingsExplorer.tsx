"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { Link } from "wouter";
import type { Listing } from "../lib/aptly";
import { applicationUrlFor, dollars, isAvailableNow, leadFormUrlFor, safeHttpsUrl } from "../lib/aptly";
import { listingPath } from "../lib/seo";
import { ListingsMap } from "./ListingsMap";

function imageFor(listing: Listing) {
  return listing.photo?.[0] || listing.marketingFiles?.[0] || "";
}

function imagesFor(listing: Listing) {
  return [...new Set([...(listing.marketingFiles || []), ...(listing.photo || [])])];
}

function addressFor(listing: Listing) {
  const a = listing.address;
  return [a?.address, a?.address2 ? `#${a.address2}` : "", a?.city, a?.stateCode, a?.postalCode]
    .filter(Boolean)
    .join(" ");
}

function amenitiesFor(listing: Listing) {
  return [...new Set([...(listing.unitAmenities || []), ...(listing.buildingAmenities || [])])].slice(0, 12);
}

function miniMapUrl(listing: Listing) {
  const point = listing.address?.geopoint;
  if (!point) return "";
  const [lng, lat] = point;
  const pad = 0.012;
  const bbox = [lng - pad, lat - pad, lng + pad, lat + pad].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lng}`)}`;
}

function availabilityFor(listing: Listing) {
  if (!listing.availableDate) return "Contact leasing";
  const match = listing.availableDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const date = match ? new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2])) : new Date(listing.availableDate);
  return Number.isNaN(date.getTime()) ? listing.availableDate : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function petsFor(listing: Listing) {
  if (listing.petsAllowed === true) return "Allowed; restrictions may apply";
  if (listing.petsAllowed === false) return "Not allowed";
  return typeof listing.petsAllowed === "string" && listing.petsAllowed ? listing.petsAllowed : "Contact leasing";
}

export function ListingsExplorer({ listings, asOf }: { listings: Listing[]; asOf?: number }) {
  const [now, setNow] = useState(asOf);
  useEffect(() => { setNow(Date.now()); }, []);
  const [query, setQuery] = useState("");
  const [beds, setBeds] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [pets, setPets] = useState(false);
  const [sort, setSort] = useState("featured");
  const [activeId, setActiveId] = useState<string>();
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [photoIndexes, setPhotoIndexes] = useState<Record<string, number>>({});
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const comparisonRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (compareOpen) comparisonRef.current?.showModal();
    else comparisonRef.current?.close();
  }, [compareOpen]);
  const [sharedId, setSharedId] = useState<string>();
  const handleActive = useCallback((id?: string) => setActiveId(id), []);
  const selectListing = useCallback((id: string) => {
    setSelectedId(id);
    setActiveId(id);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    document.getElementById(`listing-${selectedId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedId]);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    const result = listings.filter((listing) => {
      const haystack = `${listing.name || ""} ${listing.marketingName || ""} ${addressFor(listing)}`.toLowerCase();
      if (text && !haystack.includes(text)) return false;
      if (beds && (listing.beds || 0) < Number(beds)) return false;
      if (maxRent && (listing.marketRent?.amount || Infinity) > Number(maxRent) * 100) return false;
      if (pets && listing.petsAllowed !== true) return false;
      return true;
    });
    if (sort === "rent-low") result.sort((a, b) => (a.marketRent?.amount || Infinity) - (b.marketRent?.amount || Infinity));
    if (sort === "rent-high") result.sort((a, b) => (b.marketRent?.amount || 0) - (a.marketRent?.amount || 0));
    if (sort === "beds") result.sort((a, b) => (b.beds || 0) - (a.beds || 0));
    return result;
  }, [listings, query, beds, maxRent, pets, sort]);

  const clear = () => {
    setQuery(""); setBeds(""); setMaxRent(""); setPets(false); setSort("featured");
  };

  const movePhoto = (listing: Listing, direction: number) => {
    const count = imagesFor(listing).length;
    if (count < 2) return;
    setPhotoIndexes((current) => ({ ...current, [listing._id]: ((current[listing._id] || 0) + direction + count) % count }));
  };

  const toggleCompare = (id: string) => {
    setCompareIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  };

  const shareListing = async (listing: Listing) => {
    const url = new URL(listingPath(listing), window.location.origin).toString();
    const title = `${addressFor(listing)} for rent`;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else await navigator.clipboard.writeText(url);
      setSharedId(listing._id);
      window.setTimeout(() => setSharedId(undefined), 1800);
    } catch { /* The user can cancel the native share sheet. */ }
  };

  const compared = compareIds.map((id) => listings.find((listing) => listing._id === id)).filter(Boolean) as Listing[];

  return (
    <section id="available-homes" className="listings-section">
      <div className="shell results-shell">
        <div className="rentals-section-heading">
          <div>
            <p className="eyebrow">Live from EquityTeam</p>
            <h2>Available homes</h2>
          </div>
          <p><strong>{filtered.length}</strong> of {listings.length} homes</p>
        </div>

        <div className={`search-unit${filtersOpen ? " is-open" : ""}`}>
          <div className="search-toolbar" aria-label="Search and filter available homes">
            <label className="minimal-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by city or address" aria-label="Search by city or address" /></label>
            <button onClick={() => setFiltersOpen((open) => !open)}>Rent Range <b>{maxRent ? `Up to $${Number(maxRent).toLocaleString()}` : "Any"}</b></button>
            <button onClick={() => setFiltersOpen((open) => !open)}>Bedrooms <b>{beds ? `${beds}+ beds` : "Any"}</b></button>
            <button className={filtersOpen ? "is-active" : ""} onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>Filters <b>{[beds, maxRent, pets ? "pets" : ""].filter(Boolean).length || "＋"}</b></button>
          </div>
          {filtersOpen && <div className="filter-drawer">
            <label><span>Bedrooms</span><select value={beds} onChange={(e) => setBeds(e.target.value)}><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label>
            <label><span>Max rent</span><select value={maxRent} onChange={(e) => setMaxRent(e.target.value)}><option value="">Any</option><option value="1000">$1,000</option><option value="1500">$1,500</option><option value="2000">$2,000</option><option value="2500">$2,500</option></select></label>
            <label><span>Sort</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="rent-low">Rent: low to high</option><option value="rent-high">Rent: high to low</option><option value="beds">Most bedrooms</option></select></label>
            <label className="check-label"><input type="checkbox" checked={pets} onChange={(e) => setPets(e.target.checked)} /><span>Pets allowed</span></label>
            <button className="clear-button" onClick={clear}>Clear all</button>
            <button className="drawer-done" onClick={() => setFiltersOpen(false)}>Show {filtered.length} homes</button>
          </div>}
        </div>

        <div className="view-switcher" aria-label="Choose results view">
          <button className={mobileView === "list" ? "is-active" : ""} onClick={() => setMobileView("list")}>List</button>
          <button className={mobileView === "map" ? "is-active" : ""} onClick={() => setMobileView("map")}>Map</button>
        </div>

        {filtered.length ? (
          <div className={`results-layout mobile-${mobileView}`}>
            <aside className="map-column"><ListingsMap listings={filtered} selectedId={selectedId} onActive={handleActive} onSelect={selectListing} /></aside>
            <div className="cards-grid results-grid">
            {filtered.map((listing) => {
              const available = isAvailableNow(listing.availableDate, now);
              const images = imagesFor(listing);
              const photoIndex = Math.min(photoIndexes[listing._id] || 0, Math.max(0, images.length - 1));
              const tourUrl = safeHttpsUrl(listing.virtualTourUrl) || safeHttpsUrl(listing.videoUrl);
              const comparing = compareIds.includes(listing._id);
              return (
              <article id={`listing-${listing._id}`} className={`listing-card${activeId === listing._id ? " is-active" : ""}${selectedId === listing._id ? " is-selected" : ""}`} key={listing._id} onMouseEnter={() => setActiveId(listing._id)} onMouseLeave={() => setActiveId(undefined)}>
                <div className="card-image">
                  <button className="card-image-select" onClick={() => selectListing(listing._id)} aria-label={`Preview ${addressFor(listing)} on the map`}>
                    {images[photoIndex] || imageFor(listing) ? <img src={images[photoIndex] || imageFor(listing)} alt={`${listing.address?.address || listing.name || "Rental home"}, photo ${photoIndex + 1} of ${images.length}`} loading="lazy" /> : <div className="image-placeholder">EquityTeam</div>}
                  </button>
                  <span className={`availability${available ? "" : " coming-soon"}`}>{available ? "Available now" : `Available ${listing.availableDate}`}</span>
                  {images.length > 1 && <>
                    <button className="carousel-arrow previous" onClick={() => movePhoto(listing, -1)} aria-label="Previous property photo">‹</button>
                    <button className="carousel-arrow next" onClick={() => movePhoto(listing, 1)} aria-label="Next property photo">›</button>
                    <div className="photo-progress" aria-label={`Photo ${photoIndex + 1} of ${images.length}`}>
                      <span className="photo-dots">{images.slice(0, 5).map((_, index) => <i className={index === Math.min(photoIndex, 4) ? "is-current" : ""} key={index} />)}</span>
                      <b>{photoIndex + 1}/{images.length}</b>
                    </div>
                  </>}
                  <div className="image-tools">
                    {tourUrl && <a href={tourUrl} target="_blank" rel="noreferrer" className="image-tool tour-tool" title="Open 3D tour or video"><span>▶</span> Tour</a>}
                    <button className="image-tool" onClick={() => void shareListing(listing)} title="Share this property"><span>↗</span>{sharedId === listing._id ? "Copied" : "Share"}</button>
                    <button className={`image-tool${comparing ? " is-selected" : ""}`} onClick={() => toggleCompare(listing._id)} title={comparing ? "Remove from comparison" : "Add to comparison"} disabled={!comparing && compareIds.length >= 3}><span>＋</span>{comparing ? "Added" : "Compare"}</button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price">{dollars(listing.marketRent?.amount)}<small>/mo</small></div>
                  <div className="facts"><strong>{listing.beds ?? "—"}</strong> bd <i /> <strong>{listing.baths ?? "—"}</strong> ba <i /> <strong>{listing.totalArea?.toLocaleString() || "—"}</strong> sq ft</div>
                  <h3><Link href={listingPath(listing)}>{listing.marketingName || listing.address?.address || listing.name}</Link></h3>
                  <p>{[listing.address?.city, listing.address?.stateCode, listing.address?.postalCode].filter(Boolean).join(", ").replace(", ,", ",")}</p>
                  <div className="card-actions">
                    {available ? <>
                      <a href={`${listingPath(listing)}#tour-times`} target="_blank" rel="noreferrer" className="card-action primary">Self Tour</a>
                      <a href={applicationUrlFor(listing)} target="_blank" rel="noreferrer" className="card-action">Apply</a>
                    </> : <>
                      <a href={leadFormUrlFor(listing, "notify")} target="_blank" rel="noreferrer" className="card-action primary">Get Notified</a>
                      <a href={applicationUrlFor(listing)} target="_blank" rel="noreferrer" className="card-action">Get Pre-Approved</a>
                    </>}
                    <Link href={listingPath(listing)} className="card-action details">View Details <b>→</b></Link>
                  </div>
                </div>
              </article>
            )})}
            </div>
          </div>
        ) : (
          <div className="empty-state"><h3>No exact matches</h3><p>Try widening your search or clearing the filters.</p><button className="button button-navy" onClick={clear}>Show all homes</button></div>
        )}
      </div>
      {compareIds.length > 0 && <div className="compare-tray" role="status">
        <div><strong>{compareIds.length} {compareIds.length === 1 ? "home" : "homes"} selected</strong><span>Select up to 3 homes to compare</span></div>
        <button className="compare-clear" onClick={() => setCompareIds([])}>Clear</button>
        <button className="compare-open" onClick={() => setCompareOpen(true)} disabled={compareIds.length < 2}>Compare homes</button>
      </div>}
      {compareOpen && <dialog ref={comparisonRef} className="compare-backdrop" aria-labelledby="compare-title" onCancel={() => setCompareOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setCompareOpen(false); }}>
        <section className="compare-modal" onMouseDown={(event) => event.stopPropagation()}>
          <div className="compare-heading"><div><p className="eyebrow">Side by side</p><h2 id="compare-title">Compare homes</h2></div><button onClick={() => setCompareOpen(false)} aria-label="Close comparison">×</button></div>
          <div className="compare-grid">
            {compared.map((listing) => {
              const images = imagesFor(listing);
              const photoIndex = Math.min(photoIndexes[listing._id] || 0, Math.max(0, images.length - 1));
              const amenities = amenitiesFor(listing);
              const mapUrl = miniMapUrl(listing);
              const available = isAvailableNow(listing.availableDate, now);
              return <article key={listing._id}>
                <div className="compare-property-head">
                  <div className="compare-photo">
                    {images[photoIndex] && <img src={images[photoIndex]} alt={`${listing.address?.address || "Rental home"}, photo ${photoIndex + 1} of ${images.length}`} />}
                    <span className={`compare-availability ${available ? "" : "coming-soon"}`}><i aria-hidden="true" />{available ? "Available now" : `Available ${availabilityFor(listing)}`}</span>
                    {images.length > 1 && <>
                      <button className="compare-photo-arrow previous" onClick={() => movePhoto(listing, -1)} aria-label="Previous comparison photo">‹</button>
                      <button className="compare-photo-arrow next" onClick={() => movePhoto(listing, 1)} aria-label="Next comparison photo">›</button>
                      <span className="compare-photo-count">{photoIndex + 1} / {images.length}</span>
                    </>}
                  </div>
                  <div className="compare-address"><h3>{listing.address?.address}</h3><p>{[listing.address?.city, listing.address?.stateCode, listing.address?.postalCode].filter(Boolean).join(", ")}</p></div>
                  <div className="compare-actions">
                    <a href={`${listingPath(listing)}#tour-times`} target="_blank" rel="noreferrer" className="compare-action primary">Self Tour</a>
                    <button className="compare-action" onClick={() => void shareListing(listing)}>{sharedId === listing._id ? "Link Copied" : "Share"}</button>
                    <Link className="compare-action" href={listingPath(listing)}>View Details</Link>
                  </div>
                </div>
                <dl className="compare-metrics">
                  <div><dt>Monthly rent</dt><dd>{dollars(listing.marketRent?.amount)}</dd></div>
                  <div><dt>Bedrooms</dt><dd>{listing.beds ?? "—"}</dd></div>
                  <div><dt>Bathrooms</dt><dd>{listing.baths ?? "—"}</dd></div>
                  <div><dt>Square feet</dt><dd>{listing.totalArea?.toLocaleString() || "—"}</dd></div>
                  <div><dt>Availability</dt><dd>{availabilityFor(listing)}</dd></div>
                  <div><dt>Lease term</dt><dd>{listing.leaseTerm ? `${listing.leaseTerm} ${listing.leaseTermUnits || "months"}` : "Contact leasing"}</dd></div>
                  <div><dt>Pets</dt><dd>{petsFor(listing)}</dd></div>
                  <div><dt>Security deposit</dt><dd>{listing.deposit?.amount ? dollars(listing.deposit.amount) : "Shown during application"}</dd></div>
                  <div><dt>Application fee</dt><dd>{listing.applicationFeeValue ? dollars(listing.applicationFeeValue) : listing.applicationFee || "Contact leasing"}</dd></div>
                  <div><dt>Laundry</dt><dd>{listing.laundryType || "Contact leasing"}</dd></div>
                  <div><dt>Parking</dt><dd>{listing.parkingType || "Contact us for details"}</dd></div>
                </dl>
                <section className="compare-data-row amenities-row"><h4>Amenities</h4>{amenities.length ? <ul>{amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul> : <p>Contact EquityTeam for amenity details.</p>}</section>
                <section className="compare-data-row location-row"><h4>Location</h4>{mapUrl ? <iframe src={mapUrl} title={`Map of ${addressFor(listing)}`} loading="lazy" /> : <p>Map location unavailable.</p>}<p>{addressFor(listing)}</p></section>
              </article>;
            })}
          </div>
        </section>
      </dialog>}
    </section>
  );
}
