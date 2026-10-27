const CACHE = 'shared-moment-public-v3';
const PUBLIC = ['/offline.html', '/manifest.webmanifest', '/icon.svg', '/icon-180.png', '/icon-192.png', '/icon-512.png'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PUBLIC))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (PUBLIC.includes(url.pathname)) event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
  else if (event.request.mode === 'navigate') event.respondWith(fetch(event.request).catch(() => caches.match('/offline.html')));
});
