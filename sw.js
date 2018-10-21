/*
*Paths to files to be stored in cache
*/
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

/*
*Listen for serviceWorker installation and open cache
*
*/
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('file-store-v1').then(function(cache) {
      console.log(cache);
      return cache.addAll(cacheFiles);
    })
    .catch(function(err) {
      console.log(err);
    })
  );
});


/*
*Listen for fetch and retrieve from cache if present else fetch
*/
self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request).then(function (response) {
          return response || fetch(event.request);
      })
  );
});
