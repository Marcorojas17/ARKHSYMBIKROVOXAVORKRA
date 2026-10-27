// Service Worker para ARKH Portal
const CACHE_NAME = 'arkh-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/portal.js',
    '/manifest.json',
    '/favicon.svg'
];

// Instalación: Guardar en caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch: Servir desde caché si está offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
