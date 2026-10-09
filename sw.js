
const CACHE_NAME = "calculadora3d-v1";
const ARCHIVOS = [
  "./",
  "./Calculadora3D.html",
  "./manifest.json",
  "./icono-calculadora3d-192.png",
  "./icono-calculadora3d-512.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ARCHIVOS);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(nombres) {
      return Promise.all(
        nombres
          .filter(function(nombre) {
            return nombre.startsWith("calculadora3d-") &&
                   nombre !== CACHE_NAME;
          })
          .map(function(nombre) {
            return caches.delete(nombre);
          })
      );
    })
  );

  self.clients.claim();
});
