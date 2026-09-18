import assert from 'node:assert/strict';
import test from 'node:test';
import { render } from '../dist/server/entry-server.js';

test('rental search renders useful empty, loading, and feed-error states', () => {
  assert.match(render('/for-rent', '', { listings: [], tours: {} }).html, /No homes are currently listed/);
  const loading = render('/for-rent', '').html;
  assert.match(loading, /Loading available homes/);
  assert.match(loading, /equityteam-loader\.png/);
  const error = render('/for-rent', '', { listings: [], tours: {}, error: true }).html;
  assert.match(error, /couldn’t load/);
  assert.match(error, /https:\/\/portal.getaptly.com\/search\/Eun6dxYxe4CRiXS9c\//);
});

test('detail SSR handles minimal data and does not publish stale precomputed tour dates', () => {
  const loading = render('/for-rent/oh/cincinnati/rental/home--fixture', '').html;
  assert.match(loading, /Loading home details/);
  assert.match(loading, /equityteam-loader\.png/);
  const output = render('/for-rent/oh/cincinnati/rental/home--fixture', '', { listings: [{ _id: 'fixture' }], tours: {} });
  assert.match(output.html, /Available Home for Rent/);
  assert.match(output.html, /Call for pricing/);
  assert.match(output.html, /Loading current tour windows/);
  assert.match(output.headHtml, /application\/ld\+json/);
  assert.match(output.dataHtml, /id="rental-data"/);
  assert.match(render('/for-rent/oh/cincinnati/rental/home--removed', '', { listings: [], tours: {} }).html, /no longer listed/);
});
