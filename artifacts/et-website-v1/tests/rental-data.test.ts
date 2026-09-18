import assert from 'node:assert/strict';
import test from 'node:test';
import { applicationUrlFor, APTLY_WIDGET_URL, dollars, getAllListings, isAvailableNow, type Listing } from '../src/features/rentals/lib/aptly';
import { loadRentalData, serializeRentalData } from '../src/features/rentals/lib/data';
import { listingPath, listingIdFromSlug, propertyHeading } from '../src/features/rentals/lib/seo';

test('feed failure recovers; unpublished homes are excluded and optional detail failures preserve summaries', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response('', { status: 503 });
    const failedData = await loadRentalData('/for-rent');
    assert.equal(failedData?.error, true);
    assert.equal(failedData?.path, '/for-rent');
    assert.equal(await loadRentalData('/about-us'), undefined);
    globalThis.fetch = async input => {
      const url = String(input);
      if (url.includes('/locations/')) return Response.json([
        { _id: 'visible', squareFeet: 900, applicationConfig: { marketingImages: ['https://example.com/photo.jpg'] } },
        { _id: 'hidden', applicationConfig: {} },
        { _id: 'partial', applicationConfig: {} },
      ]);
      if (url.endsWith('/listing/visible')) return Response.json({ _id: 'visible', publishedForRent: true, totalArea: 0, marketingFiles: [] });
      if (url.endsWith('/listing/hidden')) return Response.json({ _id: 'hidden', publishedForRent: false });
      return new Response('', { status: 503 });
    };
    const data = await getAllListings();
    assert.deepEqual(data.map(item => item._id), ['visible', 'partial']);
    assert.equal(data[0].totalArea, 900);
    assert.deepEqual(data[0].marketingFiles, ['https://example.com/photo.jpg']);
    assert.equal(data[1].marketRent, undefined);
  } finally { globalThis.fetch = original; }
});

test('listing URLs are stable across marketing-title edits and support missing address fields', () => {
  const listing: Listing = { _id: 'abc123', marketingName: 'New title', address: { address: '12 Main St', city: 'Cincinnati', stateCode: 'OH', postalCode: '45202' } };
  const path = listingPath(listing);
  assert.equal(path, '/for-rent/oh/cincinnati/45202/12-main-st--abc123');
  assert.equal(listingPath({ ...listing, marketingName: 'Changed title' }), path);
  assert.equal(listingIdFromSlug(path.split('/').pop()!), 'abc123');
  assert.equal(propertyHeading(listing), 'New title');
  assert.equal(propertyHeading({ _id: 'empty' }), 'Available Home for Rent');
  assert.ok(listingPath({ _id: 'empty' }).startsWith('/for-rent/'));
});

test('pricing, availability, links, and hydration data handle optional or unsafe values', () => {
  assert.equal(dollars(125000), '$1,250');
  assert.equal(dollars(undefined), 'Call for pricing');
  assert.equal(isAvailableNow('01/01/2099'), false);
  assert.equal(isAvailableNow('2099-01-01'), false);
  assert.equal(applicationUrlFor({ _id: 'abc', applicationUrl: 'javascript:alert(1)' }), APTLY_WIDGET_URL);
  assert.equal(applicationUrlFor({ _id: 'abc', applicationUrl: 'https://portal.getaptly.com/apply' }), 'https://portal.getaptly.com/apply');
  const html = serializeRentalData({ listings: [{ _id: 'x', marketingName: '</script><script>alert(1)</script>' }], tours: {} });
  assert.equal(html.match(/<script/g)?.length, 1);
  assert.ok(html.includes('\\u003c'));
});
