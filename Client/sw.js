// File: client/sw.js
const CACHE_NAME = "shopping-list-v4";

const CORE_ASSETS = [
    "/",
    "/index.html",
    "/app.css",
    "/app.mjs",
    "/manifest.json",
    "/terms-of-service.html",
    "/utils/i18n.mjs"
];

// Install Event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching core assets");
            return cache.addAll(CORE_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("[Service Worker] Old cache removed");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event
self.addEventListener("fetch", (event) => {
    // Only intercept GET requests, and don't cache API calls
    if (event.request.method !== "GET" || event.request.url.includes("/api/")) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached response if found
            if (cachedResponse) {
                return cachedResponse;
            }

            // Otherwise fetch from network
            return fetch(event.request).then((response) => {
                // If the response is valid, dynamically cache it for future offline use
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        }).catch(() => {
            // If offline and request fails, try returning index.html as fallback for navigation
            if (event.request.mode === "navigate") {
                return caches.match("/index.html");
            }
        })
    );
});
