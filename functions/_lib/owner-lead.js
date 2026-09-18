// Ported from the original Vercel serverless function (artifacts/et-website-v1/server/owner-lead.mjs)
// as part of converting this site to a static Cloudflare Pages deploy. Business logic is
// unchanged — only `process.env` -> an explicit `env` (Cloudflare Pages Functions has no
// process.env) and the Vercel (req, res) handler -> Cloudflare's onRequestPost({request, env}).
// Shared by both functions/api/owner-lead.js and functions/api/forms/contact.js, same as the
// original two Vercel routes both imported from this module.

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const escape = value =>
  value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const FORM_DETAILS = {
  'Free Rental Analysis': {
    description:
      'The owner completed the Free Rental Analysis request form to ask EquityTeam for a professional rent estimate for their property.',
    completeContact: true,
    verifiedAddress: true
  },
  'For Sale – Free Rental Analysis': {
    description:
      'The visitor requested a free rental pricing analysis while browsing EquityTeam properties for sale.'
  },
  'Portal Login – Free Rental Analysis': {
    description:
      'The visitor requested a free rental pricing analysis from the EquityTeam Portal Logins page.'
  },
  'Rental Match Request': {
    description:
      'The prospective resident asked EquityTeam to contact them when a rental matching their preferences becomes available.',
    addressFallback: 'Not provided — Rental Match Request',
    boardSource: 'Website'
  },
  'Contact Us Inquiry': {
    description: 'The visitor submitted the general Contact Us form and asked the appropriate EquityTeam department to follow up.',
    addressFallback: 'Not provided — Contact Us',
    boardSource: 'Website'
  },
  'Realtor Referral Program': {
    description: 'A real estate agent or other referral partner referred a prospective owner to EquityTeam for property management services.',
    addressFallback: 'Not provided — Realtor Referral Program',
    boardSource: 'Agent Referral',
    referral: true
  },
  'Rent vs. Sell Calculator – Personalized Rental Analysis': {
    description: 'The owner used the Rent vs. Sell Calculator and requested an emailed copy of their personalized rent-versus-sell report.',
    reportTitle: 'Your Rent vs. Sell Report',
    subjectPrefix: 'Your EquityTeam Rent vs. Sell report',
    returnLabel: 'Return to the Rent vs. Sell Calculator',
    disclaimer: 'This estimate is for informational purposes and is not financial or tax advice.',
    verifiedAddress: true
  },
  'PM Fee ROI Calculator – Email Report': {
    description:
      'The owner used the Property Management Fee ROI Calculator and requested an emailed copy of their personalized cost-benefit report.',
    reportTitle: 'Your Property Management ROI Report',
    subjectPrefix: 'Your EquityTeam PM Fee ROI report',
    returnLabel: 'Return to the PM Fee ROI Calculator',
    disclaimer: 'This estimate is for informational purposes and is not financial or legal advice.',
    verifiedAddress: true
  },
  'Eviction Cost Calculator – Consultation Request': {
    description: 'The owner used the Eviction Cost Calculator and asked EquityTeam to contact them to schedule a conversation about property management.',
    addressFallback: 'Not provided — Eviction Cost Calculator',
    boardSource: 'Eviction Cost Calculator',
    consultation: true
  },
  '1031 Exchange Calculator – Consultation Request': {
    description:
      'The owner used the 1031 Exchange Calculator and asked EquityTeam to contact them to schedule a consultation about their investment property.',
    boardSource: '1031 Exchange',
    verifiedAddress: true,
    consultation: true
  },
  'Vacancy Cost Calculator – Consultation Request': {
    description: 'The owner used the Vacancy Cost Calculator and asked EquityTeam to contact them to discuss reducing vacancy at their property.',
    boardSource: 'Vacancy Cost',
    verifiedAddress: true,
    consultation: true
  },
  'STR vs. LTR Calculator – Email Report': {
    description: 'The owner used the STR vs. LTR Calculator and requested an emailed comparison report for their rental property.',
    reportTitle: 'Your STR vs. LTR Rental Strategy Report',
    subjectPrefix: 'Your EquityTeam STR vs. LTR report',
    returnLabel: 'Return to the STR vs. LTR Calculator',
    disclaimer:
      'This estimate is for informational purposes. Short-term rental rules vary by municipality, and this report is not tax or legal advice.',
    boardSource: 'STR vs. LTR',
    verifiedAddress: true
  }
};

export function normalizeLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid submission');
  const lead = Object.fromEntries(
    Object.entries({
      name: 120,
      firstName: 80,
      lastName: 80,
      phone: 40,
      email: 254,
      address: 400,
      placeId: 300,
      message: 2000,
      summary: 8000,
      formSource: 160,
      pageTitle: 200,
      pageUrl: 500,
      referrerFirstName: 80,
      referrerLastName: 80,
      referrerPhone: 40,
      referrerEmail: 254
    }).map(([key, max]) => [key, clean(body[key], max)])
  );
  if (!lead.name && (lead.firstName || lead.lastName)) lead.name = [lead.firstName, lead.lastName].filter(Boolean).join(' ');
  const details = FORM_DETAILS[lead.formSource];
  if (!details) throw new Error('Invalid form source');
  if (details.addressFallback && !lead.address) lead.address = details.addressFallback;
  if (!lead.name || !lead.address || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))
    throw new Error('Enter your name, email, and property address.');
  if (!lead.pageTitle || !/^https?:\/\//i.test(lead.pageUrl)) throw new Error('Invalid page context');
  if (details.completeContact && (!lead.firstName || !lead.lastName || !/^[+()\d\s.-]{7,40}$/.test(lead.phone)))
    throw new Error('Missing owner contact details');
  if (details.verifiedAddress && (!lead.firstName || !lead.lastName || !lead.placeId || !lead.summary))
    throw new Error('Missing report details');
  if (
    details.consultation &&
    (!lead.firstName || !lead.lastName || !/^[+()\d\s.-]{7,40}$/.test(lead.phone) || !lead.message || !lead.summary)
  )
    throw new Error('Missing consultation details');
  if (
    details.referral &&
    (!lead.firstName ||
      !lead.lastName ||
      !/^[+()\d\s.-]{7,40}$/.test(lead.phone) ||
      !lead.referrerFirstName ||
      !lead.referrerLastName ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.referrerEmail) ||
      !/^[+()\d\s.-]{7,40}$/.test(lead.referrerPhone))
  )
    throw new Error('Missing referral details');
  return lead;
}

export async function verifyGoogleAddress(lead, { env, fetchImpl = fetch } = {}) {
  if (!FORM_DETAILS[lead.formSource]?.verifiedAddress) return lead;
  const key = env?.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error('Google address verification is not configured');
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('place_id', lead.placeId);
  url.searchParams.set('key', key);
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(10000) });
  const result = await response.json();
  const address = result.results?.find(
    item => item.formatted_address && item.types?.some(type => ['street_address', 'premise', 'subpremise'].includes(type))
  );
  if (!response.ok || result.status !== 'OK' || !address) throw new Error('Google could not verify a street address');
  return { ...lead, address: clean(address.formatted_address, 400) };
}

export function resolveMapping(schema, config, stageName, requestedSource = 'Website') {
  const fields = config.data?.fields || config.fields;
  if (!Array.isArray(schema) || !Array.isArray(fields)) throw new Error('Board configuration unavailable');
  const field = (key, label, type) => {
    const found = schema.find(f => f.key === key && f.type === type) || schema.find(f => f.label?.trim().toLowerCase() === label.toLowerCase() && f.type === type);
    if (!found) throw new Error('Required board field missing');
    return found.key;
  };
  const optionalField = (key, label, type) =>
    schema.find(f => f.key === key && f.type === type)?.key ||
    schema.find(f => f.label?.trim().toLowerCase() === label.toLowerCase() && f.type === type)?.key;
  const result = {
    owner: field('owner', 'Owner', 'person'),
    address: field('address', 'Rental Property Address', 'address'),
    description: field('description', 'Notes', 'rich-text'),
    stage: field('stage', 'Stage', 'stageselect'),
    source: field('leadSource', 'Source', 'sourceselect'),
    trackingPhone: optionalField('trackingPhone', 'Tracking Phone', 'phone') || optionalField('trackingPhone', 'Tracking Phone', 'tel'),
    trackingEmail: optionalField('trackingEmail', 'Tracking Email', 'email'),
    relatedContacts: optionalField('relatedContacts', 'Related Contacts', 'persons')
  };
  if (!fields.find(f => f.uuid === result.stage)?.data?.some(o => o.label === stageName)) throw new Error('Required board option missing');
  const sourceOptions = fields.find(f => f.uuid === result.source)?.data || [];
  result.sourceValue = sourceOptions.some(option => option.label === requestedSource) ? requestedSource : 'Website';
  if (!sourceOptions.some(option => option.label === result.sourceValue)) throw new Error('Required board option missing');
  return result;
}

export function cardPayload(lead, mapping, contactId, stageName, relatedContactIds = []) {
  const pageUrl = escape(lead.pageUrl);
  const details = FORM_DETAILS[lead.formSource];
  const summaryLabel = details.reportTitle || details.consultation ? 'Calculator details' : 'Submission details';
  const notes = [
    `<p><strong>Form:</strong> ${escape(lead.formSource)}</p>`,
    `<p><strong>Form description:</strong> ${escape(FORM_DETAILS[lead.formSource].description)}</p>`,
    `<p><strong>Originating page:</strong> ${escape(lead.pageTitle)}</p>`,
    `<p><strong>Page URL:</strong> <a href="${pageUrl}">${pageUrl}</a></p>`,
    `<p><strong>Name:</strong> ${escape(lead.name)}</p>`,
    `<p><strong>Email:</strong> ${escape(lead.email)}</p>`,
    lead.phone ? `<p><strong>Phone:</strong> ${escape(lead.phone)}</p>` : '',
    `<p><strong>Property:</strong> ${escape(lead.address)}</p>`,
    lead.message
      ? `<p><strong>${details.referral ? 'Referral comments' : 'Owner message'}:</strong><br>${escape(lead.message).replace(/\n/g, '<br>')}</p>`
      : '',
    details.referral
      ? `<p><strong>Referring agent:</strong> ${escape(`${lead.referrerFirstName} ${lead.referrerLastName}`)}<br><strong>Agent email:</strong> ${escape(lead.referrerEmail)}<br><strong>Agent phone:</strong> ${escape(lead.referrerPhone)}</p>`
      : '',
    lead.summary ? `<p><strong>${summaryLabel}:</strong><br>${escape(lead.summary).replace(/\n/g, '<br>')}</p>` : ''
  ]
    .filter(Boolean)
    .join('');
  return {
    name: details.consultation || details.addressFallback ? `${lead.formSource} — ${lead.name}` : `${lead.formSource} — ${lead.address}`,
    [mapping.owner]: contactId,
    [mapping.address]: { formattedAddress: lead.address, address: lead.address },
    [mapping.description]: notes,
    [mapping.stage]: stageName,
    [mapping.source]: mapping.sourceValue || 'Website',
    ...(mapping.relatedContacts && relatedContactIds.length ? { [mapping.relatedContacts]: relatedContactIds } : {}),
    ...(mapping.trackingPhone && lead.phone ? { [mapping.trackingPhone]: lead.phone } : {}),
    ...(mapping.trackingEmail ? { [mapping.trackingEmail]: lead.email } : {})
  };
}

export function reportEmailPayload(lead, cardId, env) {
  const details = FORM_DETAILS[lead.formSource];
  if (!details?.reportTitle) return null;
  if (!env?.APTLY_EMAIL_USER_ID || !env?.APTLY_EMAIL_CHANNEL_ID) throw new Error('Aptly report sender is not configured');
  const rows = lead.summary
    .split('\n')
    .map(line => `<li style="margin:0 0 8px">${escape(line)}</li>`)
    .join('');
  return {
    failOnCreateNewThread: false,
    userId: env.APTLY_EMAIL_USER_ID,
    channelId: env.APTLY_EMAIL_CHANNEL_ID,
    to: [{ value: lead.email, name: lead.name }],
    subject: `${details.subjectPrefix} for ${lead.address}`,
    body: `<div style="font-family:Arial,sans-serif;color:#152a34;line-height:1.55;max-width:680px"><h1 style="font-size:26px">${escape(details.reportTitle)}</h1><p>Hi ${escape(lead.firstName)},</p><p>Here is the calculator report you requested for <strong>${escape(lead.address)}</strong>.</p><ul>${rows}</ul><p>${escape(details.disclaimer)}</p><p><a href="${escape(lead.pageUrl)}">${escape(details.returnLabel)}</a></p><p>EquityTeam Property Management<br><a href="https://www.equityteam.com">equityteam.com</a></p></div>`,
    aptletInstanceId: cardId
  };
}

export async function createOwnerLead(lead, { env, fetchImpl = fetch } = {}) {
  const token = env?.APTLY_API_TOKEN;
  const board = env?.APTLY_OWNER_LEADS_BOARD_ID;
  const stage = env?.APTLY_OWNER_LEADS_STAGE;
  if (!token || !board || !stage) throw new Error('Lead integration is not configured');
  const api = async (path, body) => {
    const response = await fetchImpl(`https://core-api.getaptly.com/api/${path}`, {
      method: body ? 'POST' : 'GET',
      headers: { 'x-token': token, 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw new Error(`Aptly request failed (${response.status})`);
    return response.json();
  };
  const [schema, configuration] = await Promise.all([api(`schema/${board}`), api(`board/${board}/configuration`)]);
  const details = FORM_DETAILS[lead.formSource];
  const mapping = resolveMapping(schema, configuration, stage, details.boardSource || 'Website');
  if (details.referral && !mapping.relatedContacts) throw new Error('Related Contacts board field missing');
  if (details.referral && mapping.sourceValue !== 'Agent Referral') throw new Error('Agent Referral source option missing');
  const [fallbackFirst, ...fallbackLast] = lead.name.split(/\s+/);
  const contactResult = await api('contacts', {
    firstname: lead.firstName || fallbackFirst,
    lastname: lead.lastName || fallbackLast.join(' '),
    email: lead.email,
    contactType: details.referral ? 'Owner Prospect' : 'Owner',
    ...(lead.phone ? { phone: [{ number: lead.phone, type: 'mobile' }] } : {})
  });
  const contact = contactResult.data || contactResult;
  if (!contact._id) throw new Error('Aptly contact creation failed');
  let referrerContactId = '';
  if (details.referral) {
    const referrerResult = await api('contacts', {
      firstname: lead.referrerFirstName,
      lastname: lead.referrerLastName,
      email: lead.referrerEmail,
      contactType: 'Agents',
      phone: [{ number: lead.referrerPhone, type: 'mobile' }]
    });
    const referrer = referrerResult.data || referrerResult;
    if (!referrer._id) throw new Error('Aptly referring contact creation failed');
    referrerContactId = referrer._id;
  }
  const card = await api(`board/${board}`, cardPayload(lead, mapping, contact._id, stage, referrerContactId ? [referrerContactId] : []));
  const cardId = card.data?._id || card._id;
  if (!cardId) throw new Error('Aptly card creation was not confirmed');
  const emailPayload = reportEmailPayload(lead, cardId, env);
  if (emailPayload) await api('email/send', emailPayload);
  return { cardId, contactId: contact._id, referrerContactId: referrerContactId || undefined, emailSent: Boolean(emailPayload) };
}

export { clean };
