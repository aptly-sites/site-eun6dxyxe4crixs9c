import RentAffordability from "@/pages/tools/RentAffordability";
import { RentalCityPage, RentalDetailPage } from "@/features/rentals/RentalPages";
import { useEffect, type ComponentProps } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { PublishGuard } from "@/components/PublishGuard";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

// Pages
import Home from "@/pages/Home";
import ResidentialPropertyManagement from "@/pages/ResidentialPropertyManagement";
import CompetitorVs from "@/pages/CompetitorVs";
import ShortTermRentals from "@/pages/ShortTermRentals";
import CoLivingManagement from "@/pages/CoLivingManagement";
import HoaManagement from "@/pages/HoaManagement";
import CommercialManagement from "@/pages/CommercialManagement";
import PropertyServices from "@/pages/PropertyServices";
import RealEstateBrokerage from "@/pages/RealEstateBrokerage";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import FreeRentalAnalysis from "@/pages/FreeRentalAnalysis";
import ForRent from "@/pages/ForRent";
import ForSale from "@/pages/ForSale";
import Locations from "@/pages/Locations";
import Jobs from "@/pages/Jobs";
import Accessibility from "@/pages/Accessibility";
import SitemapPage from "@/pages/SitemapPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import LocationPage from "@/pages/LocationPage";
import CommunityPage from "@/pages/CommunityPage";
import MetroHubPage from "@/pages/MetroHubPage";
import { COMMUNITY_PAGES } from "@/data/communityData";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PortalLogins from "@/pages/PortalLogins";
import RealtorReferralProgram from "@/pages/RealtorReferralProgram";
import Feedback from "@/pages/Feedback";
import RealEstateDisclosure from "@/pages/RealEstateDisclosure";
import EmailConfidentialityDisclosure from "@/pages/EmailConfidentialityDisclosure";
import Vendors from "@/pages/Vendors";
import Resources from "@/pages/Resources";
import ResourceHub from "@/pages/ResourceHub";

// Owner Tools / Calculators
import RentVsSell from "@/pages/tools/RentVsSell";
import PmiFeeRoi from "@/pages/tools/PmiFeeRoi";
import Exchange1031 from "@/pages/tools/Exchange1031";
import EvictionCost from "@/pages/tools/EvictionCost";
import VacancyCost from "@/pages/tools/VacancyCost";
import StrVsLtr from "@/pages/tools/StrVsLtr";

// FAQ Pages
import FaqHub from "@/pages/faq/FaqHub";
import OwnerSalesFaq from "@/pages/faq/OwnerSalesFaq";
import OwnerSupportFaq from "@/pages/faq/OwnerSupportFaq";
import LeasingFaq from "@/pages/faq/LeasingFaq";
import TenantSupportFaq from "@/pages/faq/TenantSupportFaq";
import PropertyServicesFaq from "@/pages/faq/PropertyServicesFaq";

import NotFound from "@/pages/not-found";
import ScrollToTop from "@/components/ScrollToTop";

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => { window.location.replace(to); }, [to]);
  return null;
}

export function Router() {
  return (
    <PublishGuard>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/residential-property-management" component={ResidentialPropertyManagement} />
      <Route path="/residential-property-management/equityteam-vs-:competitor" component={CompetitorVs} />
      <Route path="/vacation-rental-management" component={ShortTermRentals} />
      <Route path="/property-management-residential"><Redirect to="/residential-property-management" /></Route>
      <Route path="/short-term-vacation-rentals"><Redirect to="/vacation-rental-management" /></Route>
      <Route path="/co-living-management" component={CoLivingManagement} />
      <Route path="/hoa-management" component={HoaManagement} />
      <Route path="/commercial-property-management" component={CommercialManagement} />
      <Route path="/commercial-management"><Redirect to="/commercial-property-management" /></Route>
      <Route path="/home-concierge"><Redirect to="/property-services" /></Route>
      <Route path="/property-services" component={PropertyServices} />
      <Route path="/real-estate-brokerage" component={RealEstateBrokerage} />
      <Route path="/free-rental-analysis" component={FreeRentalAnalysis} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/for-rent" component={ForRent} />
      <Route path="/for-rent/:state/:city/:zip/:slug" component={RentalDetailPage} />
      <Route path="/for-rent/:state/:city" component={RentalCityPage} />
      <Route path="/for-sale" component={ForSale} />
      <Route path="/areas-we-serve" component={Locations} />
      <Route path="/locations"><Redirect to="/areas-we-serve" /></Route>
      <Route path="/jobs"><Redirect to="/careers" /></Route>
      <Route path="/careers" component={Jobs} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/sitemap" component={SitemapPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-and-conditions" component={TermsOfService} />
      <Route path="/portal-logins" component={PortalLogins} />
      <Route path="/realtor-referral-program" component={RealtorReferralProgram} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/real-estate-investing-and-tax-disclosure" component={RealEstateDisclosure} />
      <Route path="/email-confidentiality-disclosure" component={EmailConfidentialityDisclosure} />
      <Route path="/search-rentals"><Redirect to="/for-rent" /></Route>
      <Route path="/pricing"><Redirect to="/residential-property-management#pricing" /></Route>
      <Route path="/vendor"><Redirect to="/vendors" /></Route>
      <Route path="/vendors" component={Vendors} />

      {/* Resource Center — hub + per-audience pages (rendered from resourceHubs.ts) */}
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:slug">{(params) => <ResourceHub slug={params.slug} />}</Route>

      {/* Owner Tools / Calculators */}
      <Route path="/tools/rent-affordability" component={RentAffordability} />
      <Route path="/tools/rent-vs-sell" component={RentVsSell} />
      <Route path="/tools/pm-fee-roi" component={PmiFeeRoi} />
      <Route path="/tools/1031-exchange" component={Exchange1031} />
      <Route path="/tools/eviction-cost" component={EvictionCost} />
      <Route path="/tools/vacancy-cost" component={VacancyCost} />
      <Route path="/tools/str-vs-ltr" component={StrVsLtr} />

      {/* Blog */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />

      {/* FAQ — must come before location catch-all */}
      <Route path="/faq" component={FaqHub} />
      <Route path="/faq/owner-sales" component={OwnerSalesFaq} />
      <Route path="/faq/owner-support" component={OwnerSupportFaq} />
      <Route path="/faq/leasing" component={LeasingFaq} />
      <Route path="/faq/tenant-support" component={TenantSupportFaq} />
      <Route path="/faq/property-services" component={PropertyServicesFaq} />

      {/* Norris Lake redirects externally to Deerfield Vacation Rentals */}
      <Route path="/norris-lake-vacation-rental-management">
        <ExternalRedirect to="https://deerfieldvacationrentals.com" />
      </Route>

      {/* Metro hub pages — must precede community-page routes */}
      <Route path="/locations/cincinnati">
        <MetroHubPage region="cincinnati" />
      </Route>
      <Route path="/locations/dayton">
        <MetroHubPage region="dayton" />
      </Route>

      {/* Community pages (new template at /locations/{region}/{slug}) —
          must precede the catch-all location templates below.
          Auto-registered from COMMUNITY_PAGES — each entry produces:
            • canonical route at cfg.urlPath
            • legacy redirect from /{slug}-property-management */}
      {COMMUNITY_PAGES.flatMap((cfg) => [
        <Route key={cfg.urlPath} path={cfg.urlPath}>
          <CommunityPage config={cfg} />
        </Route>,
        <Route key={`${cfg.slug}-legacy`} path={`/${cfg.slug}-property-management`}>
          <Redirect to={cfg.urlPath} />
        </Route>,
      ])}

      {/* Location templates — must come last (catch-all after explicit routes).
          One service line per URL pattern keeps the keyword in the slug:
            • OH residential property management: /:location-property-management
            • TN short-term/vacation rentals:     /:location-vacation-rental-management */}
      <Route path={/^\/[^/]+-vacation-rental-management\/?$/} component={LocationPage} />
      <Route path={/^\/[^/]+-property-management\/?$/} component={LocationPage} />

      {/* 404 */}
      <Route path="/*" component={NotFound} />
    </Switch>
    </PublishGuard>
  );
}

type AppProps = {
  base?: string;
  hook?: ComponentProps<typeof WouterRouter>["hook"];
};

function App({
  base = import.meta.env.BASE_URL.replace(/\/$/, ""),
  hook,
}: AppProps = {}) {
  return (
    <WouterRouter base={base} hook={hook}>
      <ScrollToTop />
      <GoogleAnalytics />
      <Router />
    </WouterRouter>
  );
}

export default App;
