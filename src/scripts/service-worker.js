const staticCacheName = 'movie-app-static';
const assets = [];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== staticCacheName)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => cacheRes || fetch(evt.request))
      .catch()
  );
});
