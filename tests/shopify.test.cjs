const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const code = ts.transpileModule(fs.readFileSync('src/lib/shopify.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
function load(env = {}, fetch = async () => { throw new Error('offline'); }) {
  const exports = {};
  vm.runInNewContext(code, { exports, process: { env }, fetch, console,
    require: () => ({ demoProducts: [{ handle: 'demo' }], demoCollections: [] }),
  });
  return exports;
}
const configured = { NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: 'example.myshopify.com', NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN: 'test-token' };
test('Only an entirely unconfigured storefront uses demo products', async () => {
  assert.equal((await load().getAllProducts())[0].handle, 'demo');
  await assert.rejects(load(configured).getAllProducts(), /offline/);
  await assert.rejects(load({ NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: 'example.myshopify.com' }).getAllProducts(), /not configured/);
});
test('Shopify business errors and missing carts reject instead of pretending success', async () => {
  const api = load(configured, async () => ({ ok: true, json: async () => ({ data: {
    cartCreate: { cart: null, userErrors: [{ message: 'Unavailable' }], warnings: [] },
  } }) }));
  await assert.rejects(api.createCart(), /Unavailable/);
});
test('Quantity and complete cart ID are sent once, warnings are preserved', async () => {
  const requests = [];
  const api = load(configured, async (url, options) => {
    requests.push(JSON.parse(options.body));
    return { ok: true, json: async () => ({ data: { cartLinesAdd: {
      cart: { id: 'cart?key=test', totalQuantity: 2 }, userErrors: [], warnings: [{ message: 'Quantity adjusted' }],
    } } }) };
  });
  const cart = await api.addToCart('cart?key=test', 'variant', 3);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].variables.cartId, 'cart?key=test');
  assert.equal(requests[0].variables.lines[0].quantity, 3);
  assert.equal(cart.warnings[0], 'Quantity adjusted');
  await assert.rejects(api.addToCart('cart', 'variant', 0), /quantité/);
  assert.equal(requests.length, 1);
});
test('Prices use the returned currency, quick add selects an available variant', () => {
  const api = load();
  assert.equal(api.formatPrice({ amount: '12', currencyCode: 'EUR' }), '12 EUR');
  assert.equal(api.getFirstVariantId({ variants: { edges: [
    { node: { id: 'sold-out', availableForSale: false } },
    { node: { id: 'available', availableForSale: true } },
  ] } }), 'available');
});
