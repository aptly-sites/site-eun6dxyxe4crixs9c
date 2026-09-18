import type { Listing } from "./aptly";

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function listingPath(listing: Listing) {
  const address = listing.address;
  const state = slugify(address?.stateCode || address?.state || "oh");
  const city = slugify(address?.city || "greater-cincinnati");
  const zip = slugify(address?.postalCode || "rental");
  const street = slugify(
    [address?.address, address?.address2 ? `unit ${address.address2}` : ""]
      .filter(Boolean)
      .join(" ") || listing.name || "home",
  );
  return `/for-rent/${state}/${city}/${zip}/${street}--${listing._id}`;
}

export function cityPath(listing: Listing) {
  return `/for-rent/${slugify(listing.address?.stateCode || "oh")}/${slugify(listing.address?.city || "greater-cincinnati")}`;
}

export function listingIdFromSlug(slug: string) {
  return slug.includes("--") ? slug.split("--").pop() || "" : "";
}

export function propertyHeading(listing: Listing) {
  if (listing.marketingName?.trim()) return listing.marketingName.trim();
  const bedrooms = listing.beds ? `${listing.beds}-Bedroom` : "Available";
  const type = listing.unitType || listing.buildingType || "Home";
  const locality = [listing.address?.city, listing.address?.stateCode].filter(Boolean).join(", ");
  return `${bedrooms} ${type} for Rent${locality ? ` in ${locality}` : ""}`;
}

export function fullAddress(listing: Listing) {
  return listing.address?.standardAddress || listing.address?.formattedAddress || listing.name || "Available rental home";
}
