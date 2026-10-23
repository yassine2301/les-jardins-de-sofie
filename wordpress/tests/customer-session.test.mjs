import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { transform } from 'esbuild';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { code } = await transform(await readFile(resolve(here, 'src/customer-auth.ts'), 'utf8'), {loader:'ts', format:'cjs'});
function client(url) {
  let sequence = 0;
  const requests = [];
  const module = {exports:{}};
  vm.runInNewContext(code, {
    module, exports: module.exports, URL,
    crypto: {randomUUID: () => `request-${++sequence}`},
    window: {location: {origin:'https://store.example.test'}, __JDS_CONFIG__:{customerStateUrl:url}},
    fetch: async (address, options) => {requests.push({address,options}); return {ok:true, json:async () => ({success:true,data:{csrf:'nonce-fixture',user:null}})};},
  });
  return {load:module.exports.loadCustomerSession, requests};
}
test('each session read bypasses cached nonces and carries only same-origin cookies', async () => {
  const app = client('https://store.example.test/wp-admin/admin-ajax.php?action=jds_customer_state');
  await app.load(); await app.load();
  assert.notEqual(app.requests[0].address, app.requests[1].address);
  for (const request of app.requests) {
    assert.equal(new URL(request.address).searchParams.get('action'), 'jds_customer_state');
    assert.equal(request.options.credentials, 'same-origin');
    assert.equal(request.options.cache, 'no-store');
  }
});
test('session reads reject a configuration pointing to another origin', async () => {
  const app = client('https://attacker.invalid/customer-state');
  await assert.rejects(app.load());
  assert.equal(app.requests.length, 0);
});
