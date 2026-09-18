import { useId, useRef, useState, type FormEvent } from 'react';

type OwnerLeadFormProps = {
  summary?: string;
  source?: string;
  heading?: string;
  description?: string;
  buttonLabel?: string;
};

export function OwnerLeadForm({
  summary='',
  source='Free Rental Analysis',
  heading='Get a personalized rental analysis',
  description='Share your property details and EquityTeam will follow up by email.',
  buttonLabel='Request my rental analysis',
}: OwnerLeadFormProps) {
  const id=useId(); const pending=useRef(false);
  const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error,setError]=useState('');
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(pending.current) return;
    const form=new FormData(event.currentTarget);pending.current=true;setStatus('sending');
    try {
      const response=await fetch('/api/owner-lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.get('name'),phone:form.get('phone'),email:form.get('email'),address:form.get('address'),message:form.get('message'),website:form.get('website'),summary,formSource:source,pageTitle:document.title,pageUrl:location.origin+location.pathname+location.search})});
      const result=await response.json();if(!response.ok || !result.success) throw new Error(result.error || 'Unable to confirm your request.');
      setStatus('success');
    } catch(err) {setError(err instanceof Error?err.message:'Unable to confirm your request.');setStatus('error');} finally {pending.current=false;}
  }
  return <section className="bg-white text-black border border-black/15 rounded-lg p-6 md:p-8" id="request-analysis"><h2 className="text-2xl font-bold mb-3">{heading}</h2><p className="text-base mb-6">{description}{summary && ' Your current calculator assumptions and results will be included with your request.'}</p>
    {status==='success'?<p role="status" className="text-lg font-semibold">Thank you. Your request has been received by EquityTeam.</p>:<form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">{[{key:'name',label:'Full name',type:'text',max:120,auto:'name'},{key:'phone',label:'Phone number',type:'tel',max:40,auto:'tel'},{key:'email',label:'Email address',type:'email',max:254,auto:'email'},{key:'address',label:'Rental property address',type:'text',max:400,auto:'street-address'}].map(field=><div key={field.key}><label htmlFor={`${id}-${field.key}`} className="block font-semibold text-base mb-2">{field.label}</label><input id={`${id}-${field.key}`} name={field.key} type={field.type} maxLength={field.max} autoComplete={field.auto} required disabled={status==='sending'} className="w-full border border-black/30 rounded p-3 text-base bg-white" /></div>)}</div>
      <label htmlFor={`${id}-message`} className="block text-base font-semibold">Anything else we should know? (optional)</label><textarea id={`${id}-message`} name="message" maxLength={2000} rows={3} className="w-full border border-black/30 rounded p-3 text-base bg-white" />
      <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-base text-black/70">By submitting, you’re asking EquityTeam to contact you about your property. <a href="/privacy-policy" className="underline">Privacy policy</a>.</p>
      <button type="submit" disabled={status==='sending'} className="btn-solid-secondary text-base font-bold min-h-12 disabled:opacity-60">{status==='sending'?'Sending…':buttonLabel}</button>
      {status==='error'&&<p role="alert" className="text-red-800">{error} <a href="/contact-us" className="underline">Contact EquityTeam</a>.</p>}
    </form>}
  </section>;
}
