import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { transform } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const source = await readFile(resolve(root, 'src/lib/customer-account.ts'), 'utf8');
const { code } = await transform(source, { loader: 'ts', format: 'cjs' });
const module = { exports: {} };
vm.runInNewContext(code, { module, exports: module.exports, URL, process: { env: {} } });
const { getCustomerAccountUrl } = module.exports;
const storeDomain = 'les-jardins-de-sofie-test.myshopify.com';

test('opens the Shopify-supplied customer portal in French', () => {
  assert.equal(getCustomerAccountUrl({ storeDomain, accountUrl: 'https://shopify.com/99186508064/account' }),
    'https://shopify.com/99186508064/account?locale=fr');
});

test('the configured store account route is a safe fallback', () => {
  assert.equal(getCustomerAccountUrl({ storeDomain }), `https://${storeDomain}/account?locale=fr`);
  assert.equal(getCustomerAccountUrl({ storeDomain, accountUrl: `https://${storeDomain}/account/login` }),
    `https://${storeDomain}/account/login?locale=fr`);
  assert.equal(getCustomerAccountUrl({}), null);
  assert.equal(getCustomerAccountUrl({ storeDomain: 'example.com' }), null);
});

test('rejects untrusted origins, insecure links and session-bound auth URLs', () => {
  for (const accountUrl of [
    'javascript:alert(1)',
    'http://shopify.com/99186508064/account',
    'https://shopify.com.attacker.invalid/99186508064/account',
    'https://other-store.myshopify.com/account',
    'https://attacker.invalid/account',
    'https://user:password@shopify.com/99186508064/account',
    'https://shopify.com:8443/99186508064/account',
    'https://shopify.com/authentication/99186508064/login?state=test',
    'https://shopify.com/99186508064/account/callback?code=test',
    'https://shopify.com/99186508064/account?redirect_uri=https://attacker.invalid',
    'https://shopify.com/99186508064/account#session-token',
    'not a url',
  ]) assert.equal(getCustomerAccountUrl({ storeDomain, accountUrl }), null, accountUrl);
});
