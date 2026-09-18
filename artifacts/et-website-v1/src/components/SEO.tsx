import { useEffect } from "react";
import { headStore } from "@/lib/head-store";
import { SITE_URL } from "@/lib/siteUrl";

const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

function upsertMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertOGMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function removeMeta(selector: string) {
  document.querySelectorAll(selector).forEach((el) => el.remove());
}

function upsertCanonical(href: string) {
  let el = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, payload: object[]) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(payload);
}

export function SEO({
  title = "Greater Cincinnati Property Management | EquityTeam",
  description = "Cincinnati's highest-rated property management company. Single-family from 5.9%, multi-family from 8.9%. 21-day lease guarantee, owner draws every Friday. Serving Cincinnati & Dayton, OH since 2008.",
  canonical = "/",
  schema,
  schemas,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = "EquityTeam Property Management",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  speakableSelectors,
  breadcrumbs,
}: {
  title?: string;
  description?: string;
  canonical?: string;
  schema?: object;
  schemas?: object[];
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  speakableSelectors?: string[];
  breadcrumbs?: Array<{ name: string; href: string }>;
}) {
  const fullUrl = canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  const allSchemas: object[] = [];

  allSchemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${fullUrl}#webpage`,
    url: fullUrl,
    name: title,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImageUrl,
      caption: ogImageAlt,
    },
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(speakableSelectors?.length ? {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: speakableSelectors,
      },
    } : {}),
  });

  if (breadcrumbs && breadcrumbs.length > 0) {
    allSchemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        ...breadcrumbs.map((bc, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: bc.name,
          item: SITE_URL + bc.href,
        })),
      ],
    });
  }

  if (schema) allSchemas.push(schema);
  if (schemas) allSchemas.push(...schemas);

  headStore.current = {
    title,
    description,
    canonical: fullUrl,
    robots,
    ogType,
    ogImage: ogImageUrl,
    ogImageAlt,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    schemas: allSchemas,
  };

  useEffect(() => {
    document.title = title;

    upsertMeta("description", description);
    upsertMeta("robots", robots);

    upsertCanonical(fullUrl);

    upsertOGMeta("og:title", title);
    upsertOGMeta("og:description", description);
    upsertOGMeta("og:url", fullUrl);
    upsertOGMeta("og:type", ogType);
    upsertOGMeta("og:image", ogImageUrl);
    upsertOGMeta("og:image:alt", ogImageAlt);
    upsertOGMeta("og:site_name", "EquityTeam Property Management");
    upsertOGMeta("og:locale", "en_US");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:site", "@EquityTeamPM");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", ogImageUrl);
    upsertMeta("twitter:image:alt", ogImageAlt);
    if (author) upsertMeta("author", author);
    else removeMeta('meta[name="author"]');
    if (publishedTime) upsertOGMeta("article:published_time", publishedTime);
    else removeMeta('meta[property="article:published_time"]');
    if (modifiedTime) upsertOGMeta("article:modified_time", modifiedTime);
    else removeMeta('meta[property="article:modified_time"]');
    if (author) upsertOGMeta("article:author", author);
    else removeMeta('meta[property="article:author"]');
    if (section) upsertOGMeta("article:section", section);
    else removeMeta('meta[property="article:section"]');
    removeMeta('meta[property="article:tag"]');
    tags?.forEach((tag) => {
      const el = document.createElement("meta");
      el.setAttribute("property", "article:tag");
      el.content = tag;
      document.head.appendChild(el);
    });

    if (allSchemas.length > 0) {
      upsertJsonLd("page-schema", allSchemas);
    } else {
      const existing = document.getElementById("page-schema");
      if (existing) existing.textContent = "[]";
    }
  }, [title, description, fullUrl, robots, ogType, ogImageUrl, ogImageAlt, author, publishedTime, modifiedTime, section, tags]);

  return null;
}
