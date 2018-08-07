var cacheName = 'MySpringJPA';
var dataCacheName = 'weatherData-v1';

// var filesToCache = [];
var filesToCache = [
  '../Weather-PWA/',
  '../Weather-PWA/index.html',
  '../Weather-PWA/scripts/app.js',
  '../Weather-PWA/scripts/localforage.js',
  '../Weather-PWA/scripts/indexeddb.js',
  '../Weather-PWA/styles/inline.css',
  '../Weather-PWA/images/clear.png',
  '../Weather-PWA/images/cloudy-scattered-showers.png',
  '../Weather-PWA/images/cloudy.png',
  '../Weather-PWA/images/fog.png',
  '../Weather-PWA/images/ic_add_white_24px.svg',
  '../Weather-PWA/images/acc.svg',
  '../Weather-PWA/images/album.svg',
  '../Weather-PWA/images/earth-globe.svg',
  '../Weather-PWA/images/Notes.svg',
  '../Weather-PWA/images/reply.svg',
  '../Weather-PWA/images/ic_refresh_white_24px.svg',
  '../Weather-PWA/images/partly-cloudy.png',
  '../Weather-PWA/images/rain.png',
  '../Weather-PWA/images/scattered-showers.png',
  '../Weather-PWA/images/sleet.png',
  '../Weather-PWA/images/snow.png',
  '../Weather-PWA/images/thunderstorm.png',
  '../Weather-PWA/images/wind.png'
];


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
           // if it isn't the current app shell and if it isn't application data
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains da
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});

