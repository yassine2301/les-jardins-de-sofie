import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
test('customer authentication enforces native cookies, CSRF, verified signup, reset ownership and rate limits', () => {
  const result = spawnSync(process.execPath, [resolve(here, 'node_modules/@php-wasm/cli/php-wasm.js'), '-f', resolve(here, 'tests/customer-auth-harness.php')], {cwd: here, encoding:'utf8'});
  assert.equal(result.status, 0, result.stderr + result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.passed.length, 21);
});
