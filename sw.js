'use strict';
const VERSION = '1.2.0';
const PREFIX = 'fp-ideen-center-';
const CACHE = PREFIX + VERSION;
const ROOT = new URL('./', self.location.href);
const SHELL = [
  './', 'index.html', 'styles.css', 'app.js', 'ideen.json', 'version.json',
  'manifest.webmanifest', 'assets/fp-ideen-center-logo.png',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'favicon.ico', 'icons/favicon-16.png', 'icons/favicon-32.png', 'icons/favicon-48.png',
  'vendor/bootstrap.min.css', 'vendor/bootstrap.bundle.min.js',
  'entwuerfe/familienakte/version-1/familienakte-entwurf-v1.html',
  'entwuerfe/familienakte/version-1/familienakte-ideenblatt-v1.html',
  'entwuerfe/familienakte/version-2/meine-akte-entwurf-v2.html',
  'entwuerfe/familienakte/version-3/private-act-entwurf-v3.html',
  'entwuerfe/familienakte/version-4/private-akte-verweis-v4.html',
  'entwuerfe/logo/private-akte-basic-rund.png'
].map(path => new URL(path, ROOT).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL.map(url => new Request(url, {cache:'reload'})))));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => { if (event.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
function keyFor(request) { const url = new URL(request.url); url.search = ''; url.hash = ''; return url.href; }
function fromCache(response) {
  const headers = new Headers(response.headers); headers.set('X-FP-Source', 'cache');
  return new Response(response.body, {status:response.status, statusText:response.statusText, headers});
}
async function networkFirst(request, navigation = false) {
  const cache = await caches.open(CACHE), key = keyFor(request);
  try {
    const response = await fetch(request);
    if (response.ok) { await cache.put(key, response.clone()); return response; }
    const saved = await cache.match(key);
    if (saved && response.status >= 500) return fromCache(saved);
    return response;
  } catch {
    const saved = await cache.match(key);
    if (saved) return fromCache(saved);
    if (navigation && (new URL(request.url).pathname === ROOT.pathname || /\/index\.html$/.test(new URL(request.url).pathname))) {
      const home = await cache.match(new URL('index.html', ROOT).href);
      if (home) return fromCache(home);
    }
    if (navigation) return new Response('<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FP Ideen-Center · Offline</title><body style="font:16px/1.7 system-ui,sans-serif;padding:30px;color:#183653"><h1>Dieser Entwurf ist noch nicht offline gespeichert.</h1><p>Öffne ihn einmal mit Internetverbindung.</p><a href="'+ROOT.pathname+'">Zurück zum Ideen-Center</a></body></html>', {status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});
    return new Response('Offline', {status:503});
  }
}
async function cachedAsset(request) {
  const cache = await caches.open(CACHE), key = keyFor(request);
  const saved = await cache.match(key); if (saved) return saved;
  const response = await fetch(request); if (response.ok) await cache.put(key, response.clone()); return response;
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname) || url.pathname.endsWith('/sw.js')) return;
  const isData = /\/(ideen|version)\.json$/.test(url.pathname);
  if (request.mode === 'navigate' || isData) event.respondWith(networkFirst(request, request.mode === 'navigate'));
  else event.respondWith(cachedAsset(request));
});
