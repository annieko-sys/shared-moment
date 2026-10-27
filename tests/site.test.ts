import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

test('PWA manifest has installable identity and icons', () => {
  const manifest = JSON.parse(read('public/manifest.webmanifest'));
  assert.equal(manifest.name, 'Shared Moment');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, '/');
  for (const icon of manifest.icons) assert.ok(existsSync(join(root, 'public', icon.src.slice(1))));
});

test('service worker only pre-caches public PWA assets', () => {
  const worker = read('public/sw.js');
  assert.match(worker, /offline\.html/);
  assert.match(worker, /event\.request\.mode === 'navigate'/);
  assert.doesNotMatch(worker, /supabase|api\/|localStorage|indexedDB|message body/i);
});

test('site has no backend, authentication, or personal-data persistence', () => {
  const app = read('components/shared-moment.tsx');
  assert.doesNotMatch(app, /supabase|fetch\(|localStorage|sessionStorage|indexedDB|signIn|email address/i);
  assert.equal(existsSync(join(root, 'app/api')), false);
  assert.equal(existsSync(join(root, 'supabase')), false);
});
