import { useId, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full min-h-12 border border-white/35 bg-white px-4 py-3 text-base text-primary placeholder:text-black/45 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40 disabled:opacity-60";

export function RealtorReferralForm() {
  const id = useId();
  const pending = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    pending.current = true;
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/owner-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("ownerFirstName"),
          lastName: data.get("ownerLastName"),
          email: data.get("ownerEmail"),
          phone: data.get("ownerPhone"),
          address: data.get("address"),
          message: data.get("message"),
          referrerFirstName: data.get("referrerFirstName"),
          referrerLastName: data.get("referrerLastName"),
          referrerEmail: data.get("referrerEmail"),
          referrerPhone: data.get("referrerPhone"),
          website: data.get("website"),
          formSource: "Realtor Referral Program",
          pageTitle: document.title,
          pageUrl: location.origin + location.pathname + location.search,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to confirm the referral.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to confirm the referral.");
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  const disabled = status === "sending";

  return (
    <div className="w-full bg-primary px-5 py-8 text-white md:px-10 md:py-12">
      <div className="mb-8">
        <p className="mb-3 font-sans text-sm font-bold uppercase tracking-[0.18em] text-secondary">
          Submit a referral
        </p>
        <h2 className="mb-4 font-sans text-3xl font-bold text-white md:text-4xl">
          Refer an owner to EquityTeam
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-white/80">
          Tell us about the owner and how to reach you. We’ll follow up with the owner and keep you informed.
        </p>
      </div>

      {status === "success" ? (
        <div role="status" className="border border-secondary bg-white/5 p-6">
          <h3 className="mb-2 text-2xl font-bold text-secondary">Referral received</h3>
          <p className="text-base text-white/90">
            Thank you. EquityTeam has received the referral and will follow up with the prospective owner.
          </p>
          <button
            type="button"
            className="mt-6 font-bold text-secondary underline underline-offset-4"
            onClick={() => setStatus("idle")}
          >
            Refer another owner
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-9" noValidate={false}>
          <fieldset>
            <legend className="mb-5 w-full border-b border-white/20 pb-3 text-xl font-bold text-secondary">
              Referred owner
            </legend>
            <p className="mb-5 text-sm text-white/70">All contact fields are required.</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id={`${id}-owner-first`} label="First name" name="ownerFirstName" autoComplete="section-referred given-name" disabled={disabled} />
              <FormField id={`${id}-owner-last`} label="Last name" name="ownerLastName" autoComplete="section-referred family-name" disabled={disabled} />
              <FormField id={`${id}-owner-email`} label="Email" name="ownerEmail" type="email" autoComplete="section-referred email" disabled={disabled} />
              <FormField id={`${id}-owner-phone`} label="Phone" name="ownerPhone" type="tel" autoComplete="section-referred tel" disabled={disabled} />
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-address`} className="mb-2 block text-base font-semibold">
                  Rental property address <span className="font-normal text-white/65">(optional)</span>
                </label>
                <input id={`${id}-address`} name="address" maxLength={400} autoComplete="section-referred street-address" disabled={disabled} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-message`} className="mb-2 block text-base font-semibold">
                  Comments <span className="font-normal text-white/65">(optional)</span>
                </label>
                <textarea id={`${id}-message`} name="message" maxLength={2000} rows={4} disabled={disabled} className={inputClass} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-5 w-full border-b border-white/20 pb-3 text-xl font-bold text-secondary">
              Your contact information
            </legend>
            <p className="mb-5 text-sm text-white/70">We’ll use this information to keep you updated on the referral.</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id={`${id}-referrer-first`} label="First name" name="referrerFirstName" autoComplete="section-referrer given-name" disabled={disabled} />
              <FormField id={`${id}-referrer-last`} label="Last name" name="referrerLastName" autoComplete="section-referrer family-name" disabled={disabled} />
              <FormField id={`${id}-referrer-email`} label="Email" name="referrerEmail" type="email" autoComplete="section-referrer email" disabled={disabled} />
              <FormField id={`${id}-referrer-phone`} label="Phone" name="referrerPhone" type="tel" autoComplete="section-referrer tel" disabled={disabled} />
            </div>
          </fieldset>

          <div hidden aria-hidden="true">
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <p className="text-sm leading-relaxed text-white/70">
            By submitting, you’re asking EquityTeam to contact the referred owner about property management and to contact you about this referral. See our{" "}
            <a href="/privacy-policy" className="text-secondary underline underline-offset-2">privacy policy</a>.
          </p>

          <button type="submit" disabled={disabled} className="button btn-solid-secondary min-h-12 w-full text-base font-bold disabled:opacity-60 sm:w-auto">
            {disabled ? "Submitting referral…" : "Submit referral"}
          </button>
          {status === "error" && (
            <p role="alert" className="border-l-4 border-red-400 bg-red-950/30 p-4 text-white">
              {error} <a href="/contact-us" className="underline">Contact EquityTeam</a> if the problem continues.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

function FormField({ id, label, name, type = "text", autoComplete, disabled }: { id: string; label: string; name: string; type?: string; autoComplete: string; disabled: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-semibold">{label}</label>
      <input id={id} name={name} type={type} maxLength={type === "email" ? 254 : type === "tel" ? 40 : 80} autoComplete={autoComplete} required disabled={disabled} className={inputClass} />
    </div>
  );
}
