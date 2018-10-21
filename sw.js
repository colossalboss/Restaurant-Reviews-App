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
      return cache.addAll(cacheFiles);
    })
  );
});


/*
*Listen for fetch and retrieve from cache if present else fetch from server and store in cache
*/
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log(event.request, ' is in cache');
        return response;
      } else {
        console.log(event.request, ' not found in cache');
        return fetch(event.request)
        .then(function(response) {
          const cloned = response.clone();
          caches.open('file-store-v1').then(function(cache) {
            cache.put(event.request, cloned);
          })
          return response;
        })
        .catch(function(err) {
          console.log(err);
        })
      }
    })
  );
})