import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { VerifiedAddress } from "./VerifiedAddressField";

type Props = {
  address: VerifiedAddress | null;
  summary: string;
  source: string;
  buttonLabel: string;
  title: string;
};

export function CalculatorReportDialog({ address, summary, source, buttonLabel, title }: Props) {
  const id=useId();
  const dialogRef=useRef<HTMLDialogElement>(null);
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [error,setError]=useState("");
  useEffect(() => () => { document.body.style.overflow=""; }, []);
  function open() { setStatus("idle"); setError(""); dialogRef.current?.showModal(); document.body.style.overflow="hidden"; }
  function close() { dialogRef.current?.close(); document.body.style.overflow=""; }
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!address || status === "sending") return;
    const form=new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const response=await fetch("/api/owner-lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        firstName:form.get("firstName"),lastName:form.get("lastName"),email:form.get("email"),website:form.get("website"),
        address:address.address,placeId:address.placeId,summary,formSource:source,
        pageTitle:document.title,pageUrl:location.origin+location.pathname,
      })});
      const result=await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "We could not email the report.");
      setStatus("success");
    } catch(error) { setError(error instanceof Error ? error.message : "We could not email the report."); setStatus("error"); }
  }
  return <>
    <button type="button" onClick={open} disabled={!address} className="btn-solid-secondary mt-8 w-full min-h-12 text-base font-bold disabled:cursor-not-allowed disabled:opacity-50">{buttonLabel}</button>
    {!address && <p className="mt-2 text-center text-base text-white/60">Verify the property address above to email this report.</p>}
    <dialog ref={dialogRef} className="m-auto w-[min(92vw,600px)] rounded-lg border-0 bg-white p-0 text-black shadow-2xl backdrop:bg-black/80" onCancel={close} onClose={() => { document.body.style.overflow=""; }}>
      <div className="p-6 md:p-8">
        <div className="mb-5 flex items-start justify-between gap-4"><div><h2 className="text-2xl font-bold">{title}</h2><p className="mt-2 text-base text-black/70">We’ll email your current report and create an EquityTeam follow-up for {address?.address}.</p></div><button type="button" onClick={close} aria-label="Close report form" className="min-h-11 min-w-11 text-2xl">×</button></div>
        {status === "success" ? <div role="status"><p className="text-lg font-semibold">Your report has been emailed.</p><button type="button" onClick={close} className="btn-solid-secondary mt-6 text-base">Close</button></div> : <form onSubmit={submit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">{[{name:"firstName",label:"First name",auto:"given-name",max:80},{name:"lastName",label:"Last name",auto:"family-name",max:80}].map(field=><div key={field.name}><label htmlFor={`${id}-${field.name}`} className="mb-2 block text-base font-semibold">{field.label}</label><input id={`${id}-${field.name}`} name={field.name} autoComplete={field.auto} maxLength={field.max} required disabled={status === "sending"} className="w-full rounded border border-black/30 bg-white p-3 text-base" /></div>)}</div>
          <div><label htmlFor={`${id}-email`} className="mb-2 block text-base font-semibold">Email address</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} required disabled={status === "sending"} className="w-full rounded border border-black/30 bg-white p-3 text-base" /></div>
          <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <p className="text-base text-black/70">By submitting, you’re asking EquityTeam to email this report and contact you about property management. <a href="/privacy-policy" className="underline">Privacy policy</a>.</p>
          <button type="submit" disabled={status === "sending"} className="btn-solid-secondary min-h-12 w-full text-base font-bold disabled:opacity-60">{status === "sending" ? "Creating and emailing report…" : "Email my report"}</button>
          {status === "error" && <p role="alert" className="text-red-800">{error} Please verify the information and try again.</p>}
        </form>}
      </div>
    </dialog>
  </>;
}
