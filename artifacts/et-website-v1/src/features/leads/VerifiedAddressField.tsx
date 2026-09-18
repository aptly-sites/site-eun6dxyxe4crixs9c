/// <reference types="google.maps" />
import { useEffect, useId, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
let optionsSet = false;

export type VerifiedAddress = { address: string; placeId: string };

export function VerifiedAddressField({ value, onChange, required = false, disabled = false }: { value: VerifiedAddress | null; onChange: (value: VerifiedAddress | null) => void; required?: boolean; disabled?: boolean }) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState(API_KEY ? "Select an address from Google suggestions to verify it." : "Google address verification is unavailable until the Maps API key is configured.");

  useEffect(() => {
    if (!API_KEY || !inputRef.current) return;
    let listener: google.maps.MapsEventListener | undefined;
    let active = true;
    if (!window.google?.maps?.importLibrary && !optionsSet) {
      optionsSet = true;
      setOptions({ key: API_KEY, v: "weekly" });
    }
    (async () => {
      try {
        const { Autocomplete } = await importLibrary("places") as google.maps.PlacesLibrary;
        if (!active || !inputRef.current) return;
        const autocomplete = new Autocomplete(inputRef.current, {
          fields: ["formatted_address", "place_id", "types"],
          types: ["address"],
          componentRestrictions: { country: "us" },
        });
        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const isStreetAddress = place.types?.some(type => ["street_address", "premise", "subpremise"].includes(type));
          if (!place.place_id || !place.formatted_address || !isStreetAddress) {
            onChange(null);
            setMessage("Choose a complete street address from the Google suggestions.");
            return;
          }
          inputRef.current!.value = place.formatted_address;
          onChange({ address: place.formatted_address, placeId: place.place_id });
          setMessage("Address verified by Google.");
        });
      } catch {
        if (active) setMessage("Google address verification could not load. Please try again later.");
      }
    })();
    return () => { active = false; listener?.remove(); };
  }, [onChange]);

  return <div className="sm:col-span-2">
    <label htmlFor={id} className="text-base font-bold tracking-[0.08em] uppercase text-white/60">Property address {required && <span className="text-[#B4975A]">*</span>}</label>
    <input
      ref={inputRef}
      id={id}
      type="text"
      required={required}
      autoComplete="street-address"
      disabled={!API_KEY || disabled}
      defaultValue={value?.address || ""}
      onInput={() => { if (value) onChange(null); setMessage("Select an address from Google suggestions to verify it."); }}
      className="mt-1 w-full rounded border border-white/15 bg-white/5 px-3 py-3 text-base font-semibold text-white outline-none focus:border-[#B4975A] disabled:cursor-not-allowed disabled:opacity-60"
      aria-describedby={`${id}-status`}
      aria-invalid={Boolean(inputRef.current?.value && !value)}
      placeholder="Start typing a street address"
    />
    <p id={`${id}-status`} role="status" className={`mt-2 text-base ${value ? "text-green-400" : "text-white/60"}`}>{message}</p>
  </div>;
}
