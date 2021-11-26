var cacheName = 'collegeapp';
var dataCacheName = 'collegeapp';
var filesToCache = [
  '/',
  '/index.html',
  '/static/js/app.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-aria/angular-aria.min.js',
  'bower_components/angular-animate/angular-animate.min.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/js/localforage-1.4.0.js',
  'bower_components/js/localforage-1.4.0.js',
  'bower_components/js/localforage-1.4.0.js',
  'bower_components/js/localforage-1.4.0.js',
  'bower_components/firebase/firebase.js',
  '/static/styles/css/app-style.css',
  '/static/assets/add.svg',
  '/static/assets/arrow_down.svg',
  '/static/assets/arrow_up.svg',
  '/static/assets/arrow_up1.svg',
  '/static/assets/close.svg',
  '/static/assets/kbc.jpg',
  '/static/assets/left.png',
  '/static/assets/menu.png',
  '/static/assets/ps.jpg',
  '/static/assets/school.png',
  '/static/assets/we.png'
];
var weatherAPIUrlBase = 'https://publicdata-weather.firebaseio.com/';

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
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.url.startsWith(weatherAPIUrlBase)) {
    e.respondWith(
      fetch(e.request)
        .then(function(response) {
          return caches.open(dataCacheName).then(function(cache) {
            cache.put(e.request.url, response.clone());
            console.log('[ServiceWorker] Fetched & Cached', e.request.url);
            return response;
          });
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        console.log('[ServiceWorker] Fetch Only', e.request.url);
        return response || fetch(e.request);
      })
    );
  }
});
