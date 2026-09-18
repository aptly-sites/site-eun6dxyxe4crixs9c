import { useId, useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { VerifiedAddressField, type VerifiedAddress } from "./VerifiedAddressField";

const inputClass =
  "contact-input-field min-h-12 bg-white text-black placeholder:text-black/40 disabled:opacity-60";

export function FreeRentalAnalysisForm() {
  const id = useId();
  const pending = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [propertyAddress, setPropertyAddress] = useState<VerifiedAddress | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    if (!propertyAddress) {
      setError("Choose a complete property address from the Google suggestions.");
      setStatus("error");
      return;
    }
    pending.current = true;
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/owner-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          phone: data.get("phone"),
          email: data.get("email"),
          address: propertyAddress.address,
          placeId: propertyAddress.placeId,
          website: data.get("website"),
          summary: `Property address: ${propertyAddress.address}`,
          formSource: "Free Rental Analysis",
          pageTitle: document.title,
          pageUrl: location.origin + location.pathname + location.search,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to confirm your request.");
      form.reset();
      setPropertyAddress(null);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to confirm your request.");
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-secondary bg-white p-7 text-black shadow-lg md:p-9">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Request received</p>
        <h2 className="mb-3 font-cowling text-3xl font-bold uppercase">We’re reviewing your market</h2>
        <p className="leading-relaxed text-black/70">
          Thank you. An EquityTeam specialist will review the property and follow up with your rental analysis.
        </p>
      </div>
    );
  }

  const disabled = status === "sending";
  return (
    <div className="bg-[#121212] p-6 text-white shadow-xl md:p-9" id="request-analysis">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">No cost. No obligation.</p>
      <h2 className="mb-3 font-cowling text-3xl font-bold uppercase leading-tight md:text-4xl">Request your free rental analysis</h2>
      <p className="mb-7 text-base leading-relaxed text-white/75">
        Share your contact information and select the property’s complete street address from Google so we can prepare an accurate report.
      </p>

      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${id}-first`} name="firstName" label="First name" autoComplete="given-name" disabled={disabled} />
          <Field id={`${id}-last`} name="lastName" label="Last name" autoComplete="family-name" disabled={disabled} />
          <Field id={`${id}-phone`} name="phone" label="Phone number" type="tel" autoComplete="tel" disabled={disabled} />
          <Field id={`${id}-email`} name="email" label="Email address" type="email" autoComplete="email" disabled={disabled} />
        </div>

        <VerifiedAddressField value={propertyAddress} onChange={setPropertyAddress} required disabled={disabled} />

        <div hidden aria-hidden="true">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <p className="text-xs leading-relaxed text-white/60">
          By submitting, you’re asking EquityTeam to contact you about your property. Review our{" "}
          <Link href="/privacy-policy" className="text-secondary underline underline-offset-2">Privacy Policy</Link>.
        </p>
        <button type="submit" disabled={disabled} className="btn-solid-secondary min-h-12 w-full text-base font-bold disabled:opacity-60">
          {disabled ? "Sending request…" : "Request my rental analysis"}
        </button>
        {status === "error" && (
          <p role="alert" className="border-l-4 border-red-500 bg-red-950/30 p-4 text-sm text-white">
            {error} <Link href="/contact-us" className="underline">Contact EquityTeam</Link> if the problem continues.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({ id, name, label, type = "text", autoComplete, disabled }: { id: string; name: string; label: string; type?: string; autoComplete: string; disabled: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/75">
        {label} <span className="text-secondary">*</span>
      </label>
      <input id={id} name={name} type={type} required maxLength={type === "email" ? 254 : type === "tel" ? 40 : 80} autoComplete={autoComplete} disabled={disabled} className={inputClass} />
    </div>
  );
}
