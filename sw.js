const CACHE_NAME = 'meloflix-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/playlist.js',
    '/js/player.js',
    '/js/app.js',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-512.png',
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});