// Use a cacheName for cache versioning
var cacheName = 'v1:static';
var filesToChache = [
    '/kedbus/',
    '/kedbus/index.html',
    '/kedbus/css/style.css',
    '/kedbus/js/mainController.js',
    '/kedbus/js/busData.json',
    '/kedbus/js/app.js',
    '/kedbus/lib/angular.min.js',
    '/kedbus/fonts/Roboto-Light.ttf',
    '/kedbus/fonts/Roboto-Medium.ttf',
    '/kedbus/fonts/Roboto-Regular.ttf'
];

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function(e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToChache)
            .then(function() {self.skipWaiting();});
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
