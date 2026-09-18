import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";

const GOLD = "#B4975A";

export default function NotFound() {
  return (
    <PageLayout>
      <SEO
        title="Page Not Found | EquityTeam"
        description="The requested page could not be found. Explore EquityTeam property management services, available homes, and owner resources."
        canonical="/404"
        robots="noindex, follow"
      />
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5 py-24">
        <p className="font-sans text-sm font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: GOLD }}>
          404 — Page Not Found
        </p>
        <h1 className="uppercase font-cowling font-bold text-5xl md:text-6xl text-white mb-6 leading-tight">
          This page doesn't exist.
        </h1>
        <p className="text-secondary/70 text-lg max-w-xl mb-10">
          The link you followed may be outdated or the page may have moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn-solid-secondary">
            Go to Homepage
          </Link>
          <Link href="/contact-us" className="btn-outline-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
