import { build } from 'esbuild';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const theme = resolve(here, 'theme/jds-studio');
await mkdir(resolve(theme, 'dist'), { recursive: true });
await mkdir(resolve(here, 'generated'), { recursive: true });

// Reuse the exact current category rules rather than maintaining a second copy.
const categorySource = await readFile(resolve(root, 'src/app/categorie/[handle]/page.tsx'), 'utf8');
const start = categorySource.indexOf('function firstParam(');
const end = categorySource.indexOf('export async function generateStaticParams');
if (start < 0 || end < start) throw new Error('The source category rules have changed; review the adapter.');
const rules = categorySource.slice(start, end).replace('function filterProducts(', 'export function filterProducts(');
await writeFile(resolve(here, 'generated/catalog-filters.ts'),
  "import type { ShopifyProduct } from '@/lib/shopify';\n" + rules);

const result = await build({
  absWorkingDir: root,
  entryPoints: [resolve(here, 'src/app.tsx')],
  outfile: resolve(theme, 'dist/jds-app.js'),
  bundle: true,
  minify: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  metafile: true,
  nodePaths: [resolve(here, 'node_modules')],
  alias: {
    '@': resolve(root, 'src'),
    'next/link': resolve(here, 'src/next-link.tsx'),
    'next/image': resolve(here, 'src/next-image.tsx'),
    'next/navigation': resolve(here, 'src/next-navigation.ts'),
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN': 'window.__JDS_CONFIG__.shopifyDomain',
    'process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN': 'window.__JDS_CONFIG__.storefrontToken',
  },
  plugins: [{
    name: 'wordpress-public-assets',
    setup(builder) {
      builder.onLoad({ filter: /\.tsx$/ }, async args => {
        const text = await readFile(args.path, 'utf8');
        const contents = text.replace(/\b(src|poster)=["'](\/(?:images|videos)\/[^"']+)["']/g,
          (_, attribute, asset) => `${attribute}={window.__JDS_CONFIG__.assetsUrl + ${JSON.stringify(asset)}}`);
        return { contents, loader: 'tsx', resolveDir: dirname(args.path) };
      });
    },
  }],
});
await cp(resolve(root, 'public'), resolve(theme, 'dist'), { recursive: true });
await writeFile(resolve(here, 'build-report.json'), JSON.stringify(result.metafile, null, 2));
console.log('WordPress theme built: ' + theme);
