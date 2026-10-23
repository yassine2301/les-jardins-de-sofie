import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { transform } from 'esbuild';
import PhpParser from 'php-parser';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const theme = resolve(here, 'theme/jds-studio');
const product = (amount, tags = [], title = 'Produit') => ({
  tags, title, handle: title.toLowerCase().replace(/ /g, '-'),
  priceRange: { minVariantPrice: { amount: String(amount) } },
});

async function loadTypeScript(path, context = {}) {
  const code = await readFile(resolve(here, path), 'utf8');
  const { code: compiled } = await transform(code, { loader: 'ts', format: 'cjs' });
  const module = { exports: {} };
  vm.runInNewContext(compiled, { module, exports: module.exports, ...context });
  return module.exports;
}

test('PHP templates parse successfully', async () => {
  const parser = new PhpParser.Engine({ parser: { suppressErrors: false, version: '8.2' } });
  for (const name of ['index.php', 'functions.php', 'inc/customer-auth.php']) {
    const ast = parser.parseCode(await readFile(resolve(theme, name), 'utf8'), name);
    assert.ok(ast.children.length > 0);
  }
});

test('build contains browser assets and no dependency on Vercel or Next server', async () => {
  for (const name of ['jds-app.js', 'jds-app.css', 'images/logo2.png', 'videos/hero.mp4']) {
    assert.ok((await stat(resolve(theme, 'dist', name))).size > 0);
  }
  const code = await readFile(resolve(theme, 'dist/jds-app.js'), 'utf8');
  assert.ok(!code.includes('process.env.NEXT_PUBLIC_'));
  assert.ok(!code.includes('les-jardins-de-sofie.vercel.app'));
  assert.ok(code.includes('__JDS_CONFIG__'));
  assert.ok(!/import.+from\s*["']next\//.test(code));
  const index = await readFile(resolve(theme, 'index.php'), 'utf8');
  assert.ok(!index.includes('<iframe'));
});

test('original media are copied byte-for-byte', async () => {
  for (const asset of ['images/logo2.png', 'images/categories/pots.jpg', 'videos/hero.mp4']) {
    const original = await readFile(resolve(here, '../public', asset));
    const copied = await readFile(resolve(theme, 'dist', asset));
    assert.equal(createHash('sha256').update(copied).digest('hex'), createHash('sha256').update(original).digest('hex'));
  }
});

test('composition filters preserve the current 800/1600 MAD boundaries', async () => {
  const { filterProducts } = await loadTypeScript('generated/catalog-filters.ts');
  const products = [product(799), product(800), product(1599), product(1600)];
  assert.equal(filterProducts(products, 'compositions', 'petite').length, 1);
  assert.equal(filterProducts(products, 'compositions', 'standard').length, 2);
  assert.equal(filterProducts(products, 'compositions', 'grande').length, 1);
});

test('plant tags and pot collection filters remain distinct', async () => {
  const { filterProducts } = await loadTypeScript('generated/catalog-filters.ts');
  const plants = [product(400, ['grandes-plantes']), product(400, ['petites-plantes']), product(950)];
  assert.equal(filterProducts(plants, 'plantes', 'petite').length, 1);
  assert.equal(filterProducts(plants, 'plantes', 'grande').length, 2);
  const pots = [product(400, [], 'Saxum blanc'), product(900, [], 'Méandre rouge'), product(1300, ['grand-format'], 'Jarre')];
  assert.equal(filterProducts(pots, 'pots', undefined, 'saxum').length, 1);
  assert.equal(filterProducts(pots, 'pots', undefined, 'meandre').length, 1);
  assert.equal(filterProducts(pots, 'pots', 'jarre').length, 1);
});

test('asset URLs use WordPress, while Shopify images retain their CDN origin', async () => {
  const window = { __JDS_CONFIG__: { assetsUrl: 'https://lesjardinsdesofie.com/wp-content/themes/jds-studio/dist' } };
  const { assetUrl } = await loadTypeScript('src/runtime.ts', { window });
  assert.equal(assetUrl('/videos/hero.mp4'), window.__JDS_CONFIG__.assetsUrl + '/videos/hero.mp4');
  assert.equal(assetUrl('https://cdn.shopify.com/product.jpg'), 'https://cdn.shopify.com/product.jpg');
});
