const CACHE_NAME = "firstpwa-v1";
var urlsToCache = [
  "/",
  "/nav.html", "/index.html",
  "/detail_match.html", "/detail_player.html",
  "/detail_team.html",
  "/pages/home.html", "/pages/jadwal.html",
  "/pages/klasemen.html", "/pages/tentang.html",
  "/pages/favorit.html",
  "/images/icon.png", "/images/icon-512.jpg",
  "/images/stadium.jpg", "/images/fotoprofil.png",
  "/css/fontawesome/fontawesome.min.css", "/css/fontawesome/all.min.css",
  "/css/materialize.min.css", "/css/main.css",
  "/js/materialize.min.js", "/js/jquery.min.js",
  "/js/nav.js", "/js/main.js",
  "/js/klasemen.js", "/js/latestmatch.js",
  "/js/upcoming.js", "/js/matchleague.js",
  "/js/detail_team.js", "/js/detail_match.js",
  "/js/idb.js", "/js/dbfootball.js",
  "/js/dbfunction.js"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "http://readerapi.codepolitan.com/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});