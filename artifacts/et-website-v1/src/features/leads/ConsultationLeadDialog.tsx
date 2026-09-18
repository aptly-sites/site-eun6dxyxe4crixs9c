import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { VerifiedAddress } from "./VerifiedAddressField";

type Props = {
  summary: string;
  source: string;
  address?: VerifiedAddress | null;
  requireAddress?: boolean;
};

export function ConsultationLeadDialog({ summary, source, address = null, requireAddress = false }: Props) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  function open() {
    if (requireAddress && !address) return;
    setStatus("idle");
    setError("");
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function close() {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/owner-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.get("firstName"),
          lastName: form.get("lastName"),
          phone: form.get("phone"),
          email: form.get("email"),
          message: form.get("message"),
          website: form.get("website"),
          address: address?.address,
          placeId: address?.placeId,
          summary,
          formSource: source,
          pageTitle: document.title,
          pageUrl: location.origin + location.pathname,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "We could not submit your request.");
      setStatus("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not submit your request.");
      setStatus("error");
    }
  }

  const fields = [
    { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", maxLength: 80 },
    { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", maxLength: 80 },
    { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", maxLength: 40 },
    { name: "email", label: "Email address", type: "email", autoComplete: "email", maxLength: 254 },
  ];

  return <>
    <button type="button" onClick={open} disabled={requireAddress && !address} className="btn-solid-secondary min-h-12 w-full text-base font-bold disabled:cursor-not-allowed disabled:opacity-50">
      Schedule a Conversation
    </button>
    {requireAddress && !address && <p className="mt-2 text-center text-base text-white/60">Verify the property address above to schedule a consultation.</p>}
    <dialog ref={dialogRef} className="m-auto w-[min(92vw,640px)] rounded-lg border-0 bg-white p-0 text-black shadow-2xl backdrop:bg-black/80" onCancel={close} onClose={() => { document.body.style.overflow = ""; }}>
      <div className="p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Schedule a Conversation</h2>
            <p className="mt-2 text-base text-black/70">Share your details and EquityTeam will contact you to find a time to talk.</p>
          </div>
          <button type="button" onClick={close} aria-label="Close scheduling form" className="min-h-11 min-w-11 text-2xl">×</button>
        </div>
        {status === "success" ? (
          <div role="status">
            <p className="text-lg font-semibold">Thanks. EquityTeam will contact you to schedule a conversation.</p>
            <button type="button" onClick={close} className="btn-solid-secondary mt-6 text-base">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map(field => (
                <div key={field.name}>
                  <label htmlFor={`${id}-${field.name}`} className="mb-2 block text-base font-semibold">{field.label}</label>
                  <input id={`${id}-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} maxLength={field.maxLength} required disabled={status === "sending"} className="w-full rounded border border-black/30 bg-white p-3 text-base" />
                </div>
              ))}
            </div>
            <div>
              <label htmlFor={`${id}-message`} className="mb-2 block text-base font-semibold">Message</label>
              <textarea id={`${id}-message`} name="message" rows={5} maxLength={2000} required disabled={status === "sending"} className="w-full resize-y rounded border border-black/30 bg-white p-3 text-base" placeholder="Tell us how we can help." />
            </div>
            <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <p className="text-base text-black/70">By submitting, you’re asking EquityTeam to contact you about property management and scheduling a conversation. <a href="/privacy-policy" className="underline">Privacy policy</a>.</p>
            <button type="submit" disabled={status === "sending"} className="btn-solid-secondary min-h-12 w-full text-base font-bold disabled:opacity-60">{status === "sending" ? "Submitting…" : "Request a Time to Talk"}</button>
            {status === "error" && <p role="alert" className="text-red-800">{error} Please verify the information and try again.</p>}
          </form>
        )}
      </div>
    </dialog>
  </>;
}
