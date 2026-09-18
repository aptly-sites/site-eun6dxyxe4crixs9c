import { lazy, Suspense } from "react";
import { ClientOnly } from "./ClientOnly";

export interface MapArea {
  name: string;
  href: string;
  coords: { lat: number; lng: number };
  comingSoon?: boolean;
}

interface NearbyAreasMapProps {
  focalName: string;
  focalCoords: { lat: number; lng: number };
  areas: MapArea[];
}

const InnerMap = lazy(() => import("./NearbyAreasMapInner"));

const Placeholder = () => (
  <div className="w-full h-[460px] md:h-[540px] border border-primary/15 bg-primary/5 flex items-center justify-center">
    <span className="font-sans text-primary/50 text-sm uppercase tracking-[0.2em]">
      Loading map…
    </span>
  </div>
);

export function NearbyAreasMap(props: NearbyAreasMapProps) {
  return (
    <ClientOnly>
      <Suspense fallback={<Placeholder />}>
        <InnerMap {...props} />
      </Suspense>
    </ClientOnly>
  );
}
