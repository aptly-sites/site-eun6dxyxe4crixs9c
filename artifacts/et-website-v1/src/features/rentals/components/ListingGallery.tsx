import { useEffect, useRef, useState } from "react";

const LOADER_LOGO = `${import.meta.env.BASE_URL}images/logo/equityteam-loader.png`;

function optimizedImageUrl(url: string, width: number) {
  if (!url.startsWith("https://workturbo.net/cdn-cgi/image//")) return url;
  return url.replace(
    "/cdn-cgi/image//",
    `/cdn-cgi/image/format=auto,quality=82,width=${width}/`,
  );
}

export function ListingGallery({ images, address }: { images: string[]; address: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [heroReady, setHeroReady] = useState(images.length === 0);
  const dialog = useRef<HTMLDialogElement>(null);
  const heroImage = useRef<HTMLImageElement>(null);
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const node = dialog.current;
    node?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = previous; };
  }, [isOpen]);
  useEffect(() => {
    const image = heroImage.current;
    if (!images[0] || !image) {
      setHeroReady(true);
      return;
    }

    const markReady = () => setHeroReady(true);
    setHeroReady(false);

    // The image may finish while the server-rendered page is hydrating. In
    // that case the browser does not replay the load event, so check it now.
    if (image.complete) {
      markReady();
      return;
    }

    image.addEventListener("load", markReady, { once: true });
    image.addEventListener("error", markReady, { once: true });
    return () => {
      image.removeEventListener("load", markReady);
      image.removeEventListener("error", markReady);
    };
  }, [images[0]]);
  const advance = (offset: number) => setActive(index => index === null ? null : (index + offset + images.length) % images.length);
  return <>
    <div className={`gallery ${images.length < 2 ? "gallery-single" : ""}`}>
      {images.length ? images.slice(0, 5).map((image, index) => {
        const widths = index === 0 ? [640, 960, 1440] : [320, 480, 720];
        return <button key={image} type="button" className={`gallery-photo ${index === 0 ? "gallery-main" : ""}`} onClick={() => setActive(index)} aria-label={`View photo ${index + 1} of ${images.length}`}>
          <img
            ref={index === 0 ? heroImage : undefined}
            src={optimizedImageUrl(image, index === 0 ? 960 : 480)}
            srcSet={widths.map(width => `${optimizedImageUrl(image, width)} ${width}w`).join(", ")}
            sizes={index === 0 ? "(max-width: 620px) 67vw, 66vw" : "(max-width: 620px) 33vw, 25vw"}
            alt={`${address}, photo ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "auto"}
            onLoad={index === 0 ? () => setHeroReady(true) : undefined}
            onError={event => {
              const node = event.currentTarget;
              if (node.src !== image) {
                node.srcset = "";
                node.src = image;
                return;
              }
              if (index === 0) setHeroReady(true);
            }}
          />
        </button>;
      }) : <div className="gallery-placeholder">EquityTeam</div>}
      {!heroReady && <div className="gallery-loading" role="status" aria-label="Loading property photos">
        <div className="rental-loader-mark" aria-hidden="true"><span className="rental-loader-ring" /><img src={LOADER_LOGO} width="96" height="92" alt="" /></div>
        <p>Loading property photos…</p>
      </div>}
      {images.length > 0 && <button type="button" className="photo-count" onClick={() => setActive(0)}>View all {images.length} photos</button>}
    </div>
    <dialog ref={dialog} className="photo-viewer" aria-label={`Photos of ${address}`} onCancel={() => setActive(null)} onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) setActive(null); }} onKeyDown={event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); advance(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); advance(1); }
    }}>
      {active !== null && <div className="photo-viewer-content">
        <div className="photo-viewer-toolbar"><span aria-live="polite">Photo {active + 1} of {images.length}</span><button type="button" autoFocus onClick={() => setActive(null)} aria-label="Close photo viewer">Close ×</button></div>
        <img
          className="photo-viewer-image"
          src={optimizedImageUrl(images[active], 1600)}
          alt={`${address}, photo ${active + 1}`}
          decoding="async"
          onError={event => {
            if (event.currentTarget.src !== images[active]) event.currentTarget.src = images[active];
          }}
        />
        {images.length > 1 && <div className="photo-viewer-controls"><button type="button" onClick={() => advance(-1)} aria-label="Previous photo">← Previous</button><button type="button" onClick={() => advance(1)} aria-label="Next photo">Next →</button></div>}
      </div>}
    </dialog>
  </>;
}
