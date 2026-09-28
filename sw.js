const CACHE_NAME = 'meloflix-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/playlist.js',
    '/js/player.js',
    '/js/app.js',
    '/assets/icons/Music-logo-with-sound-waves.png',
    '/assets/icons/Music-logo-with-sound-waves2.png',
    '/assets/SLEEK_SILVER_MUSIC_NOTE.png',
    'https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js',
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