/**
 * Resource Center configuration.
 *
 * The parent page (/resources) and every audience hub (/resources/{slug})
 * render entirely from this file. To grow a hub, just add links/sections here —
 * no component changes needed. Future content per hub: calculators, terms &
 * conditions, onboarding tutorials, support/FAQ links, portal logins, guides.
 */

import type { FaqItem } from "@/data/faqData";
import { ownerSalesFaqs, ownerSupportFaqs, propertyServicesFaqs, leasingFaqs, tenantSupportFaqs } from "@/data/faqData";

export type ResourceGroup = "owners" | "residents";

export interface ResourceLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ResourceSection {
  heading: string;
  links: ResourceLink[];
}

export interface ResourceHub {
  slug: string;
  group: ResourceGroup;
  /** Short menu/label name, e.g. "Residential Tenants" */
  title: string;
  /** Page H1, e.g. "Residential Tenant Resources" */
  pageTitle: string;
  intro: string;
  sections: ResourceSection[];
  /** Optional FAQ block — rendered as an accordion + FAQPage schema on the hub. */
  faqs?: FaqItem[];
  seoTitle: string;
  seoDescription: string;
}

export const GROUP_LABELS: Record<ResourceGroup, string> = {
  owners: "Owners & Investors",
  residents: "Residents & Guests",
};

export const RESOURCE_HUBS: ResourceHub[] = [
  /* ─────────── OWNERS & INVESTORS ─────────── */
  {
    slug: "residential-owners",
    group: "owners",
    title: "Residential Owners",
    pageTitle: "Residential Owner Resources",
    intro:
      "Everything owners of single-family and multi-family rentals need in one place — your owner portal, reporting, and the tools to make confident decisions about your investment.",
    sections: [
      {
        heading: "Portals & Account",
        links: [{ label: "Owner Portal (RentVine)", href: "https://equityteam.rentvine.com/portals/owner/", external: true }],
      },
      {
        heading: "Get Started & Grow",
        links: [
          { label: "Residential Property Management", href: "/residential-property-management" },
          { label: "Free Rental Analysis", href: "/free-rental-analysis" },
        ],
      },
      {
        heading: "Decision Tools",
        links: [
          { label: "Rent vs. Sell Calculator", href: "/tools/rent-vs-sell" },
          { label: "Rent Affordability Calculator", href: "/tools/rent-affordability" },
          { label: "PM Fee ROI Calculator", href: "/tools/pm-fee-roi" },
          { label: "1031 Exchange Calculator", href: "/tools/1031-exchange" },
          { label: "Vacancy Cost Calculator", href: "/tools/vacancy-cost" },
          { label: "Eviction Cost Calculator", href: "/tools/eviction-cost" },
        ],
      },
      {
        heading: "More",
        links: [{ label: "Owner Blog & Articles", href: "/blog" }],
      },
    ],
    faqs: [...ownerSalesFaqs, ...ownerSupportFaqs],
    seoTitle: "Residential Owner Resources | EquityTeam",
    seoDescription:
      "Resources for EquityTeam residential rental owners — owner portal, free rental analysis, decision calculators, and answers to common owner questions.",
  },
  {
    slug: "commercial-owners",
    group: "owners",
    title: "Commercial Owners",
    pageTitle: "Commercial Owner Resources",
    intro:
      "Resources for owners of office, retail, and mixed-use commercial property managed by EquityTeam — reporting, leasing support, and how to get started.",
    sections: [
      {
        heading: "Portals & Account",
        links: [{ label: "Owner Portal (RentVine)", href: "https://equityteam.rentvine.com/portals/owner/", external: true }],
      },
      {
        heading: "Our Services",
        links: [
          { label: "Commercial Property Management", href: "/commercial-property-management" },
          { label: "Talk to Our Team", href: "/contact-us" },
        ],
      },
    ],
    seoTitle: "Commercial Owner Resources | EquityTeam",
    seoDescription:
      "Resources for EquityTeam commercial property owners — owner portal, management services, and support for office, retail, and mixed-use assets.",
  },
  {
    slug: "vacation-rental-owners",
    group: "owners",
    title: "Vacation Rental Owners",
    pageTitle: "Vacation Rental Owner Resources",
    intro:
      "For owners of short-stay and vacation rental properties — performance reporting, revenue tools, and our Deerfield Vacation Rentals operation at Norris Lake.",
    sections: [
      {
        heading: "Portals & Account",
        links: [{ label: "Owner Reporting Login (DBR)", href: "https://deerfieldvacationrentals.com", external: true }],
      },
      {
        heading: "Our Services",
        links: [
          { label: "Vacation Rental Management", href: "/vacation-rental-management" },
          { label: "Deerfield Vacation Rentals (Norris Lake, TN)", href: "https://deerfieldvacationrentals.com", external: true },
          { label: "Free Rental Analysis", href: "/free-rental-analysis" },
        ],
      },
      {
        heading: "Decision Tools",
        links: [{ label: "Short-Term vs. Long-Term Calculator", href: "/tools/str-vs-ltr" }],
      },
    ],
    seoTitle: "Vacation Rental Owner Resources | EquityTeam",
    seoDescription:
      "Resources for EquityTeam vacation rental owners — owner reporting, revenue tools, and short-stay management in Cincinnati, Dayton, and Norris Lake.",
  },
  {
    slug: "hoa-boards",
    group: "owners",
    title: "HOA Boards",
    pageTitle: "HOA Board Resources",
    intro:
      "For the volunteer boards we partner with — the support, reporting, and tools that keep your community running smoothly.",
    sections: [
      {
        heading: "Our Services",
        links: [
          { label: "HOA Management", href: "/hoa-management" },
          { label: "Request a Proposal", href: "/contact-us" },
        ],
      },
    ],
    seoTitle: "HOA Board Resources | EquityTeam",
    seoDescription:
      "Resources for HOA and community-association boards managed by EquityTeam in Cincinnati & Dayton — board support, reporting, and financial transparency.",
  },

  /* ─────────── RESIDENTS & GUESTS ─────────── */
  {
    slug: "residential-tenants",
    group: "residents",
    title: "Residential Tenants",
    pageTitle: "Residential Tenant Resources",
    intro:
      "Everything you need as an EquityTeam resident — pay rent, submit maintenance requests, review your application terms, and get answers fast.",
    sections: [
      {
        heading: "Portals & Payments",
        links: [{ label: "Tenant Portal (pay rent, maintenance)", href: "https://equityteam.rentvine.com/portals/resident/", external: true }],
      },
      {
        heading: "Looking for a Home",
        links: [{ label: "Find a Rental", href: "/for-rent" }],
      },
      {
        heading: "Terms & Documents",
        links: [{ label: "Application Terms & Conditions", href: "https://docs.google.com/document/d/e/2PACX-1vTHckBqH-nl4_ULQSQxWcISpiVwnSZZnxjg3Ne8W-toF7m-1eShrpVctNdlK6dp_aUWwLYqMhQhKhNP/pub", external: true }],
      },
      {
        heading: "More",
        links: [{ label: "Blog & Articles", href: "/blog" }],
      },
    ],
    faqs: [...leasingFaqs, ...tenantSupportFaqs],
    seoTitle: "Residential Tenant Resources | EquityTeam",
    seoDescription:
      "Resources for EquityTeam residential tenants — tenant portal to pay rent and submit maintenance, application terms, find-a-rental, and tenant FAQs.",
  },
  {
    slug: "commercial-tenants",
    group: "residents",
    title: "Commercial Tenants",
    pageTitle: "Commercial Tenant Resources",
    intro:
      "Resources for tenants leasing commercial space managed by EquityTeam — payments, requests, and how to reach your management team.",
    sections: [
      {
        heading: "Get Help",
        links: [{ label: "Contact Our Team", href: "/contact-us" }],
      },
    ],
    seoTitle: "Commercial Tenant Resources | EquityTeam",
    seoDescription:
      "Resources for commercial tenants in EquityTeam-managed office, retail, and mixed-use properties in Greater Cincinnati and Dayton.",
  },
  {
    slug: "vacation-rental-guests",
    group: "residents",
    title: "Vacation Rental Guests",
    pageTitle: "Vacation Rental Guest Resources",
    intro:
      "Planning a stay? Find and book a vacation rental and access your guest information here.",
    sections: [
      {
        heading: "Book & Manage Your Stay",
        links: [
          { label: "Find a Vacation Rental", href: "https://deerfieldvacationrentals.com", external: true },
          { label: "Guest Portal", href: "https://deerfieldvacationrentals.com", external: true },
        ],
      },
    ],
    seoTitle: "Vacation Rental Guest Resources | EquityTeam",
    seoDescription:
      "Resources for vacation rental guests — find and book a stay and access guest information through EquityTeam and Deerfield Vacation Rentals.",
  },
  {
    slug: "hoa-homeowners",
    group: "residents",
    title: "HOA Homeowners",
    pageTitle: "HOA Homeowner Resources",
    intro:
      "For homeowners in the communities we manage — dues, requests, and how to reach your association's management team.",
    sections: [
      {
        heading: "Get Help",
        links: [{ label: "Contact Our Team", href: "/contact-us" }],
      },
    ],
    seoTitle: "HOA Homeowner Resources | EquityTeam",
    seoDescription:
      "Resources for homeowners in EquityTeam-managed HOA and community associations in Greater Cincinnati and Dayton — dues, requests, and support.",
  },

  /* ─────────── PROPERTY SERVICES (its own section) ─────────── */
  {
    slug: "property-services",
    group: "owners",
    title: "Property Services",
    pageTitle: "Property Services Resources",
    intro:
      "Maintenance, repairs, make-ready, and renovations — for EquityTeam-managed owners and as a standalone service for homeowners and investors across Greater Cincinnati and Dayton.",
    sections: [
      {
        heading: "Get Started",
        links: [
          { label: "Property Services Overview", href: "/property-services" },
          { label: "Request Service or a Quote", href: "/contact-us" },
        ],
      },
    ],
    faqs: [...propertyServicesFaqs],
    seoTitle: "Property Services Resources | EquityTeam",
    seoDescription:
      "Property maintenance and renovation resources from EquityTeam — repairs, make-ready, and projects — for Cincinnati and Dayton owners and homeowners.",
  },
];

export function getResourceHub(slug: string): ResourceHub | undefined {
  return RESOURCE_HUBS.find((h) => h.slug === slug);
}
