export interface BlogCategory {
  slug: string;
  displayName: string;
  audience: "owner" | "tenant" | "str-owner" | "guest" | "vendor" | "all";
  active: boolean;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { slug: "owner-tips",             displayName: "Owner Tips",         audience: "owner",     active: true  },
  { slug: "tenant-tips",            displayName: "Tenant Tips",        audience: "tenant",    active: true  },
  { slug: "vacation-rental-owners", displayName: "Vacation Rentals",   audience: "str-owner", active: true  },
  { slug: "guest-stays",            displayName: "Guest Stays",        audience: "guest",     active: true  },
  { slug: "property-services",      displayName: "Property Services",  audience: "owner",     active: true  },
  { slug: "market-insights",        displayName: "Market Insights",    audience: "all",       active: true  },
  { slug: "company",                displayName: "Company",            audience: "all",       active: true  },
  // Future — reserved; flip active: true when service line launches
  { slug: "hoa",                    displayName: "HOA Management",     audience: "owner",     active: false },
  { slug: "coliving",               displayName: "Shared Living",      audience: "owner",     active: false },
  { slug: "commercial",             displayName: "Commercial",         audience: "owner",     active: false },
];

export const ACTIVE_CATEGORIES = BLOG_CATEGORIES.filter((c) => c.active);

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}
